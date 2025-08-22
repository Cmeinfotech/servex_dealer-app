import { ImageBackground } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import APIS from "../../api/Api";
import { IMAGES } from "../../assets/Images";
import { authStyle } from "../../assets/styles/auth.style";
import { COLORS } from "../../constants/colors";
import { scale } from "../../constants/constants";
import LoadingOverlay from "../../src/components/loading/Loading";
import Toast from "../../src/components/toast/Toast";
import Button from "../../src/components/ui/Button";
import DynamicText from "../../src/components/ui/DynamicText";
import Input from "../../src/components/ui/Input";
import DropdownSelect from "../../src/components/ui/Select";

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [shopNo, setShopNo] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [mailId, setMailId] = useState("");
  const [productType, setProductType] = useState([]);
  const [customerInq, setCustomerInq] = useState("");
  const [outWarrantyCus, setOutWarrantyCus] = useState("");
  const [inWarrantyCus, setInWarrantyCus] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const toastRef = useRef();

  useEffect(() => {
    getCategoryData();
  }, []);

  const getCategoryData = async () => {
    try {
      const response = await APIS.categoryList();
      // console.log(response);
      if (response?.status === true) {
        setCategoryData(response.data || []);
      } else {
        throw new Error(response?.message || "Failed to fetch categories");
      }
    } catch (err) {
      console.error("Category list error:", err);
    }
  };

  const handleRegister = async () => {
    let newErrors = {};

    if (!name.trim()) newErrors.name = "Please add your name";
    if (!businessName.trim())
      newErrors.businessName = "Please add your business name";
    if (!shopNo.trim()) newErrors.shopNo = "Please add your shop number";
    if (!shopAddress.trim())
      newErrors.shopAddress = "Please add your shop address";

    if (!contactNo.trim()) {
      newErrors.contactNo = "Please add your contact number";
    } else if (isNaN(contactNo)) {
      newErrors.contactNo = "Contact number must be a number";
    }

    if (!mailId.trim()) {
      newErrors.mailId = "Please add your email";
    } else if (!/^\S+@\S+\.\S+$/.test(mailId)) {
      newErrors.mailId = "Please enter a valid email address";
    }

    if (!productType || productType.length === 0)
      newErrors.productType = "Please select at least one product type";

    if (!customerInq.trim() || isNaN(customerInq))
      newErrors.customerInq = "Please enter a valid number";
    if (!outWarrantyCus.trim() || isNaN(outWarrantyCus))
      newErrors.outWarrantyCus = "Please enter a valid number";
    if (!inWarrantyCus.trim() || isNaN(inWarrantyCus))
      newErrors.inWarrantyCus = "Please enter a valid number";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    Keyboard.dismiss();
    setIsLoading(true);

    try {
      const data = {
        name: name,
        businessName: businessName,
        shopNo: shopNo,
        shopAddress: shopAddress,
        contactNo: contactNo,
        email: mailId,
        productsSold: productType?.map((item) => item?.categoryName),
        dailyRepairInquiries: customerInq,
        outWarrantyCustomers: outWarrantyCus,
        inWarrantyCustomers: inWarrantyCus,
      };

      const res = await APIS.SignUp(data);
      console.log(res);
      if (res?.status === true) {
        router.replace("/sign-in");
        toastRef.current?.show(res?.message || "Registered user successfully");
      } else {
        toastRef.current?.show(res?.message || "Login failed please try again");
      }
    } catch (error) {
      toastRef.current.show(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={IMAGES.backgroundImage}
      style={authStyle.backgroundImage}
      contentFit="cover"
    >
      <View style={authStyle.overlay} />
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={authStyle.keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={authStyle.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={authStyle.card}>
                <DynamicText
                  weight="bold"
                  color={COLORS.primary}
                  size={scale(20)}
                  center
                >
                  Register
                </DynamicText>

                <Input
                  placeholder="Name"
                  onChangeText={setName}
                  value={name}
                  error={errors.name}
                />
                <Input
                  placeholder="Business name"
                  onChangeText={setBusinessName}
                  value={businessName}
                  error={!businessName && errors.businessName}
                />
                <Input
                  placeholder="Shop no"
                  onChangeText={setShopNo}
                  value={shopNo}
                  error={!shopNo && errors.shopNo}
                />
                <Input
                  placeholder="Shop address"
                  onChangeText={setShopAddress}
                  value={shopAddress}
                  error={!shopAddress && errors.shopAddress}
                />
                <Input
                  placeholder="Contact no"
                  keyboardType="number-pad"
                  inputMode="tel"
                  maxLength={10}
                  onChangeText={setContactNo}
                  value={contactNo}
                  error={!contactNo && errors.contactNo}
                />
                <Input
                  placeholder="Mail id"
                  inputMode="email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={setMailId}
                  value={mailId}
                  error={!mailId && errors.mailId}
                />

                <DropdownSelect
                  options={categoryData}
                  onSelect={(value) => setProductType(value)}
                  placeholder="Product Types"
                  multiSelect
                  error={productType?.length == 0 && errors.productType}
                />

                <Input
                  title="How frequent are daily repair inquiries from customers?"
                  keyboardType="number-pad"
                  onChangeText={setCustomerInq}
                  value={customerInq}
                  error={!customerInq && errors.customerInq}
                />
                <Input
                  title="How many out-warranty customers are there?"
                  keyboardType="number-pad"
                  onChangeText={setOutWarrantyCus}
                  value={outWarrantyCus}
                  error={!outWarrantyCus && errors.outWarrantyCus}
                />
                <Input
                  title="How many in-warranty customers are there?"
                  keyboardType="number-pad"
                  onChangeText={setInWarrantyCus}
                  value={inWarrantyCus}
                  error={!inWarrantyCus && errors.inWarrantyCus}
                />

                <Button
                  style={{ paddingVertical: scale(14), marginTop: scale(12) }}
                  onPress={handleRegister}
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Register
                </Button>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <Toast
        ref={toastRef}
        position="top"
        duration={3000}
        icon={false}
        textCenter
        style={{ backgroundColor: COLORS.modalBackground }}
      />
      <LoadingOverlay visible={isLoading} />
    </ImageBackground>
  );
};

export default SignUp;
