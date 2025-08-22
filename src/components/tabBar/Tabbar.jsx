import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/colors';
import { hp, scale } from '../../../constants/constants';
import DynamicText from '../ui/DynamicText';

const TabBar = ({ state, descriptors, navigation }) => {

  const icons = {
    index: (focused) => (
      <Ionicons
        name={focused ? 'home' : 'home-outline'}
        size={scale(20)}
        color={focused ? COLORS.primary : COLORS.textLight}
      />
    ),
    wallet: (focused) => (
      <Ionicons
        name={focused ? 'wallet' : 'wallet-outline'}
        size={scale(20)}
        color={focused ? COLORS.primary : COLORS.textLight}
      />
    ),
    account: (focused) => (
      <Ionicons
        name={focused ? 'person' : 'person-outline'}
        size={scale(20)}
        color={focused ? COLORS.primary : COLORS.textLight}
      />
    )
  }

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole='button'
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItems}
          >
            {
              icons[route.name](isFocused)
            }
            <DynamicText size={scale(10)} weight={isFocused ? 'bold' : 'regular'} color={isFocused ? COLORS.primary : COLORS.textLight} >
              {label}
            </DynamicText>
          </TouchableOpacity>
        );
      })}
    </View>
  )
}

export default TabBar

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: hp(1),
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: scale(18),
    paddingVertical: hp(1.2),
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    borderRadius: scale(18),
    zIndex:1
  },
  tabBarItems: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  }
})