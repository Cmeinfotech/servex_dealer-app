import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import APIS from "../../../../api/Api";
import { COLORS } from "../../../../constants/colors";
import { scale } from "../../../../constants/constants";
import LoadingOverlay from "../../../../src/components/loading/Loading";
import Toast from "../../../../src/components/toast/Toast";
import Button from "../../../../src/components/ui/Button";
import RadioButton from "../../../../src/components/ui/CheckBoxSection";
import DynamicText from "../../../../src/components/ui/DynamicText";
import Headers from "../../../../src/components/ui/Header";
import Input from "../../../../src/components/ui/Input";
import DropdownSelect from "../../../../src/components/ui/Select";

const RequestService = () => {
  const router = useRouter();

  const toastRef = useRef();

  const [warrantyOption, setWarrantyOption] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [categoryTypeData, setCategoryTypeData] = useState([]);
  const [serviceTypeData, setServiceTypeData] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [customerNo, setCustomerNo] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [category, setCategory] = useState({});
  const [categoryType, setCategoryType] = useState({});
  const [issueId, setIssueId] = useState({});
  const [productDescription, setProductDescription] = useState("");

  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const warrantyOptions = [
    { label: "In-Warranty", value: "In-Warranty" },
    { label: "Out-Warranty", value: "Out-Warranty" },
  ];

  useEffect(() => {
    getCategoryData();
  }, []);

  const getCategoryData = async () => {
    try {
      const response = await APIS.categoryList();
      console.log(response);
      if (response?.status === true) {
        setCategoryData(response.data || []);
      } else {
        throw new Error(response?.message || "Failed to fetch categories");
      }
    } catch (err) {
      console.error("Category list error:", err);
    } finally {
    }
  };

  const getCategoryType = async (id) => {
    try {
      setCategoryType({});
      setCategoryTypeData([]);
      const res = await APIS.categoryType(id);

      if (res?.status === true) {
        const data = res?.data?.map((item) => ({
          ...item,
          categoryName: item.categoryTypeName,
        }));
        setCategoryTypeData(data);
      } else {
        setCategoryTypeData([]);
      }
    } catch (error) {
      setCategoryTypeData([]);

      console.error("Category list error:", error);
    }
  };

  const getServiceType = async (id) => {
    try {
      const res = await APIS.serviceType(id);

      if (res?.status === true) {
        const data = res?.data?.map((item) => ({
          ...item,
          categoryName: item.issueName,
        }));
        setServiceTypeData(data);
      } else {
        setServiceTypeData([]);
      }
    } catch (error) {
      setServiceTypeData([]);
    }
  };

  const categorySelect = (i) => {
    setCategory(i);
    setCategoryType({});
    setCategoryTypeData([]);
    getCategoryType(i.id);
  };

  const onDateChange = (event, selectedDate = new Date()) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const onTimeChange = (event, selectedTime = new Date()) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === "ios");
    setTime(currentTime);
  };

  const formatDate = () => {
    return (
      date &&
      date?.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    );
  };

  const formatTime = () => {
    return (
      time &&
      time?.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  const getFormattedDateForAPI = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getFormattedTimeForAPI = (dateObj) => {
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const seconds = String(dateObj.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const [errors, setErrors] = useState({});

  const reqForService = async () => {
    let newErrors = {};

    if (!customerName.trim())
      newErrors.customerName = "Please enter customer name";
    if (!customerNo.trim())
      newErrors.customerContactNo = "Please enter contact number";
    else if (customerNo.length < 10)
      newErrors.customerContactNo = "Contact number must be 10 digits";
    if (!customerAddress.trim())
      newErrors.customerAddress = "Please enter address";
    if (Object.keys(category).length <= 0)
      newErrors.category = "Please select product type";
    if (Object.keys(categoryType).length <= 0)
      newErrors.categoryType = "Please select product sub-type";
    if (Object.keys(issueId).length <= 0)
      newErrors.issueId = "Please select product issue";
    if (!warrantyOption.trim())
      newErrors.warrantyOption = "Please select warranty type";
    if (!date) newErrors.scheduledDate = "Please select a date";
    if (!time) newErrors.scheduledTime = "Please select a time";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }
    setIsLoading(true);
    Keyboard.dismiss();
    
    try {
      const data = {
        customerName,
        customerContactNo: customerNo,
        customerAddress,
        categoryId: category.id,
        categoryTypeId: categoryType.id,
        issueId: issueId.id,
        productDescription: productDescription || "",
        warrantyType: warrantyOption,
        scheduledDate: getFormattedDateForAPI(date),
        scheduledTime: getFormattedTimeForAPI(time),
      };

      const res = await APIS.reqService(data);
      if (res?.status === true) {
        router.replace({
          pathname: "/pages/requestSer/SuccessPage",
          params: {
            data: JSON.stringify({
              ...data,
              categoryId: category,
              categoryTypeId: categoryType,
              issueId,
            }),
          },
        });
      } else {
        toastRef.current.show(
          res?.data?.message || res?.message || "Something went wrong"
        );
      }
    } catch (error) {
      console.error("Submission failed:", error);

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
    <View style={styles.container}>
      <Headers title={"Request for Service"} />

      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={20}
        enableAutomaticScroll={true}
        extraHeight={100}
        showsVerticalScrollIndicator={false}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.formContainer}>
            <Input
              title="Customer Name"
              placeholder="Enter Customer Name"
              onChangeText={setCustomerName}
              value={customerName}
              required
              error={errors.customerName}
            />

            <Input
              title="Customer Contact No"
              placeholder="Enter Customer Contact No"
              keyboardType="number-pad"
              inputMode="tel"
              onChangeText={setCustomerNo}
              value={customerNo}
              maxLength={10}
              required
              error={errors.customerContactNo}
            />

            <Input
              title="Customer Address"
              placeholder="Enter Customer Address"
              onChangeText={setCustomerAddress}
              value={customerAddress}
              required
              error={errors.customerAddress}
            />

            <DropdownSelect
              title="Product Types"
              options={categoryData}
              placeholder="Choose an option"
              multiSelect={false}
              onSelect={(i) => categorySelect(i)}
              selectedValue={category}
              required
              error={errors.category}
            />

            <DropdownSelect
              title="Product sub-Types"
              options={categoryTypeData}
              placeholder="Choose an option"
              multiSelect={false}
              onSelect={(selectedSubType) => {
                setCategoryType(selectedSubType);
                getServiceType(selectedSubType.id);
              }}
              selectedValue={categoryType}
              disabled={Object.keys(category)?.length < 1}
              required
              error={errors.categoryType}
            />

            <DropdownSelect
              title="Product Issue"
              options={serviceTypeData}
              onSelect={(value) => setIssueId(value)}
              value={issueId}
              placeholder="Choose an option"
              multiSelect={false}
              disabled={Object.keys(categoryType)?.length < 1}
              required
              error={errors.issueId}
            />

            <Input
              title="Product Description"
              placeholder="Explain in details"
              multiline
              onChangeText={setProductDescription}
              value={productDescription}
            />

            <RadioButton
              title="Product Warranty"
              options={warrantyOptions}
              selectedOption={warrantyOption}
              onSelect={setWarrantyOption}
              labelStyle={{ color: "#333" }}
              required
              error={errors.warrantyOption}
            />

            <View style={styles.btnContainer}>
              <View style={styles.pickerView}>
                <DynamicText
                  size={scale(14)}
                  style={{
                    paddingHorizontal: scale(12),
                    marginBottom: scale(3),
                  }}
                >
                  Schedule Date
                </DynamicText>
                <TouchableOpacity
                  style={[
                    styles.pickerBtns,
                    errors.scheduledDate && { borderColor: COLORS.red },
                  ]}
                  onPress={() => {
                    setShowDatePicker(true);
                    setDate((prev) => (prev === null ? new Date() : prev));
                  }}
                >
                  <DynamicText size={scale(14)} weight="bold">
                    {date ? formatDate(date) : "Select Date"}
                  </DynamicText>
                </TouchableOpacity>
                {errors.scheduledDate && (
                  <DynamicText
                    size={scale(12)}
                    color="red"
                    style={{
                      paddingHorizontal: scale(12),
                      marginTop: scale(2),
                    }}
                  >
                    {errors.scheduledDate}
                  </DynamicText>
                )}
              </View>
              <View style={styles.pickerView}>
                <DynamicText
                  size={scale(14)}
                  style={{
                    paddingHorizontal: scale(12),
                    marginBottom: scale(3),
                  }}
                >
                  Schedule Time
                </DynamicText>
                <TouchableOpacity
                  style={[
                    styles.pickerBtns,
                    errors.scheduledTime && { borderColor: COLORS.red },
                  ]}
                  onPress={() => {
                    setShowTimePicker(true);
                    setTime((prev) => (prev === null ? new Date() : prev));
                  }}
                >
                  <DynamicText size={scale(14)} weight="bold">
                    {time ? formatTime(time) : "Select Time"}
                  </DynamicText>
                </TouchableOpacity>
                {errors.scheduledTime && (
                  <DynamicText
                    size={scale(12)}
                    color="red"
                    style={{
                      paddingHorizontal: scale(12),
                      marginTop: scale(2),
                    }}
                  >
                    {errors.scheduledTime}
                  </DynamicText>
                )}
              </View>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onDateChange}
                  minimumDate={new Date()}
                />
              )}

              {/* Time Picker */}
              {showTimePicker && (
                <DateTimePicker
                  value={time}
                  mode="time"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onTimeChange}
                  is24Hour={false}
                />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>

      <View style={styles.buttonContainer}>
        <Button
          paddingVertical={scale(15)}
          onPress={reqForService}
          isLoading={isLoading}
        >
          Submit
        </Button>
      </View>

      <Toast
        ref={toastRef}
        position="top"
        duration={3000}
        icon={false}
        textCenter
        style={{ backgroundColor: COLORS.modalBackground }}
      />
      <LoadingOverlay visible={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightPrimary,
  },
  scrollView: {
    paddingHorizontal: scale(16),
  },
  scrollContent: {
    paddingBottom: scale(30), // Extra space for keyboard
  },
  formContainer: {
    gap: scale(10),
    paddingBottom: scale(20),
  },
  buttonContainer: {
    paddingHorizontal: scale(16),
    paddingBottom: Platform.select({
      ios: scale(20),
      android: scale(20),
    }),
    backgroundColor: COLORS.lightPrimary,
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  pickerView: {
    width: "48%",
  },
  pickerBtns: {
    backgroundColor: COLORS.lightGrey,
    alignItems: "center",
    paddingVertical: scale(10),
    borderRadius: scale(12),
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
});

export default RequestService;
