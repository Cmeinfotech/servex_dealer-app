import { Platform, StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { scale, verticalScale } from "../../constants/constants";

export const authStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  backgroundImage: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: scale(18),
    gap: scale(16),
    justifyContent: "center",
  },
  card: {
    padding: scale(15),
    gap: scale(15),
    backgroundColor: COLORS.border,
    justifyContent: "center",
    borderRadius: scale(10),
    marginVertical: scale(10)
  },
  heading: {
    fontFamily: "Nunito-Bold",
    fontSize: scale(28),
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: scale(16),
  },
  inputView: {
    backgroundColor: COLORS.lightGrey,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: scale(12),
    paddingHorizontal: scale(12),
    paddingVertical: Platform.OS === "ios" ? verticalScale(13) : scale(3),
  },
  input: {
    fontFamily: "Nunito-Regular",
    fontSize: scale(14),
    color: "#333",
  },
  forgotPass: {
    fontFamily: "Nunito-Bold",
    fontSize: scale(13),
    color: COLORS.primary,
    paddingTop: scale(6),
  },

  bottomTextRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: scale(20),
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.2)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
