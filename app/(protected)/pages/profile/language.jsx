import { Image } from "expo-image";
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { IMAGES } from "../../../../assets/Images";
import { COLORS } from "../../../../constants/colors";
import { hp, scale } from "../../../../constants/constants";
import DynamicText from "../../../../src/components/ui/DynamicText";
import Headers from "../../../../src/components/ui/Header";

const SelectButton = ({ title, onPress, value }) => (
  <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.5}>
    <DynamicText weight="bold" size={scale(14)} style={{ flex: 1 }}>
      {title}
    </DynamicText>
    <View
      style={[
        styles.radioCircle,
        title === value && styles.selectedRadioCircle,
      ]}
    >
      {title === value && <View style={styles.selectedRadioInnerCircle} />}
    </View>
  </TouchableOpacity>
);
const Language = () => {
  const [language, setLanguage] = useState("English");
  return (
    <View style={styles.container}>
      <Image source={IMAGES.waveImage} style={styles.topImage} />
      <Headers
        title="Language"
        white
        style={{ paddingHorizontal: scale(16) }}
      />
      <ScrollView style={styles.scrollContent}>
        <View style={styles.form}>
          <DynamicText weight="bold" size={scale(18)}>
            Select Language
          </DynamicText>

          <View style={styles.section}>
            <SelectButton
              title="English"
              value={language}
              onPress={() => setLanguage("English")}
            />
            <SelectButton
              title="हिन्दी"
              value={language}
              onPress={() => setLanguage("हिन्दी")}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Language;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightPrimary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: scale(16),
  },
  topImage: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: hp(28),
  },
  form: {
    flex: 1,
    marginVertical: hp(6),
    gap: scale(5),
  },
  section: {
    marginVertical: scale(20),
    gap: scale(10),
    paddingHorizontal: scale(10),
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.silver,
    paddingHorizontal: scale(10),
    paddingVertical: scale(12),
    borderRadius: 8,
    borderCurve: "continuous",
    backgroundColor: COLORS.white,
  },
  radioCircle: {
    height: scale(15),
    width: scale(15),
    borderRadius: scale(10),
    borderWidth: 2,
    borderColor: COLORS.silver,
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
