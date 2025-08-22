import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../../constants/colors";
import { scale } from "../../../constants/constants";
import DynamicText from "./DynamicText";

const Button = ({
  children,
  textColor = COLORS.white,
  fontWeight = "bold",
  fontSize = scale(14),
  style,
  disabled = false,
  onPress,
  isLoading = false,
  leftIcon,
  rightIcon,
  backgroundColor = COLORS.primary,
  borderRadius = 100,
  paddingVertical = 12,
  paddingHorizontal = 24,
  shadow,
  ...props
}) => {
  const opacity = disabled ? 0.6 : 1;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor,
          borderRadius,
          paddingVertical,
          paddingHorizontal,
          opacity,
        },
        shadow && {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator
          color={textColor}
          size="small"
          style={{ height: scale(18.5) }}
        />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
          <DynamicText
            weight={fontWeight}
            size={fontSize}
            color={textColor}
            style={styles.text}
          >
            {children}
          </DynamicText>
          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderCurve: "continuous",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

export default Button;
