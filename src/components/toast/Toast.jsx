import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DynamicText from "../ui/DynamicText";

const Toast = forwardRef((props, ref) => {
  const {
    duration = 4000,
    position = "center",
    style = {},
    textStyle = {},
    iconStyle = {},
    fontWeight = "bold",
    icon = true,
    textCenter = false,
  } = props;

  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");
  const [visible, setVisible] = useState(false);

  // Animation values
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(position === "center" ? 0 : -100);
  const scale = useSharedValue(0.9);
  const swipeY = useSharedValue(0);
  const isSwiping = useSharedValue(false);

  const toastTypes = {
    info: { backgroundColor: "#3498db", icon: "ℹ️" },
    success: { backgroundColor: "#2ecc71", icon: "✓" },
    error: { backgroundColor: "#e74c3c", icon: "✕" },
    warning: { backgroundColor: "#f39c12", icon: "⚠️" },
  };

  useImperativeHandle(ref, () => ({
    show: (msg, toastType = "info") => {
      setMessage(msg);
      setType(toastType);
      setVisible(true);
    },
    hide: () => {
      hideToast();
    },
  }));

  const showToast = () => {
    // Reset animation values
    swipeY.value = 0;
    isSwiping.value = false;

    opacity.value = withTiming(1, { duration: 300 });

    if (position === "center") {
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 100,
      });
    } else {
      translateY.value = withSpring(0, {
        damping: 10,
        stiffness: 100,
        overshootClamping: true,
      });
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 100,
      });
    }
  };

  const hideToast = () => {
    cancelAnimation(translateY);
    cancelAnimation(swipeY);

    opacity.value = withTiming(0, { duration: 200 });
    if (position !== "center") {
      translateY.value = withTiming(-150, { duration: 250 });
    }
    scale.value = withTiming(0.8, { duration: 250 }, (finished) => {
      if (finished) {
        runOnJS(setVisible)(false);
      }
    });
  };

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      isSwiping.value = true;
      cancelAnimation(translateY);
    })
    .onUpdate((event) => {
      // Only allow upward swiping
      if (event.translationY < 0) {
        swipeY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      isSwiping.value = false;

      // Only trigger dismiss on upward swipe
      if (event.translationY < -50 || event.velocityY < -1000) {
        if (position !== "center") {
          translateY.value = withTiming(-150, { duration: 200 });
        }
        opacity.value = withTiming(0, { duration: 200 }, () => {
          runOnJS(setVisible)(false);
        });
      } else {
        // Return to original position
        swipeY.value = withSpring(0);
      }
    })
    .activeOffsetY([-10, 10]); // Only activate gesture for vertical movement

  useEffect(() => {
    if (visible) {
      showToast();
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        {
          translateY:
            isSwiping.value && position !== "center"
              ? translateY.value + swipeY.value
              : translateY.value,
        },
        { scale: scale.value },
      ],
    };
  });

  const insets = useSafeAreaInsets();

  const getPositionStyle = () => {
    switch (position) {
      case "top":
        return { top: insets.top };
      case "center":
        return {
          top: "50%",
          marginTop: -25,
          alignSelf: "center",
        };
      case "bottom":
        return { bottom: insets.bottom + 20 };
      default:
        return { top: insets.top };
    }
  };

  if (!visible) return null;

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          styles.toast,
          {
            backgroundColor: toastTypes[type].backgroundColor,
            ...getPositionStyle(),
          },
          style,
          animatedStyle,
        ]}
      >
        {icon && (
          <Text style={[styles.icon, iconStyle]}>{toastTypes[type].icon}</Text>
        )}
        <DynamicText
          style={[styles.message, textStyle]}
          weight={fontWeight}
          center={textCenter}
        >
          {message}
        </DynamicText>
      </Animated.View>
    </GestureDetector>
  );
});

const CenteredToast = forwardRef((props, ref) => (
  <Toast ref={ref} position="center" {...props} />
));

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 6,
    // elevation: 6,
    zIndex: 10000,
  },
  icon: {
    fontSize: 20,
    marginRight: 12,
    color: "white",
  },
  message: {
    color: "white",
    fontSize: 15,
    flex: 1,
    lineHeight: 20,
  },
});

export { CenteredToast };
export default Toast;
