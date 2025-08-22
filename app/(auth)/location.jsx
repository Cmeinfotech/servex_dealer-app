import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { useCallback, useContext, useRef, useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IMAGES } from "../../assets/Images";
import { COLORS } from "../../constants/colors";
import { hp, wp } from "../../constants/constants";
import BottomSheet from "../../src/components/bottomSheet/BottomSheet";
import Border from "../../src/components/ui/Border";
import Button from "../../src/components/ui/Button";
import DynamicText from "../../src/components/ui/DynamicText";
import { storeData } from "../../src/hooks/asynStorageHooks";
import { fetchLocationWithName } from "../../src/hooks/location";
import { useStore } from "../../src/hooks/store";
import { AuthContext } from "../ctx";

const LocationPage = () => {
  const animation = useRef(null);
  const { logIn } = useContext(AuthContext);

  const router = useRouter();
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const { setUserLocation } = useStore((state) => state);

  useEffect(() => {
    fetchUserLocation();
  }, []);

  const fetchUserLocation = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const { coordinates, name } = await fetchLocationWithName();

      setLocation(coordinates);
      setLocationName(name);
      setUserLocation(name);

      await storeData("location", name);

      // await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      console.error("Error fetching location:", error);
      setErrorMsg(
        error?.message ?? "Unable to retrieve location. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [logIn, setUserLocation]);

  const sheetRef = useRef(null);

  return (
    <ImageBackground
      source={IMAGES.locationBg}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.root}>
          {location ? (
            <>
              <DynamicText style={styles.text} weight="bold" size={hp(2)}>
                📍 {locationName || "Getting address..."}
              </DynamicText>
            </>
          ) : (
            <LottieView
              autoPlay
              ref={animation}
              style={{
                width: wp(100),
                height: hp(25),
                alignItems: "center",
              }}
              loop={false}
              source={require("../../assets/animation/LocationAnimation.json")}
            />
          )}

          {/* Display location information */}
          <View style={styles.locationInfo}>
            {loading && <Text style={styles.text}>Fetching location...</Text>}

            {errorMsg && (
              <Text style={[styles.text, styles.error]}>{errorMsg}</Text>
            )}
          </View>
        </View>

        <View
          style={[
            styles.buttonContainer,
            !location && { paddingBottom: hp(3) },
          ]}
        >
          <Button
            onPress={fetchUserLocation}
            loading={loading}
            disabled={loading}
            style={styles.locationBtn}
            backgroundColor={COLORS.primary}
            borderRadius={10}
          >
            {location ? "Update Location" : "Get My Location"}
          </Button>

          <Button
            onPress={() => sheetRef.current?.open(0)}
            style={styles.locationBtn}
            backgroundColor={COLORS.primary}
            borderRadius={10}
          >
            Open in Maps
          </Button>
        </View>
        {location && (
          <>
            <Border backgroundColor={COLORS.primary} />
            <View style={styles.homeBtnView}>
              <Button
                onPress={logIn}
                style={{ width: "100%", marginTop: 10 }}
                borderRadius={10}
              >
                Go to Home
              </Button>
            </View>
          </>
        )}
      </SafeAreaView>

      <BottomSheet ref={sheetRef} snapPoints={[0.5, 0.7]}>
        <View style={styles.sheetContent}>
          <DynamicText center weight="bold">
            Near by location will fetch here
          </DynamicText>
        </View>
      </BottomSheet>
    </ImageBackground>
  );
};

export default LocationPage;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    paddingHorizontal: wp(5),
    gap: 8,
    alignItems: "center",
    paddingBottom: hp(1),
  },
  locationBtn: {
    // width: wp(70),
    flex: 1,
  },
  locationInfo: {
    marginTop: hp(4),
    alignItems: "center",
    paddingHorizontal: wp(8),
  },
  error: {
    color: "#ff6b6b",
  },
  homeBtnView: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(3),
  },
});
