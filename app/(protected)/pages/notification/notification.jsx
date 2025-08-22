import { Image } from "expo-image";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { IMAGES } from "../../../../assets/Images";
import { COLORS } from "../../../../constants/colors";
import { hp, scale, wp } from "../../../../constants/constants";

import Border from "../../../../src/components/ui/Border";
import DynamicText from "../../../../src/components/ui/DynamicText";
import Headers from "../../../../src/components/ui/Header";

const Notification = () => {
  const notifications = Array(20).fill({
    title: "Amount Received",
    message: "You have received an amount from Sakshi Borse",
    time: "01:00 PM",
    image: IMAGES.stockImage,
  });

  const renderNotificationItem = ({ item }) => (
    <View>
      <Pressable style={styles.notificationContainer}>
        {/* Left Content */}
        <View style={styles.leftContent}>
          <Image
            source={item.image}
            style={styles.userImage}
            contentFit="cover"
          />
          <View style={styles.textContainer}>
            <DynamicText weight="bold" size={15}>
              {item.title}
            </DynamicText>
            <DynamicText size={12} color={COLORS.textSecondary}>
              {item.message}
            </DynamicText>
          </View>
        </View>

        {/* Time */}
        <DynamicText size={10} color={COLORS.textSecondary}>
          {item.time}
        </DynamicText>
      </Pressable>

      {/* Divider */}
      <Border backgroundColor={COLORS.border} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Headers title="Notifications" style={styles.header} />
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: wp(2),
  },
  listContent: {
    paddingVertical: hp(2),
  },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: wp(5),
    paddingVertical: scale(6),
    justifyContent: "space-between",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: wp(2),
    flex: 1,
    paddingRight: wp(6),
  },
  textContainer: {
    flexShrink: 1,
  },
  userImage: {
    height: scale(20),
    width: scale(20),
    borderRadius: 50,
  },
});
