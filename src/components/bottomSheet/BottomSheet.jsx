import { forwardRef, useImperativeHandle, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { scale } from "../../../constants/constants";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const BottomSheet = forwardRef(({ children, snapPoints }, ref) => {
  const translateY = useSharedValue(SCREEN_HEIGHT); // start offscreen
  const isOpen = useSharedValue(false);
  const contextY = useSharedValue(0);
  const [contentHeight, setContentHeight] = useState(0);

  // Convert snapPoints (fractions) to pixel values
  const normalizedSnapPoints = snapPoints?.length
    ? snapPoints.map((p) => SCREEN_HEIGHT * p)
    : [];

  // Default height (content height or 60%)
  const defaultSnap = contentHeight
    ? SCREEN_HEIGHT - contentHeight
    : SCREEN_HEIGHT * 0.6;

  // Expose methods
  useImperativeHandle(ref, () => ({
    open: (toIndex = normalizedSnapPoints.length - 1) => {
      const target =
        normalizedSnapPoints[toIndex] ?? SCREEN_HEIGHT - defaultSnap;
      isOpen.value = true;
      translateY.value = withSpring(SCREEN_HEIGHT - target, {
        damping: 50,
        stiffness: 400,
      });
    },
    close: () => {
      isOpen.value = false;
      translateY.value = withTiming(SCREEN_HEIGHT);
    },
    isOpen: () => isOpen.value,
  }));

  // Pan gesture
  const panGesture = Gesture.Pan()
    .onStart(() => {
      contextY.value = translateY.value;
    })
    .onUpdate((event) => {
      translateY.value = contextY.value + event.translationY;
    })
    .onEnd(() => {
      const currentY = translateY.value;
      let snapPositions = normalizedSnapPoints.length
        ? normalizedSnapPoints
        : [SCREEN_HEIGHT - defaultSnap];

      snapPositions = snapPositions.map((p) => SCREEN_HEIGHT - p);

      let closest = snapPositions[0];
      for (let point of snapPositions) {
        if (Math.abs(currentY - point) < Math.abs(currentY - closest)) {
          closest = point;
        }
      }

      if (currentY > SCREEN_HEIGHT * 0.8) {
        translateY.value = withTiming(SCREEN_HEIGHT);
        isOpen.value = false;
      } else {
        translateY.value = withSpring(closest, {
          damping: 50,
          stiffness: 400,
        });
      }
    });

  // Sheet animation
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    zIndex: 100,
  }));

  // Backdrop animation
  const backdropStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, SCREEN_HEIGHT],
      [0.5, 0] // fade backdrop
    );
    return { opacity, display: opacity === 0 ? "none" : "flex" };
  });

  return (
    <>
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={() => ref?.current?.close()}>
        <Animated.View style={[styles.backdrop, backdropStyle]} />
      </TouchableWithoutFeedback>

      {/* BottomSheet */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.sheet, animatedStyle]}>
          <View style={styles.handle} />
          <View
            onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
            style={{ flex: 1, paddingHorizontal: scale(16) }}
          >
            <KeyboardAwareScrollView
              keyboardShouldPersistTaps="handled"
              enableOnAndroid
              extraScrollHeight={20}
              enableAutomaticScroll
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 40 }}
            >
              <TouchableWithoutFeedback onPress={() => {}}>
                <View>{children}</View>
              </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
          </View>
        </Animated.View>
      </GestureDetector>
    </>
  );
});

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    zIndex: 100,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 5,
    alignSelf: "center",
    marginVertical: 10,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    zIndex: 50,
  },
});

export default BottomSheet;
