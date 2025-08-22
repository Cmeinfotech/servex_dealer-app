import { useEffect } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../../constants/colors";
import { scale, wp } from "../../../constants/constants";
import DynamicText from "../ui/DynamicText";

const CustomModal = ({
  visible,
  onClose,
  title,
  children,
  animationType = "fade",
  modalWidth = "80%",
  modalHeight = null,
  backdropOpacity = 0.5,
  duration = 300,
}) => {
  const scaleValue = new Animated.Value(0);
  const fadeValue = new Animated.Value(0);
  const slideValue = new Animated.Value(Dimensions.get("window").height);

  useEffect(() => {
    if (visible) {
      scaleValue.setValue(0);
      fadeValue.setValue(0);
      slideValue.setValue(Dimensions.get("window").height);

      if (animationType === "scale") {
        Animated.parallel([
          Animated.timing(fadeValue, {
            toValue: 1,
            duration,
            useNativeDriver: true,
          }),
          Animated.spring(scaleValue, {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
          }),
        ]).start();
      } else if (animationType === "slide") {
        Animated.parallel([
          Animated.timing(fadeValue, {
            toValue: 1,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(slideValue, {
            toValue: 0,
            duration,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        Animated.timing(fadeValue, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }).start();
      }
    } else {
      slideValue.setValue(Dimensions.get("window").height);
    }
  }, [visible, animationType]);

  const getAnimationStyle = () => {
    switch (animationType) {
      case "scale":
        return {
          opacity: fadeValue,
          transform: [{ scale: scaleValue }],
        };
      case "slide":
        return {
          opacity: fadeValue,
          transform: [{ translateY: slideValue }],
        };
      default:
        return {
          opacity: fadeValue,
        };
    }
  };

  return (
    <Modal
      transparent
      animationType="none"
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <Animated.View
        style={[
          styles.backdrop,
          {
            opacity: fadeValue,
            backgroundColor: `rgba(0,0,0,${backdropOpacity})`,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backdropTouchable}
          activeOpacity={1}
          onPress={onClose}
        >
          <Animated.View
            style={[
              styles.modalContainer,
              getAnimationStyle(),
              {
                width: modalWidth,
                height: modalHeight,
              },
            ]}
          >
            <View style={styles.contentContainer}>
              {title && (
                <DynamicText
                  size={scale(15)}
                  weight="bold"
                  style={styles.title}
                  center
                >
                  {title}
                </DynamicText>
              )}

              <View style={styles.childrenContainer}>{children}</View>

              {/* <TouchableOpacity
                onPress={onClose}
                style={[styles.closeButton, closeButtonStyle]}
              >
                <DynamicText
                  style={[styles.closeText, closeButtonTextStyle]}
                  weight="600"
                >
                  {closeButtonText}
                </DynamicText>
              </TouchableOpacity> */}
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdropTouchable: {
    flex: 1,
    width: wp(100),
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    maxHeight: "90%", // Prevent modal from taking full screen height
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  contentContainer: {
    padding: scale(16),
    width: "100%",
  },
  title: {
    marginBottom: scale(10),
    paddingHorizontal: scale(8),
  },
  childrenContainer: {
    flexShrink: 1,
  },
  closeButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: scale(10),
    borderRadius: scale(8),
    alignItems: "center",
    marginTop: scale(16),
  },
  closeText: {
    color: COLORS.white,
  },
});
