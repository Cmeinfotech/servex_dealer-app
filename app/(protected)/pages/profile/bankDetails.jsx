import { Image } from "expo-image";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import APIS from "../../../../api/Api";
import { IMAGES } from "../../../../assets/Images";
import { COLORS } from "../../../../constants/colors";
import { hp, scale } from "../../../../constants/constants";
import Button from "../../../../src/components/ui/Button";
import DynamicText from "../../../../src/components/ui/DynamicText";
import Headers from "../../../../src/components/ui/Header";
import Input from "../../../../src/components/ui/Input";
import { getData, storeData } from "../../../../src/hooks/asynStorageHooks";

const BankDetails = () => {
  const [bankDetails, setBankDetails] = useState({
    bankHolderName: "",
    bankName: "",
    branchName: "",
    ifscCode: "",
    accountNumber: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch bank details once on mount
  useEffect(() => {
    (async () => {
      const savedDetails = await getData("bankDetails");
      if (savedDetails) {
        setBankDetails((prev) => ({ ...prev, ...savedDetails }));
      }
    })();
  }, []);

  const handleChange = useCallback((field, value) => {
    setBankDetails((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateBankDetails = useCallback(async () => {
    setLoading(true);
    try {
      const res = await APIS.bankdetails(bankDetails);
      if (res?.status) {
        await storeData("bankDetails", res.data || {});
      }
    } catch (error) {
      console.error("Error updating bank details:", error);
    } finally {
      setLoading(false);
    }
  }, [bankDetails]);

  return (
    <View style={styles.container}>
      <Image source={IMAGES.waveImage} style={styles.topImage} />
      <Headers
        title="Bank Details"
        white
        style={styles.header}
        disabled={loading}
      />
      <ScrollView style={styles.scrollContent}>
        <View style={styles.form}>
          <View>
            <DynamicText weight="bold" size={scale(18)}>
              Add bank account details
            </DynamicText>
            <DynamicText size={scale(14)} weight="bold" color={COLORS.red}>
              Make sure all details are correct
            </DynamicText>
          </View>

          <View style={styles.inputGroup}>
            <Input
              placeholder="Bank Holder Name"
              value={bankDetails.bankHolderName}
              onChangeText={(value) => handleChange("bankHolderName", value)}
            />

            <View style={styles.row}>
              <Input
                placeholder="Bank Name"
                value={bankDetails.bankName}
                onChangeText={(value) => handleChange("bankName", value)}
              />
              <Input
                placeholder="Branch Name"
                value={bankDetails.branchName}
                onChangeText={(value) => handleChange("branchName", value)}
              />
            </View>

            <Input
              placeholder="IFSC Code"
              value={bankDetails.ifscCode}
              onChangeText={(value) => handleChange("ifscCode", value)}
            />
            <Input
              placeholder="Account Number"
              value={bankDetails.accountNumber}
              onChangeText={(value) => handleChange("accountNumber", value)}
            />

            <Button
              paddingVertical={scale(13)}
              style={styles.saveButton}
              onPress={updateBankDetails}
              isLoading={loading}
              disabled={loading}
            >
              Save
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BankDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightPrimary,
  },
  header: {
    paddingHorizontal: scale(16),
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
    marginVertical: hp(6),
    gap: scale(5),
  },
  inputGroup: {
    marginVertical: scale(20),
    gap: scale(10),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  saveButton: {
    marginTop: scale(10),
  },
});
