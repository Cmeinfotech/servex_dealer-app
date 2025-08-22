import { Image, ImageBackground } from "expo-image";
import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { IMAGES } from "../../../assets/Images";
import { COLORS } from "../../../constants/colors";
import { hp, scale } from "../../../constants/constants";
import DynamicText from "../../../src/components/ui/DynamicText";

const WalletScreen = () => {
  const [value, setValue] = useState(false);

  const transaction = [
    {
      id: 1,
      sender: "John Doe",
      amount: 150,
      type: "Cash",
    },
    {
      id: 2,
      sender: "Lizy Fox",
      amount: 985,
      type: "Bank Transfer",
    },
    {
      id: 3,
      sender: "Chris Hemelton",
      amount: 270,
      type: "UPI",
    },
  ];

  const renderItem = ({ item, index }) => {
    const getImage = () => {
      switch (item.type.toLowerCase()) {
        case "cash":
          return IMAGES.cash3D;

        case "bank transfer":
          return IMAGES.bank3D;
        case "upi":
          return IMAGES.UPI3D;
        default:
          return IMAGES.cash3D;
      }
    };
    return (
      <View key={item.id} style={styles.card}>
        <Image source={getImage()} style={styles.cardImage} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <View>
            <DynamicText weight="bold" size={scale(14)}>
              {item.sender}
            </DynamicText>
            <DynamicText size={scale(10)}>{item.type}</DynamicText>
          </View>
          <View>
            <DynamicText size={scale(14)} weight="bold" color={COLORS.green}>
              + ₹{item.amount}
            </DynamicText>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <DynamicText weight="bold" size={scale(18)}>
        Wallet
      </DynamicText>
      <ImageBackground
        source={IMAGES.walletBackground}
        style={styles.backgroundImage}
        contentFit="cover"
        imageStyle={{ borderRadius: scale(10) }}
        blurRadius={0.5}
      >
        <View>
          <DynamicText size={scale(14)} weight="bold">
            Balance
          </DynamicText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <DynamicText
              size={scale(19)}
              weight="bold"
              style={{ marginTop: 5 }}
            >
              ₹ {value ? "1,00,000.90" : "*****"}
            </DynamicText>
            <TouchableOpacity
              onPress={() => setValue(!value)}
              hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
            >
              <Image
                source={value ? IMAGES.eyesClose : IMAGES.eyesOpen}
                style={{ height: 25, width: 25 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <DynamicText weight="bold">Username</DynamicText>
        </View>
      </ImageBackground>
      <FlatList
        data={transaction}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          gap: 8,
          flexGrow: 1,
          paddingBottom: scale(45),
          paddingTop: scale(10),
        }}
      />
    </View>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: scale(16),
    paddingTop: scale(10),
  },
  backgroundImage: {
    height: hp(20),
    width: "100%",
    borderRadius: scale(10),
    borderCurve: "continuous",
    marginVertical: scale(10),
    padding: scale(15),
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: COLORS.lightGrey,
    borderRadius: scale(5),
    padding: scale(8),
    flexDirection: "row",
    gap: 10,
  },
  cardImage: {
    height: scale(40),
    width: scale(40),
    backgroundColor: COLORS.border,
    padding: 10,
    borderRadius: scale(5),
  },
});
