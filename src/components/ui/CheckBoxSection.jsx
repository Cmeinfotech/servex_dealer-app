import { StyleSheet, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../constants/colors";
import { scale } from "../../../constants/constants";
import DynamicText from "./DynamicText";

const RadioButton = ({
  title,
  options,
  selectedOption,
  onSelect,
  containerStyle,
  radioStyle,
  labelStyle,
  titleStyle,
  required,
  error,
}) => {
  return (
    <View style={{ flex: 1, paddingHorizontal: scale(12) }}>
      {title && (
        <DynamicText style={[titleStyle]} size={scale(13)}>
          {title}{" "}
          {required && (
            <DynamicText size={scale(12)} color={COLORS.red}>
              *
            </DynamicText>
          )}{" "}
        </DynamicText>
      )}
      <View style={[styles.container, containerStyle]}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[styles.radioButton, radioStyle]}
            onPress={() => onSelect(option.value)}
            activeOpacity={0.5}
          >
            <View
              style={[
                styles.radioCircle,
                selectedOption === option.value && styles.selectedRadioCircle,
              ]}
            >
              {selectedOption === option.value && (
                <View style={styles.selectedRadioInnerCircle} />
              )}
            </View>
            <DynamicText style={labelStyle} size={scale(13)}>
              {option.label}
            </DynamicText>
          </TouchableOpacity>
        ))}
      </View>
      {error && (
        <DynamicText
          size={scale(12)}
          color={COLORS.red}
        >
          {error}
        </DynamicText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginVertical: scale(0),
    marginTop: scale(10),
    flexDirection: "row",
    alignItems: "center",
    gap: scale(20),
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scale(12),
  },
  radioCircle: {
    height: scale(15),
    width: scale(15),
    borderRadius: scale(10),
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  selectedRadioCircle: {
    borderColor: COLORS.primary, // iOS blue color
  },
  selectedRadioInnerCircle: {
    height: scale(8),
    width: scale(8),
    borderRadius: scale(5),
    backgroundColor: COLORS.primary,
  },
});

export default RadioButton;
