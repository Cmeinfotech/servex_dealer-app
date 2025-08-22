import { StyleSheet, View } from "react-native";
import { hp, scale, wp } from "../../../constants/constants";
import DynamicText from "./DynamicText";

const EmptyState = ({ title = "No data available", subtitle }) => {
  return (
    <View style={styles.container}>
      {/* <Image
        source={IMAGES.emptyStateIcon}
        style={styles.image}
        resizeMode="contain"
      /> */}
      <DynamicText weight="bold" size={scale(14)}>
        {title}
      </DynamicText>
      {subtitle && (
        <DynamicText size={scale(12)} color="#888">
          {subtitle}
        </DynamicText>
      )}
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(10),
  },
  image: {
    width: wp(50),
    height: hp(20),
    marginBottom: scale(12),
  },
});
