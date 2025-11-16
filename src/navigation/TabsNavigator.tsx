import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import CartScreen from "@/screen/cart";
import HomeScreen from "@/screen/home";
import OrdersScreen from "@/screen/orders";
import ProfileScreen from "@/screen/profile";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const Tabs = createBottomTabNavigator();

const TabsNavigator = () => {
  const theme = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: { backgroundColor: theme.colors.surface },
      }}
      initialRouteName={"Home"}
    >
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home-filled" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="shopping-cart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="receipt-long" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;

const styles = StyleSheet.create({});
