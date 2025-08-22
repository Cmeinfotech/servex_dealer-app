import { Image } from "expo-image";
import { Stack } from "expo-router";
import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IMAGES } from "../../../../assets/Images";
import { COLORS } from "../../../../constants/colors";
import { hp } from "../../../../constants/constants";

const ProfileLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightPrimary }}>
      <StatusBar barStyle="light-content" />
      <Image source={IMAGES.waveImage} style={styles.topImage} />

      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
};

export default ProfileLayout;
const styles = StyleSheet.create({
  topImage: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: hp(28),
  },
});
