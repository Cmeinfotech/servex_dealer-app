import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import APIS from "../../../api/Api";
import { IMAGES } from "../../../assets/Images";
import { COLORS } from "../../../constants/colors";
import { hp, scale } from "../../../constants/constants";
import DynamicText from "../../../src/components/ui/DynamicText";
import Shimmer from "../../../src/components/ui/Shimmer";
import { getData, storeData } from "../../../src/hooks/asynStorageHooks";
import { fetchLocationWithName } from "../../../src/hooks/location";
import { useStore } from "../../../src/hooks/store";

const HomeScreen = () => {
  const router = useRouter();
  const { userlocation, setUserLocation } = useStore((state) => state);

  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const [serviceData, setServiceData] = useState([] || null);

  useEffect(() => {
    getLocation();
    getServiceData();
  }, []);

  const getLocation = async () => {
    const loc = await getData("location" || "");
    setUserLocation(loc);
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

      await storeData("location", name);
      setUserLocation(name);
    } catch (error) {
      setErrorMsg(error.message || "Failed to get location");
    } finally {
      setLoading(false);
    }
  };

  const services = [
    {
      id: 1,
      title: "Request for Service",
      image: IMAGES.serviceCall,
      navigate: "requestSer/requestService",
    },
    {
      id: 2,
      title: "Completed Services",
      image: IMAGES.completedService,
      navigate: "completeSer/completeService",
    },
    {
      id: 3,
      title: "Pending Services",
      image: IMAGES.pendingService,
      navigate: "pendingSer/pendingService",
    },
    {
      id: 4,
      title: "Rejected Services",
      image: IMAGES.rejectedService,
      navigate: "rejectedSer/rejectedService",
    },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.cardSection} key={item.title}>
        <TouchableOpacity
          style={styles.cardView}
          onPress={() => router.push(`/pages/${item?.navigate}`)}
        >
          <Image
            source={item.image}
            style={styles.cardImage}
            contentFit="contain"
          />
          <View
            style={{
              width: 0.7,
              height: "80%",
              backgroundColor: COLORS.border,
              marginHorizontal: 10,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flex: 1,
              paddingRight: 7,
            }}
          >
            <DynamicText size={scale(15)}>{item.title}</DynamicText>
            <View
              style={{
                backgroundColor: COLORS.lightGrey,
                borderRadius: scale(5),
                padding: scale(2),
              }}
            >
              <Image source={IMAGES.arrow} style={styles.icons} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const locationPage = () => {
    router.push("/pages/location/location");
  };

  const getServiceData = async () => {
    try {
      const res = await APIS.serviceList();
      if (res.status === true) {
        setServiceData(res.services);
      } else {
        setServiceData([]);
      }
    } catch (error) {
      setServiceData([]);
    }
  };

  const notificationPage = () => {
    router.push("/pages/notification/notification");
  };

  // const videoSource =
  //   "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const videoSource = "http://3.93.64.231:3000/public/videos/1755580502416.mp4";

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <DynamicText
          style={styles.heading}
          color={COLORS.white}
          weight="bold"
          size={scale(15)}
        >
          Servex
        </DynamicText>
        <TouchableOpacity
          onPress={notificationPage}
          hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
        >
          <Image
            source={IMAGES.bellIcon}
            style={[styles.icons, { tintColor: COLORS.white }]}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={services}
        // numColumns={2}
        ListHeaderComponent={
          <View style={{ marginBottom: scale(10) }}>
            <TouchableOpacity
              style={styles.locationView}
              activeOpacity={0.8}
              onPress={locationPage}
            >
              <View style={styles.locationDetails}>
                <Image source={IMAGES.locationIcon} style={styles.icons} />
                {loading ? (
                  <Shimmer width={200} height={20} style={{ marginTop: 2 }} />
                ) : (
                  <DynamicText size={scale(12)} weight="bold">
                    {userlocation || "Location not available"}
                  </DynamicText>
                )}
              </View>
              <Pressable onPress={locationPage}>
                <Image source={IMAGES.arrow} style={styles.icons} />
              </Pressable>
            </TouchableOpacity>

            {/* <Image
              source={IMAGES.stockImage}
              style={{ aspectRatio: 3 / 2 }}
              contentFit="contain"
            /> */}

            <VideoView
              style={{
                aspectRatio: 3 / 2,
                backgroundColor: 'black'
              }}
              player={player}
              nativeControls={false}
            />
          </View>
        }
        contentContainerStyle={{
          paddingBottom: Platform.OS === "ios" ? hp(10) : hp(13.4),
        }}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: scale(15),
    backgroundColor: COLORS.primary,
    paddingHorizontal: scale(18),
    marginTop: scale(2),
  },
  icons: {
    height: 25,
    width: 25,
  },
  locationView: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scale(8),
    paddingHorizontal: scale(12),
  },
  locationDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
    flex: 1,
    flexShrink: 1,
  },
  cardSection: {
    paddingHorizontal: scale(18),
    marginVertical: scale(5),
  },
  cardView: {
    borderWidth: 0.5,
    borderColor: COLORS.border,
    borderRadius: scale(7),
    padding: scale(5),
    flexDirection: "row",
    alignItems: "center",
  },
  cardImage: {
    height: hp(8),
    width: hp(8),
  },
});
