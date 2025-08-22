import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Pressable, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../../constants/colors";
import TabBar from "../../../src/components/tabBar/Tabbar";

const TabsLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar barStyle="dark-content" />
      <Tabs
        backBehavior="history"
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.textLight,
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "Nunito-Bold",
          },
          tabBarButton: (props) => (
            <Pressable
              {...props}
              android_ripple={{ color: "transparent" }}
              style={({ pressed }) => [
                props.style,
                { opacity: pressed ? 1 : 1 },
              ]}
            />
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            animation: "fade",
            tabBarIcon: ({ focused, size }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={focused ? COLORS.primary : COLORS.textLight}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="wallet"
          options={{
            title: "Wallet",
            headerShown: false,
            animation: "fade",
            tabBarIcon: ({ focused, size }) => (
              <Ionicons
                name={focused ? "wallet" : "wallet-outline"}
                size={size}
                color={focused ? COLORS.primary : COLORS.textLight}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "Account",
            headerShown: false,
            animation: "fade",
            tabBarIcon: ({ focused, size }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={size}
                color={focused ? COLORS.primary : COLORS.textLight}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabsLayout;
