import { Dimensions, PixelRatio } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export { hp, wp };

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BASE_WIDTH = 375; // iPhone 12

export const scale = (size) => {
  const scaleFactor = Math.min(Math.max(SCREEN_WIDTH / BASE_WIDTH, 0.9), 1.5);
  return PixelRatio.roundToNearestPixel(size * scaleFactor);
};

export const verticalScale = (size) => {
  const height = Dimensions.get("window").height;
  const BASE_HEIGHT = 812; // iPhone 12 height
  const scaleFactor = Math.min(Math.max(height / BASE_HEIGHT, 0.9), 1.5);
  return PixelRatio.roundToNearestPixel(size * scaleFactor);
};
