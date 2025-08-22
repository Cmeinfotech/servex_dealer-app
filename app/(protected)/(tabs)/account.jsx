import { useFocusEffect } from "@react-navigation/native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useCallback, useContext, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { IMAGES } from "../../../assets/Images";
import { COLORS } from "../../../constants/colors";
import { hp, scale } from "../../../constants/constants";
import CustomModal from "../../../src/components/modal/Modal";
import Button from "../../../src/components/ui/Button";
import DynamicText from "../../../src/components/ui/DynamicText";
import Shimmer from "../../../src/components/ui/Shimmer";
import { getData } from "../../../src/hooks/asynStorageHooks";
import { AuthContext } from "../../ctx";

const ProfileButton = ({ image, title, onPress }) => (
  <TouchableOpacity
    style={styles.menuItem}
    activeOpacity={0.4}
    onPress={onPress}
  >
    <View style={styles.menuTextView}>
      <Image
        source={image}
        style={{ width: scale(22), height: scale(22) }}
        contentFit="contain"
      />
      <DynamicText size={scale(14)} weight="bold">
        {title}
      </DynamicText>
    </View>
    <Image
      source={IMAGES.leftChevron}
      style={{
        width: scale(22),
        height: scale(22),
        transform: [{ rotate: "180deg" }],
      }}
    />
  </TouchableOpacity>
);

const Account = () => {
  const { logOut } = useContext(AuthContext);
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      getUserData();
    }, [])
  );

  const getUserData = async () => {
    setIsLoading(true);
    try {
      const data = await getData("userDetail");
      setUserData(data);
    } catch (error) {
      setUserData({});
    } finally {
      setIsLoading(false);
    }
  };

  const openSheet = () => {
    router.push('/pages/profile/termsCondition');
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.header}>
          <DynamicText center weight="bold" size={scale(18)}>
            My Profile
          </DynamicText>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          {isLoading ? (
            <Shimmer
              width={scale(70)}
              height={scale(70)}
              style={{ borderRadius: scale(35) }}
              // borderRadius={scale(35)}
            />
          ) : (
            <Image
              onError={() => {
                setIsLoading(true);
                setUserData((prev) => ({ ...prev, image: null }));
              }}
              source={
                typeof userData?.image === "string"
                  ? {
                      uri: userData?.image,
                    }
                  : IMAGES.blankImage
              }
              style={styles.profileImage}
              contentFit="cover"
            />
          )}
          <View style={styles.profileInfo}>
            <DynamicText weight="bold" size={scale(16)}>
              {userData?.name || ""}
            </DynamicText>
            <DynamicText size={scale(12)} style={styles.phoneText}>
              {userData?.contactNo || ""}
            </DynamicText>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuContainer}>
          <ProfileButton
            title="Edit Profile"
            image={IMAGES.userIcon}
            onPress={() => router.push("/pages/profile/editProfile")}
          />
          <ProfileButton
            title="About Us"
            image={IMAGES.aboutUsIcon}
            onPress={() => router.push("/pages/profile/aboutUs")}
          />
          <ProfileButton
            title="Bank Details"
            image={IMAGES.bankIcon}
            onPress={() => router.push("/pages/profile/bankDetails")}
          />
          {/* <ProfileButton
            title="Change Language"
            image={IMAGES.languageIcon}
            onPress={() => router.push("/pages/profile/language")}
          /> */}
          <ProfileButton
            title="Help Center"
            image={IMAGES.helpIcon}
            onPress={() => router.push("/pages/profile/helpCenter")}
          />
          <Button onPress={() => setModalVisible(true)}>Logout</Button>

          <TouchableOpacity style={{ alignSelf: "center" }} onPress={openSheet}>
            <DynamicText size={12} color={COLORS.primary} weight="bold">
              Terms & Conditions
            </DynamicText>
          </TouchableOpacity>
        </View>

        <CustomModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          backdropOpacity={0.8}
          // title={"Logout"}
        >
          <View style={{ position: "relative", height: 40 }}>
            <Image
              source={IMAGES.logout3D}
              style={{
                width: 80,
                height: 80,
                position: "absolute",
                alignSelf: "center",
                top: -50,
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: 100,
              }}
            />
          </View>
          <DynamicText center weight="bold">
            Are you sure you want to log out?
          </DynamicText>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginTop: scale(20),
            }}
          >
            <Button
              paddingVertical={scale(5)}
              backgroundColor={COLORS.primaryExtraLight}
              textColor={COLORS.primary}
              size={scale(10)}
              onPress={() => setModalVisible(false)}
            >
              Cancel
            </Button>
            <Button
              paddingVertical={scale(5)}
              style={{ flex: 1 }}
              onPress={logOut}
            >
              Logout
            </Button>
          </View>
        </CustomModal>
      </ScrollView>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: Platform.OS === "ios" ? hp(10) : hp(17),
  },
  header: {
    paddingVertical: scale(20),
    paddingHorizontal: scale(16),
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: scale(20),
    marginHorizontal: scale(16),
    marginBottom: scale(20),
    backgroundColor: COLORS.primaryExtraLight,
    borderRadius: scale(12),
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileImage: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(35),
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  profileInfo: {
    marginLeft: scale(16),
  },
  phoneText: {
    marginTop: scale(4),
    color: COLORS.darkGrey,
  },
  menuContainer: {
    marginHorizontal: scale(16),
    borderRadius: scale(12),
    backgroundColor: COLORS.white,
    gap: scale(12),
  },
  menuItem: {
    paddingVertical: scale(12),
    paddingHorizontal: scale(15),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: scale(10),
  },
  menuTextView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  customHandle: {
    padding: 15,
    alignItems: "center",
    backgroundColor: "#e9ecef",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});
