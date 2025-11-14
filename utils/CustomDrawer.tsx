import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Avatar, Button, Divider, Text, useTheme } from "react-native-paper";
import { ScaledSheet } from "react-native-size-matters";
import colors from "./colors";

export default function CustomDrawer(props: DrawerContentComponentProps) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={[
          styles.scrollContent,
          { flexGrow: 1 },
          { backgroundColor: colors.card },
        ]}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Avatar.Icon
              size={56}
              icon="account"
              style={[styles.avatar, { backgroundColor: theme.colors.primary }]}
              color={theme.colors.onPrimary}
            />
            <View style={styles.userInfo}>
              <Text variant="titleMedium" style={styles.userName}>
                Ramesh Swain
              </Text>
              <Text variant="bodySmall" style={styles.userEmail}>
                ramesh.s@example.com
              </Text>
            </View>
          </View>

          <Divider />

          <View style={styles.itemsContainer}>
            <DrawerItem
              label="Home"
              onPress={() => {
                router.navigate("/(drawer)/(tabs)/home");
                props.navigation.closeDrawer();
              }}
            />
            <DrawerItem
              label="Profile"
              onPress={() => {
                router.navigate("/(drawer)/(tabs)/profile");
                props.navigation.closeDrawer();
              }}
            />

            <DrawerItem
              label="Settings"
              onPress={() => {
                router.navigate("/(drawer)/setting");
                props.navigation.closeDrawer();
              }}
            />
          </View>

          <View style={styles.footer}>
            <Button
              mode="text"
              icon="logout"
              onPress={() => {
                router.replace("/login");
              }}
              textColor={theme.colors.error}
              contentStyle={styles.footerButtonContent}
            >
              Log Out
            </Button>
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: "0@vs",
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: "16@s",
    paddingTop: "32@vs",
    paddingBottom: "16@vs",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    marginRight: "8@s",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: colors.textPrimary,
  },
  userEmail: {
    color: colors.textSecondary,
  },
  itemsContainer: {
    paddingTop: "8@vs",
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#00000022",
    padding: "12@s",
    marginTop: "auto",
  },
  footerButtonContent: {
    justifyContent: "flex-start",
  },
});
