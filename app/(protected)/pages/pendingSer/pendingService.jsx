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

const PendingService = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPendingData();
  }, []);

  const fetchPendingData = useCallback(async () => {
    try {
      if (!refreshing) setLoading(true);
      const res = await APIS.serviceData();
      if (res.status) {
        const filtered = res.data
          ?.filter((i) => {
            const status = i?.status?.toLowerCase();
            return status === "pending" || status === "accepted" || status === "inprogress" || status === "booked" ;
          })
          ?.reverse();
        setData(filtered);
      } else {
        setData([]);
      }
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [refreshing]);

  const handleDetails = useCallback(
    (item) => {
      router.push({
        pathname: "/pages/commonPage/ServiceDetails",
        params: { data: JSON.stringify(item), pageTitle: "Pending Services" },
      });
    },
    [router]
  );

  const renderItem = useCallback(
    ({ item, index }) => (
      <RenderCard
        item={item}
        index={index}
        onPress={handleDetails}
        loading={loading}
      />
    ),
    [loading, handleDetails]
  );

  const renderHeader = useCallback(() => (
    <View>
      <View style={styles.headerImageContainer}>
        <Image
          source={IMAGES.pendingServiceIcon}
          style={styles.headerImage}
          contentFit="contain"
        />
      </View>
      <View style={styles.filterView}>
        <DynamicText size={scale(12)} color={COLORS.grey} style={styles.timeContainer}>
          Time
        </DynamicText>
        <DynamicText size={scale(12)} color={COLORS.grey}>
          Work
        </DynamicText>
      </View>
    </View>
  ), []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPendingData();
  }, [fetchPendingData]);

  return (
    <View style={styles.container}>
      <Headers title="Pending Services" />
      <FlatList
        data={loading ? Array(7).fill({}) : data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id?.toString() || `item-${index}`}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          !loading && (
            <EmptyState
              title="No Pending Services"
              subtitle="You currently have no services marked as pending."
            />
          )
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={onRefresh}
        initialNumToRender={10}
      />
    </View>
  );
};

export default PendingService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightPrimary,
    paddingHorizontal: scale(16),
  },
  listContent: {
    paddingBottom: scale(15),
  },
  filterView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerImageContainer: {
    alignItems: "center",
  },
  headerImage: {
    width: wp(100),
    height: hp(20),
  },
  timeContainer: {
    width: wp(12),
  },
});
