import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { scale } from "../../constants/constants";

export const commonStyle = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: scale(18),
  },
});
