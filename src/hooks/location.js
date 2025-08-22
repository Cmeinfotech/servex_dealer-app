import * as Location from "expo-location";

export const requestLocationPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === "granted";
  } catch (error) {
    console.error("Permission request error:", error);
    return false;
  }
};

export const getCurrentLocation = async () => {
  try {
    return await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
  } catch (error) {
    console.error("Location error:", error);
    throw error;
  }
};

export const getLocationName = async (latitude, longitude) => {
  try {
    const address = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (address.length > 0) {
      const { name, street, city, region } = address[0];
      return `${name || street || "Unknown location"}, ${city || region}`;
    }

    return "Unknown location";
  } catch (err) {
    console.error("Reverse geocode error:", err);
    return "Could not get address";
  }
};

export const fetchLocationWithName = async () => {
  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      throw new Error("Permission to access location was denied");
    }

    const location = await getCurrentLocation();
    const name = await getLocationName(
      location.coords.latitude,
      location.coords.longitude
    );

    return {
      coordinates: location,
      name,
    };
  } catch (error) {
    console.error("Location fetch error:", error);
    throw error;
  }
};
