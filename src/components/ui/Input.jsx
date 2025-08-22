import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../constants/colors";
import { hp, scale } from "../../../constants/constants";
import DynamicText from "./DynamicText";

const Input = ({
  value,
  style,
  placeholder = "",
  onPassPress,
  onChangeText,
  border = true,
  password = false,
  secureText = false,
  title,
  error,
  inputStyle,
  required = false,
  multiline = false,
  numberOfLines = 4,
  ...props
}) => {
  return (
    <View style={{ flex: 1 }}>
      {title && (
        <DynamicText
          size={scale(13)}
          style={{ paddingHorizontal: scale(12), marginBottom: scale(3) }}
        >
          {title}{" "}
          {required && (
            <DynamicText size={scale(12)} color={COLORS.red}>
              *
            </DynamicText>
          )}
        </DynamicText>
      )}

      <View
        style={[
          styles.inputView,
          border && {
            borderColor: COLORS.primary,
            borderWidth: 1,
          },
          multiline && styles.multilineView,
          inputStyle,
        ]}
      >
        <TextInput
          {...props}
          value={value}
          onChangeText={onChangeText}
          style={[styles.input, style, multiline && styles.multilineInput]}
          placeholder={placeholder}
          placeholderTextColor="#999"
          secureTextEntry={secureText && !multiline}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical={multiline ? "top" : "center"}
        />
        {password && !multiline && (
          <TouchableOpacity
            onPress={onPassPress}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <DynamicText style={styles.passwordBtn}>
              {secureText ? "Show" : "Hide"}
            </DynamicText>
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <DynamicText
          size={scale(12)}
          style={{ paddingHorizontal: scale(12), marginTop: scale(2) }}
          color="red"
        >
          {error}
        </DynamicText>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputView: {
    backgroundColor: COLORS.lightGrey,
    borderRadius: scale(12),
    paddingHorizontal: scale(12),
    height: hp(5),
    flexDirection: "row",
    alignItems: "center",
  },
  multilineView: {
    height: hp(10), // You can make this dynamic if needed
    alignItems: "flex-start",
    paddingVertical: scale(8),
  },
  input: {
    fontFamily: "Nunito-Regular",
    fontSize: scale(14),
    color: "#333",
    flex: 1,
  },
  multilineInput: {
    textAlignVertical: "top",
    paddingTop: scale(4),
  },
  passwordBtn: {
    fontSize: scale(13),
    fontFamily: "Nunito-Bold",
    color: COLORS.primary,
    paddingLeft: scale(8),
  },
});
