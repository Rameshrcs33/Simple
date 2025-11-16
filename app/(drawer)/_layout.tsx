import { Drawer } from "expo-router/drawer";
import React from "react";
import { useTheme } from "react-native-paper";
import CustomDrawer from "../../utils/CustomDrawer";

export default function DrawerLayout() {
  const theme = useTheme();

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.onSurfaceVariant,
        drawerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.onSurface,
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="(tabs)" options={{ title: "Home" }} />
      <Drawer.Screen name="setting" options={{ title: "Settings" }} />
      <Drawer.Screen name="wishlist" options={{ title: "Wish List" }} />

    </Drawer>
  );
}
