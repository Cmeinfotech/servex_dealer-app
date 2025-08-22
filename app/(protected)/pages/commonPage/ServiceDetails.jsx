import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IMAGES } from "../../../../assets/Images";
import { commonStyle } from "../../../../assets/styles/common.style";
import { COLORS } from "../../../../constants/colors";
import { scale } from "../../../../constants/constants";
import Border from "../../../../src/components/ui/Border";
import DynamicText from "../../../../src/components/ui/DynamicText";
import Headers from "../../../../src/components/ui/Header";
import { dateFormat, timeFormat } from "../../../../src/utils/utils";

const NameSection = ({
  title,
  des,
  titleSize = scale(12),
  desSize = scale(13),
  marginTop = scale(5),
}) => (
  <View style={[styles.infoView, { marginTop: marginTop }]}>
    <DynamicText size={titleSize}>{title}</DynamicText>
    <DynamicText
      size={desSize}
      weight="bold"
      style={{ flex: 1, flexShrink: 1 }}
    >
      {des}
    </DynamicText>
  </View>
);

const ServiceDetails = () => {
  const params = useLocalSearchParams();
  const [parsedData, setParsedData] = useState(
    params?.data ? JSON.parse(params?.data) : {}
  );
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightPrimary }}>
      <View style={styles.container}>
        <Headers title={params.pageTitle} />
        <ScrollView
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cardView}>
            <View style={[commonStyle.flexRow, { gap: 10 }]}>
              <View style={styles.imageSec}>
                <Image
                  source={IMAGES.completedServiceIcon}
                  style={styles.image}
                  contentFit="contain"
                />
              </View>
              <DynamicText weight="bold" size={scale(14)}>
                Service Details
              </DynamicText>
            </View>
            <View style={styles.detailsSection}>
              <View
                style={[
                  commonStyle.flexRow,
                  { justifyContent: "space-between" },
                ]}
              >
                <DynamicText weight="bold" color={COLORS.primary}>
                  {parsedData?.Category?.categoryName || "Not Found"}
                </DynamicText>
                {/* <DynamicText weight="bold" color={COLORS.green}>
                  ₹200
                </DynamicText> */}
              </View>

              <NameSection
                title="Product sub-type:"
                des={parsedData?.CategoryType?.categoryTypeName || "Not Found"}
                desSize={scale(12)}
              />
              <NameSection
                title="Issue:"
                des={parsedData?.Issue?.issueName || "Not Found"}
                desSize={scale(12)}
              />
              {parsedData?.productDescription !==
                parsedData?.Issue?.issueName &&
                parsedData?.productDescription && (
                  <NameSection
                    title="Product Description"
                    des={parsedData?.productDescription || "Not Found"}
                    desSize={scale(12)}
                  />
                )}
              <Border height={0.8} />
              <NameSection
                title="Customer Name:"
                des={parsedData?.customerName || "Not Found"}
                marginTop={scale(2)}
              />
              <NameSection
                title="Customer Number:"
                des={parsedData?.customerContactNo || "Not Found"}
                marginTop={scale(2)}
              />

              <View style={styles.dateSections}>
                <View style={styles.imageSec}>
                  <Image source={IMAGES.calendar} style={styles.image} />
                </View>
                <View>
                  <DynamicText weight="bold" size={scale(13)}>
                    {`${timeFormat(parsedData.scheduledTime)} - ${dateFormat(
                      parsedData?.scheduledDate
                    )}`}
                  </DynamicText>
                  <DynamicText size={scale(11)} color={COLORS.grey}>
                    Schedule
                  </DynamicText>
                </View>
              </View>

              <View style={styles.dateSections}>
                <View style={styles.imageSec}>
                  <Image source={IMAGES.locationBlack} style={styles.image} />
                </View>
                <DynamicText weight="bold" size={scale(13)}>
                  {parsedData?.customerAddress}
                </DynamicText>
              </View>
            </View>
          </View>

          <View style={styles.cardView}>
            <View style={[commonStyle.flexRow, { gap: 10 }]}>
              <View style={styles.imageSec}>
                <Image
                  source={IMAGES.receipt}
                  style={styles.image}
                  contentFit="contain"
                />
              </View>
              <DynamicText weight="bold" size={scale(14)}>
                Bill breakdown
              </DynamicText>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ServiceDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightPrimary,
    paddingHorizontal: scale(16),
  },
  cardView: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: scale(10),
    borderRadius: scale(10),
    marginBottom: scale(10),
  },
  imageSec: {
    backgroundColor: COLORS.lightGrey,
    borderRadius: scale(100),
    alignItems: "center",
    justifyContent: "center",
    width: scale(30),
    height: scale(30),
    borderWidth: 1,
    borderColor: COLORS.grey,
  },
  image: {
    width: scale(20),
    height: scale(20),
  },
  detailsSection: {
    marginTop: scale(10),
    paddingTop: scale(10),
    borderTopColor: COLORS.lightPrimary,
    borderTopWidth: scale(0.8),
    paddingHorizontal: 10,
  },
  infoView: {
    gap: 2,
  },
  dateSections: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(5),
    marginVertical: scale(5),
  },
});
