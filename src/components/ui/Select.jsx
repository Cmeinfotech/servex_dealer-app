import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../../constants/colors";
import { hp, scale } from "../../../constants/constants";
import DynamicText from "./DynamicText";

const DropdownSelect = ({
  border = true,
  options = [],
  onSelect = () => {},
  placeholder = "Select an option",
  selectedValue = null,
  multiSelect = false,
  maxVisibleOptions = 4,
  title,
  required,
  error,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    multiSelect ? selectedValue || [] : selectedValue || null
  );
  const animation = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    Keyboard.dismiss();
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    if (multiSelect) {
      const isSelected = selected.some((item) => item.id === option.id);
      const newSelected = isSelected
        ? selected.filter((item) => item.id !== option.id)
        : [...selected, option];
      setSelected(newSelected);
      onSelect(newSelected);
    } else {
      setSelected(option);
      onSelect(option);
      setIsOpen(false);
    }
  };

  // Keep all existing animation code exactly the same
  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  const maxHeight = Math.min(maxVisibleOptions, options.length === 0 ? 1 : options.length) * hp(5);

  const heightInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, maxHeight],
    extrapolate: "clamp",
  });

  const opacityInterpolation = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.8, 1],
  });

  const rotateInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  useEffect(() => {
    setSelected(multiSelect ? selectedValue || [] : selectedValue || null);
  }, [selectedValue]);

  const getDisplayText = () => {
    if (multiSelect) {
      if (selected.length === 0) return placeholder;
      if (selected.length === 1) return selected[0].categoryName || "Unnamed";
      return `${selected.length} items selected`;
    } else {
      return selected?.categoryName || placeholder;
    }
  };


  return (
    <View style={styles.dropdownContainer}>
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
      <Pressable
        style={[
          styles.container,
          border && {
            borderColor: COLORS.primary,
            borderWidth: 1,
          },
        ]}
        onPress={toggleDropdown}
        disabled={disabled}
      >
        <Text
          style={[
            styles.text,
            (!selected || (multiSelect && selected.length === 0)) &&
              styles.placeholder,
          ]}
        >
          {getDisplayText()}
        </Text>
        {!disabled && (
          <Animated.View
            style={{ transform: [{ rotate: rotateInterpolation }] }}
          >
            <Ionicons
              name="chevron-down"
              size={scale(16)}
              color={COLORS.primary}
            />
          </Animated.View>
        )}
      </Pressable>

      <Animated.View
        style={[
          styles.optionsContainer,
          {
            height: heightInterpolation,
            opacity: opacityInterpolation,
          },
        ]}
      >
        {options?.length <= 0 ? (
          <View style={styles.option}>
            <DynamicText style={styles.optionText} color={COLORS.red} weight="bold">Data not found</DynamicText>
          </View>
        ) : (
          <ScrollView style={styles.scrollView} nestedScrollEnabled={true}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.option,
                  (multiSelect
                    ? selected.some((item) => item.id === option.id)
                    : selected?.id === option.id) && styles.selectedOption,
                ]}
                onPress={() => handleSelect(option)}
              >
                <DynamicText style={styles.optionText}>
                  {option.categoryName || "Unnamed"}
                </DynamicText>
                {(multiSelect
                  ? selected.some((item) => item.id === option.id)
                  : selected?.id === option.id) && (
                  <Ionicons
                    name="checkmark"
                    size={scale(16)}
                    color={COLORS.primary}
                  />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </Animated.View>
      {error && (
        <DynamicText
          size={scale(12)}
          style={{ paddingHorizontal: scale(12), marginTop: scale(2) }}
          color={COLORS.red}
        >
          {error}
        </DynamicText>
      )}
    </View>
  );
};

export default DropdownSelect;

// Keep all styles EXACTLY the same as your original
const styles = StyleSheet.create({
  dropdownContainer: {
    position: "relative",
    zIndex: 1,
  },
  container: {
    backgroundColor: COLORS.lightGrey,
    borderRadius: scale(12),
    paddingHorizontal: scale(12),
    paddingVertical: scale(12),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: scale(14),
    color: COLORS.textDark,
    fontFamily: "Nunito-Regular",
  },
  placeholder: {
    color: COLORS.textLight,
  },
  optionsContainer: {
    backgroundColor: COLORS.white,
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: COLORS.primary,
    overflow: "hidden",
    top: scale(5),
    zIndex: 10,
  },
  scrollView: {
    flex: 1,
  },
  option: {
    paddingHorizontal: scale(12),
    paddingVertical: scale(12),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    minHeight: hp(5),
  },
  selectedOption: {
    backgroundColor: COLORS.lightPrimary,
  },
  optionText: {
    fontSize: scale(14),
    color: COLORS.textDark,
    fontFamily: "Nunito-Regular",
  },
  disabled: {
    backgroundColor: COLORS.lightGrey,
    borderColor: COLORS.grayLight,
  },
  disabledText: {
    color: COLORS.textLight,
  },
});
