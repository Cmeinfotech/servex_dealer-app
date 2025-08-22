import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../constants/colors";
import { hp, scale, wp } from "../../../constants/constants";
import { dateFormat, timeFormat } from "../../utils/utils";
import DynamicText from "../ui/DynamicText";
import Shimmer from "../ui/Shimmer";

const RenderCard = ({ item, index, onPress, loading = false }) => {
  let statusColor;

  switch (item?.status?.toLowerCase()) {
    case "booked":
      statusColor = "#FF8C00";
      break;
    case "accepted":
      statusColor = "#50C878";
      break;
    case "pending":
      statusColor = "#6082B6";
      break;
    case "inprogress":
      statusColor = "#007FFF";
      break;
    case "completed":
      statusColor = "#50C878";
      break;
    case "rejected":
      statusColor = "#FF0800";
      break;
    default:
      statusColor = "#000";
      break;
  }
  return (
    <View style={styles.itemContainer} key={`${item?.title}-${index}`}>
      <View style={styles.timeContainer}>
        {loading ? (
          <Shimmer height={12} width={40} borderRadius={3} />
        ) : (
          <DynamicText weight="bold" size={scale(12)}>
            {dateFormat(item?.scheduledDate)}
          </DynamicText>
        )}
        {loading ? (
          <Shimmer height={12} width={25} style={{ marginTop: 3 }} />
        ) : (
          <DynamicText size={scale(10)}>
            {timeFormat(item?.scheduledTime)}
          </DynamicText>
        )}
      </View>
      {loading ? (
        <Shimmer height={hp(12)} width={wp(80)} />
      ) : (
        <TouchableOpacity
          activeOpacity={0.6}
          style={[
            styles.card,
            item.cardColor && { backgroundColor: item.cardColor },
          ]}
          onPress={() => onPress(item)}
        >
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor: statusColor,
              },
            ]}
          />
          <View style={styles.cardHeader}>
            <DynamicText size={scale(14)} weight="bold">
              {item?.Category?.categoryName || "N/A"}
            </DynamicText>
          </View>
          <DynamicText size={scale(11)} style={{ marginVertical: 5 }}>
            {item?.CategoryType?.categoryTypeName || "N/A"}
          </DynamicText>
          <DynamicText size={scale(11)}>
            {item?.Issue?.issueName || "N/A"}
          </DynamicText>
          <View style={styles.locationRow}>
            <MaterialIcons name="location-on" size={14} color="#555" />
            <DynamicText size={scale(10)}>
              {item?.customerAddress || "Address not available"}
            </DynamicText>
          </View>
        </TouchableOpacity>
      )}
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
    borderRadius: 10,
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: scale(10),
    position: "relative",
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
  statusDot: {
    width: scale(8),
    height: scale(8),
    borderRadius: 20,
    position: "absolute",
    top: scale(8),
    right: scale(8),
  },
});

export default RenderCard;
