import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import { IMAGES } from "../../../../assets/Images";
import { COLORS } from "../../../../constants/colors";
import { hp, scale } from "../../../../constants/constants";
import Button from "../../../../src/components/ui/Button";
import DynamicText from "../../../../src/components/ui/DynamicText";
import Headers from "../../../../src/components/ui/Header";

const termsData = [
  {
    id: "1",
    text: "In order to be eligible to refer someone to a service, the user must have gotten at least one UC service delivered.",
  },
  {
    id: "2",
    text: "The credits received from a referral can only be redeemed as a discount on services availed on the UC app or website.",
  },
  {
    id: "3",
    text: "If the person being referred is a pre-existing user of the UC app or website and has already availed at least one service through the UC app or website, both the person being referred and the person referring will not receive referral credits.",
  },
  {
    id: "4",
    text: "If a user receives multiple referral links, only the first link in chronological order will be counted for validation.",
  },
  {
    id: "5",
    text: "UC reserves the right to allocate different reward values to different users and different service categories.",
  },
  {
    id: "6",
    text: "UC reserves the right to declare any reward null at any point in time at its own discretion.",
  },
  {
    id: "7",
    text: "UC reserves the right to block usage of rewards or credits for certain users at its own discretion.",
  },
  {
    id: "8",
    text: "UC reserves the right to change the nature of the referral program and introduce other kinds of rewards and discounts for the sender and/or receiver.",
  },
];

const TermsAndCondition = () => {
  const router = useRouter();

  const renderTermItem = ({ item, index }) => (
    <View style={styles.termItem} key={index}>
      <DynamicText size={14} style={styles.termNumber} weight="bold">
        {item.id}.{" "}
      </DynamicText>
      <DynamicText size={14} style={styles.termText}>
        {item.text}
      </DynamicText>
    </View>
  );
  return (
    <View style={styles.container}>
      <Image source={IMAGES.waveImage} style={styles.topImage} />
      <Headers
        title="Terms & Condition"
        white
        style={{ paddingHorizontal: scale(16) }}
      />
      <View style={styles.scrollContent}>
        <FlatList
          style={styles.form}
          data={termsData}
          renderItem={renderTermItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          windowSize={21}
          removeClippedSubviews={true}
          ListEmptyComponent={<DynamicText size={15}>No terms available</DynamicText>}
          contentContainerStyle={
            termsData.length === 0 && styles.emptyContainer
          }
        />
      </View>
      <View style={styles.footer}>
        <Button onPress={() => router.back()}>Go Back</Button>
      </View>
    </View>
  );
};

export default TermsAndCondition;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightPrimary,
    // paddingHorizontal: scale(16),
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: scale(16),
  },
  topImage: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: hp(28),
  },
  form: {
    flex: 1,
    marginVertical: hp(10),
    gap: scale(5),
  },
  termItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: scale(16),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  footer: {
    paddingHorizontal: scale(16),
    marginVertical: hp(2),
  },
});
