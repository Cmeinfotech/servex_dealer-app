import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IMAGES } from "../../../assets/Images";
import { COLORS } from "../../../constants/colors";
import { scale } from "../../../constants/constants";
import DynamicText from "./DynamicText";

const Headers = ({ title = "", style, white = false, disabled = false }) => {
  const router = useRouter();

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        hitSlop={{ left: 10, top: 10, bottom: 10, right: 10 }}
        onPress={() => router.back()}
        disabled={disabled}
      >
        <Image
          source={IMAGES.leftChevron}
          style={[styles.leftIcon, white && { tintColor: COLORS.white }]}
          contentFit="contain"
        />
      </TouchableOpacity>
      <DynamicText
        size={scale(14)}
        weight="bold"
        color={white ? COLORS.white : COLORS.black}
      >
        {title}
      </DynamicText>
    </View>
  );
};

export default Headers;

const styles = StyleSheet.create({
  container: {
    paddingVertical: scale(5),
    marginVertical: scale(2),
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
    
  },
  leftIcon: {
    width: scale(25),
    height: scale(25),
  },
});
