import { useLocalSearchParams, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { COLORS } from "../../../../constants/colors";
import { hp, scale, wp } from "../../../../constants/constants";
import Button from "../../../../src/components/ui/Button";
import DynamicText from "../../../../src/components/ui/DynamicText";

const CustomerDetails = ({ title, desc }) => {
  return (
    <View>
      <DynamicText size={scale(12)}>{title}</DynamicText>
      <DynamicText size={scale(13)} weight="bold">
        {desc}
      </DynamicText>
    </View>
  );
};

const SuccessPage = () => {
  const router = useRouter();
  const animation = useRef(null);
  const { data } = useLocalSearchParams();

  const parsedData = data ? JSON.parse(data) : {};

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: wp(100),
          height: hp(20),
          alignItems: "center",
          // backgroundColor: 'red'
        }}
        loop={false}
        source={require("../../../../assets/animation/successAnimation.json")}
      />
      <View style={styles.informationCard}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <DynamicText style={{ textAlign: "center" }} weight="bold">
            Dear Ganesh Thorat
          </DynamicText>
          <DynamicText style={{ textAlign: "center" }} size={scale(14)}>
            Your service has been booked successfully.
          </DynamicText>

          <View
            style={{
              borderTopColor: COLORS.lightPrimary,
              borderTopWidth: 1,
              marginTop: 10,
              paddingTop: 10,
              alignItems: "flex-start",
              gap: 10,
            }}
          >
            <CustomerDetails
              title="Customer Name:"
              desc={parsedData?.customerName}
            />
            <CustomerDetails
              title="Customer Number:"
              desc={parsedData?.customerContactNo}
            />
            <CustomerDetails
              title="Customer Adress:"
              desc={parsedData?.customerAddress}
            />
            <CustomerDetails
              title="Product Type:"
              desc={parsedData?.categoryId?.categoryName}
            />
            <CustomerDetails
              title="Product Category:"
              desc={parsedData?.categoryTypeId?.categoryName}
            />
            <CustomerDetails
              title="Product Issue:"
              desc={parsedData?.issueId?.categoryName}
            />
            <CustomerDetails
              title="Warranty Type:"
              desc={parsedData?.warrantyType}
            />

            <DynamicText size={scale(12)}>Scheduled Time:</DynamicText>
            <View style={styles.dateTimeDisplayContainer}>
              <View style={styles.dateTimeBox}>
                <DynamicText
                  size={scale(13)}
                  weight="bold"
                  color={COLORS.textSecondary}
                >
                  {parsedData.scheduledDate || "--/--/----"}
                </DynamicText>
              </View>

              <View style={styles.dateTimeBox}>
                <DynamicText
                  size={scale(13)}
                  weight="bold"
                  color={COLORS.textSecondary}
                >
                  {parsedData.scheduledTime || "--:-- --"}
                </DynamicText>
              </View>
            </View>
          </View>
        </ScrollView>
        <Button borderRadius={8} onPress={() => router.replace("/(tabs)")}>
          Home
        </Button>
      </View>
    </View>
  );
};

export default SuccessPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightPrimary,
  },
  informationCard: {
    backgroundColor: COLORS.white,
    paddingHorizontal: scale(16),
    flex: 1,
    paddingVertical: 15,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    shadowColor: COLORS.lightGrey,
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    borderCurve: "continuous",
  },
  dateTimeDisplayContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8), // Better than fixed margin
  },
  dateTimeBox: {
    flex: 1, // Takes equal space
    backgroundColor: COLORS.backgroundMuted,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(8),
    paddingVertical: scale(8), // More balanced padding
    paddingHorizontal: scale(8), // Added horizontal padding
  },
});
