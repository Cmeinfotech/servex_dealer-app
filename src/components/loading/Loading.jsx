import { useEffect } from "react";
import { Modal, StatusBar, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { COLORS } from "../../../constants/colors";
import { scale } from "../../../constants/constants";

const LoadingOverlay = ({ visible = false }) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      statusBarTranslucent
      onRequestClose={() => {}}
    >
      <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="light-content" />
      <View style={styles.overlay}>
        <View style={styles.content}>
          <BouncingDots />
        </View>
      </View>
    </Modal>
  );
};

const BouncingDots = () => {
  const dot1 = useSharedValue(0);
  const dot2 = useSharedValue(0);
  const dot3 = useSharedValue(0);

  const bounceAnimation = (dot) => {
    "worklet";
    return withRepeat(
      withSequence(
        withTiming(-12, { duration: 300, easing: Easing.out(Easing.ease) }),
        withTiming(0, { duration: 300, easing: Easing.out(Easing.ease) })
      ),
      -1,
      true
    );
  };

  useEffect(() => {
    dot1.value = bounceAnimation(dot1);
    setTimeout(() => (dot2.value = bounceAnimation(dot2)), 150);
    setTimeout(() => (dot3.value = bounceAnimation(dot3)), 300);
  }, []);

  const animatedStyle1 = useAnimatedStyle(() => ({
    transform: [{ translateY: dot1.value }],
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ translateY: dot2.value }],
  }));

  const animatedStyle3 = useAnimatedStyle(() => ({
    transform: [{ translateY: dot3.value }],
  }));

  return (
    <View style={styles.dotContainer}>
      <Animated.View style={[styles.dot, animatedStyle1]} />
      <Animated.View style={[styles.dot, animatedStyle2]} />
      <Animated.View style={[styles.dot, animatedStyle3]} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    borderRadius: 16,
    alignItems: "center",
  },
  dotContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  dot: {
    width: scale(10),
    height: scale(10),
    borderRadius: 7,
    backgroundColor: COLORS.white,
  },
});

export default LoadingOverlay;
