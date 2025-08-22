import { Image } from "expo-image";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import APIS from "../../../../api/Api";
import { IMAGES } from "../../../../assets/Images";
import { COLORS } from "../../../../constants/colors";
import { hp, scale } from "../../../../constants/constants";
import Border from "../../../../src/components/ui/Border";
import Button from "../../../../src/components/ui/Button";
import DynamicText from "../../../../src/components/ui/DynamicText";
import Headers from "../../../../src/components/ui/Header";
import Input from "../../../../src/components/ui/Input";
import Shimmer from "../../../../src/components/ui/Shimmer";
import { fetchLocationWithName } from "../../../../src/hooks/location";
import { useStore } from "../../../../src/hooks/store";

const Location = () => {
  const { userlocation, setUserLocation } = useStore((state) => state);

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const getLocation = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const { coordinates, name } = await fetchLocationWithName();

      if (name || coordinates) {
        const res = await APIS.postLocation({
          latitude: coordinates.coords.latitude,
          longitude: coordinates.coords.longitude,
          address: name,
        });
      }

      
      (name);
    } catch (error) {
      setErrorMsg(error.message || "Failed to get location");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Headers title="Select Location" />
        <View style={styles.contentContainer}>
          <Image source={IMAGES.locationIcon} style={styles.icons} />
          <View style={styles.locationView}>
            {loading ? (
              <Shimmer width={200} height={20} style={{ marginTop: 2 }} />
            ) : (
              <>
                <DynamicText size={scale(16)} weight="bold">
                  {userlocation || errorMsg || "Location not available"}
                </DynamicText>
              </>
            )}
          </View>
          <Button onPress={getLocation} borderRadius={8}>
            Fetch Location
          </Button>
          <Border backgroundColor={COLORS.border} />
        </View>
        <View style={styles.inputContainer}>
          <Input
            inputStyle={styles.input}
            onChangeText={setSearch}
            placeholder="Search location"
            value={search}
          />
          <FlatList />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(18),
  },
  contentContainer: {
    alignItems: "center",
    gap: 10,
  },
  locationView: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scale(8),
  },
  icons: {
    width: scale(20),
    height: scale(30),
    marginRight: scale(8),
  },
  inputContainer: {
    flex: 1,
    marginTop: scale(5),
  },
  input: {
    borderRadius: 8,
    height: hp(4.5),
  },
});
