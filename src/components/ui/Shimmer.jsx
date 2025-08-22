import { useEffect } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

const Shimmer = ({ width, height, borderRadius = 5, style }) => {
  const shimmerAnimation = new Animated.Value(0);

  useEffect(() => {
    const animate = () => {
      shimmerAnimation.setValue(0);
      Animated.timing(shimmerAnimation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => animate());
    };

    animate();

    return () => {
      shimmerAnimation.stopAnimation();
    };
  }, []);

  const translateX = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View style={[styles.container, { width, height, borderRadius }, style]}>
      <View style={[styles.shimmerWrapper, { borderRadius }]}>
        <Animated.View
          style={[
            styles.shimmer,
            {
              transform: [{ translateX }],
              borderRadius,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e1e1e1",
    overflow: "hidden",
    position: "relative",
  },
  shimmerWrapper: {
    flex: 1,
    overflow: "hidden",
  },
  shimmer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#f6f7f8",
    opacity: 0.3,
  },
});

export default Shimmer;
