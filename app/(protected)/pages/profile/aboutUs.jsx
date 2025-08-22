import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { IMAGES } from "../../../../assets/Images";
import { COLORS } from "../../../../constants/colors";
import { hp, scale } from "../../../../constants/constants";
import Button from "../../../../src/components/ui/Button";
import DynamicText from "../../../../src/components/ui/DynamicText";
import Headers from "../../../../src/components/ui/Header";

const AboutUs = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image source={IMAGES.waveImage} style={styles.topImage} />
      <Headers
        title="About Us"
        white
        style={{ paddingHorizontal: scale(16) }}
      />
      <ScrollView style={styles.scrollContent}>
        <View style={styles.form}>
          <DynamicText weight="bold" size={scale(18)}>
            About Servex
          </DynamicText>
          <DynamicText size={scale(14)}>
            Servex is a company specializing in appliance services, including
            repair, installation, and uninstallation. They offer professional
            solutions for a range of household appliances such as air
            conditioners and refrigerators. With a commitment to quality and
            customer satisfaction, Servex provides timely and efficient service
            to ensure that appliances are functioning optimally. Their team of
            skilled technicians is equipped to handle various service needs with
            expertise and reliability.
          </DynamicText>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button onPress={() => router.back()}>Go Back</Button>
      </View>
    </View>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightPrimary,
    // paddingHorizontal: scale(16),
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
  footer: {
    paddingHorizontal: scale(16),
    marginVertical: hp(2),
  },
});
