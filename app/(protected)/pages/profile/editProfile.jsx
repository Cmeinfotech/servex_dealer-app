import { Image, ImageBackground } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import APIS from "../../../../api/Api";
import { IMAGES } from "../../../../assets/Images";
import { COLORS } from "../../../../constants/colors";
import { hp, scale } from "../../../../constants/constants";
import Toast from "../../../../src/components/toast/Toast";
import Button from "../../../../src/components/ui/Button";
import DynamicText from "../../../../src/components/ui/DynamicText";
import Headers from "../../../../src/components/ui/Header";
import Input from "../../../../src/components/ui/Input";
import { getData, storeData } from "../../../../src/hooks/asynStorageHooks";

const EditProfile = () => {
  const toastRef = useRef();

  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [userImage, setUserImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const getUserData = async () => {
    const userInfo = await getData("userDetail");

    if (userInfo.name) setUsername(userInfo.name || "");
    if (userInfo.contactNo) setContactNo(userInfo.contactNo || "");
    if (userInfo.shopAddress) setAddress(userInfo.shopAddress || "");
    if (userInfo.image) setUserImage(userInfo.image || "");
  };
  useEffect(() => {
    getUserData();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUserImage(result.assets[0]);
    }
  };

  const updateProfile = async () => {
    setLoading(true);
    try {
      let formData = new FormData();

      formData.append("name", username);
      formData.append("shopAddress", address);
      formData.append("contactNo", contactNo);
      typeof userImage === "object" &&
        formData.append("image", {
          uri: userImage?.uri,
          type: userImage?.mimeType,
          name: userImage?.fileName,
        });

      const res = await APIS.updateProfile(formData);

      if (res.status === true) {
        await storeData("userDetail", res?.data ?? {});
        toastRef.current?.show("Profile updated successfully");
      }
    } catch (error) {
      toastRef.current?.show("Failed to update the profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
      >
        <ScrollView style={styles.scrollContent}>
          <ImageBackground
            source={IMAGES.waveImage}
            style={styles.backgroundImage}
            contentFit="cover"
          >
            <Headers title="Edit Profile" white disabled={loading} />
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
                <Image
                  source={
                    typeof userImage === "string"
                      ? { uri: userImage }
                      : userImage?.uri
                      ? { uri: userImage.uri }
                      : IMAGES.blankImage
                  }
                  style={styles.profileImage}
                  contentFit="cover"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginTop: scale(10) }}
                hitSlop={{ left: 15, top: 15, right: 15, bottom: 15 }}
                onPress={pickImage}
              >
                <DynamicText weight="bold" size={scale(12)}>
                  Change Image
                </DynamicText>
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <View style={styles.form}>
            <Input
              title="Username"
              onChangeText={setUsername}
              value={username}
              placeholder="Username"
            />
            <Input
              title="Address"
              placeholder="Address"
              onChangeText={setAddress}
              value={address}
            />
            <Input
              title="Contact No"
              onChangeText={setContactNo}
              value={contactNo}
              maxLength={10}
              keyboardType="number-pad"
              inputMode="tel"
              placeholder="Contact no"
            />
            <Button
              paddingVertical={scale(13)}
              style={{ marginTop: scale(10) }}
              onPress={updateProfile}
              isLoading={loading}
              disabled={loading}
            >
              Submit
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast
        ref={toastRef}
        position="bottom"
        duration={3000}
        icon={false}
        textCenter
        style={{ backgroundColor: COLORS.modalBackground }}
      />
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightPrimary,
    // paddingHorizontal: scale(16),
  },
  scrollContent: {
    flexGrow: 1,
  },
  profileImage: {
    width: scale(120),
    height: scale(120),
    borderRadius: scale(100),
    borderWidth: 2,
    borderColor: COLORS.white,
    backgroundColor: COLORS.white,
  },
  backgroundImage: {
    height: hp(30),
    paddingHorizontal: scale(16),
  },
  form: {
    flex: 1,
    marginVertical: scale(10),
    paddingHorizontal: scale(16),
    gap: scale(12),
  },
});
