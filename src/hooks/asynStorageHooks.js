import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, data) => {
  try {
    await AsyncStorage?.setItem(key, JSON?.stringify(data));
  } catch (error) {
    console.error("Error storing data:", error);
  }
};

export const removeStoreData = async (key) => {
  try {
    await AsyncStorage?.removeItem(key);
  } catch (error) {
    console.error("Error in deleting data:", error);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value); // Assuming you stored JSON data
    }
    return null;
  } catch (error) {
    console.error("Error reading value:", error);
    return null;
  }
};

export const clearAsyncStorage = async () => {
  try {
    AsyncStorage.clear();
  } catch (error) {}
};
