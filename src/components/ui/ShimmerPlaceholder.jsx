import React from 'react';
import { StyleSheet, View } from 'react-native';
import Shimmer from './Shimmer';

const ShimmerPlaceholder = ({ children, isLoading, style }) => {
  if (!isLoading) return children;

  return (
    <View style={[styles.container, style]}>
      {React.Children.map(children, (child, index) => (
        <Shimmer
          key={index}
          width={child.props.style?.width || '100%'}
          height={child.props.style?.height || 20}
          borderRadius={child.props.style?.borderRadius || 0}
          style={child.props.style}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default ShimmerPlaceholder;