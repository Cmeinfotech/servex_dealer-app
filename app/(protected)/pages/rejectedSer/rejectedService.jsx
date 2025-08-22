import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import APIS from "../../../../api/Api";
import { IMAGES } from "../../../../assets/Images";
import { COLORS } from "../../../../constants/colors";
import { hp, scale, wp } from "../../../../constants/constants";
import RenderCard from "../../../../src/components/renderCard/RenderCard";
import DynamicText from "../../../../src/components/ui/DynamicText";
import EmptyState from "../../../../src/components/ui/EmptyState";
import Headers from "../../../../src/components/ui/Header";

const RejectedService = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const onDetails = (i) => {
    router.push({
      pathname: "/pages/commonPage/ServiceDetails",
      params: { data: JSON.stringify(i), pageTitle: "Pending Services" },
    });
  };

  useEffect(() => {
    getRejectedData();
  }, []);

  const getRejectedData = async () => {
    setLoading(true);
    try {
      const res = await APIS.serviceData();

      if (res.status === true) {
        const filterData = res?.data
          ?.filter((i) => i?.status?.toLowerCase() === "rejected")
          ?.reverse();
        setData(filterData);
      } else {
        setData([]);
      }
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item, index }) => (
    <RenderCard
      item={item}
      index={index}
      onPress={(data) => onDetails(data)}
      loading={loading}
    />
  );

  const renderHeader = () => (
    <View>
      <View style={{ alignItems: "center" }}>
        <Image
          source={IMAGES.rejectedServiceIcon}
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
    </View>
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await getRejectedData();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Headers title="Rejected Services" />
      {loading ? (
        <FlatList
          contentContainerStyle={{ paddingBottom: scale(15) }}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
          data={Array(7).fill({})}
          renderItem={renderItem}
          keyExtractor={(_, index) => `item-${index}`}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      ) : data.length === 0 ? (
        <>
          {renderHeader()}
          <EmptyState
            title="No Rejected Services"
            subtitle="You currently have no services marked as rejected."
          />
        </>
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: scale(15) }}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderItem}
          keyExtractor={(_, index) => `item-${index}`}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
    </View>
  );
};

export default RejectedService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightPrimary,
    paddingHorizontal: scale(16),
  },
  filterView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    position: "static",
  },
  itemContainer: {
    marginTop: 10,
    flexDirection: "row",
    gap: 10,
  },
  timeContainer: {
    width: wp(12),
  },
  card: {
    flex: 1,
    padding: 12,
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: scale(10),
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
  },
  subType: {
    color: "#666",
    marginTop: 4,
  },
  issue: {
    color: "#444",
    marginTop: 2,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 5,
  },
  location: {
    fontSize: 12,
    color: "#555",
    marginLeft: 4,
  },
});
