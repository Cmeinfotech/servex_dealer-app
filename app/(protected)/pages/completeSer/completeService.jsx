import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import APIS from "../../../../api/Api";
import { IMAGES } from "../../../../assets/Images";
import { COLORS } from "../../../../constants/colors";
import { hp, scale, wp } from "../../../../constants/constants";
import RenderCard from "../../../../src/components/renderCard/RenderCard";
import DynamicText from "../../../../src/components/ui/DynamicText";
import EmptyState from "../../../../src/components/ui/EmptyState";
import Headers from "../../../../src/components/ui/Header";

const CompleteService = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchCompletedServices();
  }, []);

  const onDetails = useCallback(
    (service) => {
      router.push({
        pathname: "/pages/commonPage/ServiceDetails",
        params: {
          data: JSON.stringify(service),
          pageTitle: "Completed Services",
        },
      });
    },
    [router]
  );

  const fetchCompletedServices = async () => {
    setLoading(true);
    try {
      const res = await APIS.serviceData();
      if (res.status) {
        const completed =
          res.data
            ?.filter((i) => i?.status?.toLowerCase() === "completed")
            ?.reverse() || [];
        setData(completed);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = useCallback(
    ({ item, index }) => (
      <RenderCard
        item={item}
        index={index}
        onPress={onDetails}
        loading={loading}
      />
    ),
    [loading, onDetails]
  );

  const renderHeader = useCallback(
    () => (
      <>
        <View style={{ alignItems: "center" }}>
          <Image
            source={IMAGES.completedServiceIcon}
            style={{ width: wp(100), height: hp(20) }}
            contentFit="contain"
          />
        </View>
        <View style={styles.filterView}>
          <DynamicText
            size={scale(12)}
            color={COLORS.grey}
            style={styles.timeContainer}
          >
            Time
          </DynamicText>
          <DynamicText size={scale(12)} color={COLORS.grey}>
            Work
          </DynamicText>
        </View>
      </>
    ),
    []
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchCompletedServices();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      <Headers title="Completed Services" />
      <FlatList
        contentContainerStyle={{ paddingBottom: scale(15) }}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        data={loading ? Array(7).fill({}) : data}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          !loading && (
            <EmptyState
              title="No Completed Services"
              subtitle="You currently have no services marked as completed."
            />
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightPrimary,
    paddingHorizontal: scale(16),
  },
  filterView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  timeContainer: {
    width: wp(12),
  },
});

export default CompleteService;
