import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { IMAGES } from "../../../../assets/Images";
import { COLORS } from "../../../../constants/colors";
import { hp, scale, wp } from "../../../../constants/constants";
import DynamicText from "../../../../src/components/ui/DynamicText";
import Headers from "../../../../src/components/ui/Header";

const HelpCenter = () => {
  const router = useRouter()
  const onCall = () => Linking.openURL(`tel:${"+1 012-3456-789"}`);
  return (
    <View style={styles.container}>
      <Headers
        title="Contact Information"
        white
        style={{ paddingHorizontal: scale(16) }}
      />
      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.section}>
          <DynamicText
            weight="bold"
            size={scale(12)}
            center
            color={COLORS.silver}
          >
            Say something to start a live chat!
          </DynamicText>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onCall}
            style={styles.card}
          >
            <View style={styles.imageView}>
              <Image
                source={IMAGES.phoneIcon}
                contentFit="contain"
                style={styles.images}
              />
            </View>
            <DynamicText size={scale(13)} weight="bold" color={COLORS.white}>
              +1 012-3456-789
            </DynamicText>
          </TouchableOpacity>

          <View style={styles.card}>
            <View style={styles.imageView}>
              <Image
                source={IMAGES.emailIcon}
                contentFit="contain"
                style={styles.images}
              />
            </View>
            <DynamicText size={scale(13)} weight="bold" color={COLORS.white}>
              demo@gmail.com
            </DynamicText>
          </View>

          <View style={styles.card}>
            <View style={styles.imageView}>
              <Image
                source={IMAGES.location3D}
                contentFit="contain"
                style={styles.images}
              />
            </View>
            <DynamicText size={scale(13)} weight="bold" color={COLORS.white}>
              132 Dartmouth Street Boston, Massachusetts 02156 United States
            </DynamicText>
          </View>

          <View style={styles.socials}>
            <TouchableOpacity style={styles.icon}>
              <Entypo name="instagram" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <FontAwesome6 name="x-twitter" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <FontAwesome6 name="whatsapp" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={IMAGES.talking3D}
            style={styles.fullWidthImage}
            contentFit="contain"
          />
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.chatButton} onPress={() => router.push('/pages/chatScreen/chatScreen')}>
        <Image
          source={IMAGES.chat3D}
          style={styles.chatIcon}
          contentFit="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default HelpCenter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: scale(16),
  },
  section: {
    marginVertical: scale(10),
    gap: scale(8),
  },
  card: {
    backgroundColor: COLORS.lightPrimary,
    borderRadius: scale(10),
    borderCurve: "continuous",
    alignItems: "center",
    padding: scale(10),
    gap: 10,
    flexDirection: "row",
  },
  images: {
    width: scale(25),
    height: scale(25),
  },
  imageView: {
    borderWidth: 1,
    borderColor: COLORS.silver,
    borderRadius: 100,
    padding: 5,
  },
  chatIcon: {
    width: scale(40),
    height: scale(40),
  },
  chatButton: {
    backgroundColor: COLORS.white,
    position: "absolute",
    bottom: hp(4),
    right: wp(5),
    borderRadius: scale(100),
    padding: 5,
    shadowColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  socials: {
    marginTop: scale(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(20),
  },
  icon: {
    backgroundColor: COLORS.white,
    height: scale(40),
    width: scale(40),
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: scale(20),
  },
  fullWidthImage: {
    width: "100%",
    height: hp(40),
    maxWidth: wp(100) - scale(32),
  },
});
