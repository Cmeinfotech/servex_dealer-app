import { StyleSheet, View } from "react-native";
import { COLORS } from "../../../constants/colors";
import { scale } from "../../../constants/constants";

const Border = ({
  height = 1,
  backgroundColor = COLORS.primaryLight,
  width = "100%",
  style,
  marginVertical = scale(5),
}) => {
  return (
    <View
      style={[
        style,
        {
          height: height,
          backgroundColor: backgroundColor,
          width: width,
          marginVertical: marginVertical,
        },
      ]}
    />
  );
};

export default Border;

const styles = StyleSheet.create({});
