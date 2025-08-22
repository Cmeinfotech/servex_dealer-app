import { Text as RNText, StyleSheet } from "react-native";
import { COLORS } from "../../../constants/colors";
import { scale } from "../../../constants/constants";

const DynamicText = ({
  children,
  size = scale(16),
  weight = "regular",
  color = COLORS.black,
  center = false,
  style,
  ...props
}) => {
  const fontFamily = {
    regular: "Nunito-Regular",
    bold: "Nunito-Bold",
    light: "Nunito-Light",
    black: "Nunito-Black",
  }[weight];

  return (
    <RNText
      {...props}
      style={[
        styles.text,
        {
          fontFamily,
          fontSize: scale(size),
          color,
          textAlign: center ? "center" : "auto",
        },
        style,
      ]}
    >
      {children}
    </RNText>
  );
};

export default DynamicText;

const styles = StyleSheet.create({
  text: {
    includeFontPadding: false,
    flexWrap: "wrap",
    flexShrink: 1,
  },
});
