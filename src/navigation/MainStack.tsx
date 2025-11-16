import ForgotPasswordScreen from "@/screen/forgotpass";
import LoginScreen from "@/screen/login";
import SettingsScreen from "@/screen/setting";
import SignupScreen from "@/screen/signup";
import WishlistScreen from "@/screen/wishlist";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import TabsNavigator from "./TabsNavigator";
const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"Login"}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPass" component={ForgotPasswordScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Wishlist" component={WishlistScreen} />

      <Stack.Screen name="Tabs" component={TabsNavigator} />
    </Stack.Navigator>
  );
};

export default MainStack;
