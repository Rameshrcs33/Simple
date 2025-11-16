import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View } from "react-native";
import { IconButton, List, Switch, Text } from "react-native-paper";
import { ScaledSheet } from "react-native-size-matters";
import colors from "../utils/colors";

export default function SettingsScreen() {
  const navigation: any = useNavigation();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [locationAccess, setLocationAccess] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <IconButton
          icon="menu"
          size={24}
          onPress={() => navigation.openDrawer()}
        />
        <Text variant="headlineSmall" style={styles.title}>
          Settings
        </Text>
      </View>

      <List.Section style={styles.section}>
        <List.Subheader>Preferences</List.Subheader>
        <List.Item
          title="Enable Notifications"
          left={(props) => <List.Icon {...props} icon="bell-outline" />}
          right={() => (
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
          )}
        />
        <List.Item
          title="Dark Mode"
          description="Use a dark color theme"
          left={(props) => <List.Icon {...props} icon="weather-night" />}
          right={() => (
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
            />
          )}
        />
      </List.Section>

      <List.Section style={styles.section}>
        <List.Subheader>Privacy</List.Subheader>
        <List.Item
          title="Location Access"
          description="Allow access for better recommendations"
          left={(props) => <List.Icon {...props} icon="map-marker-outline" />}
          right={() => (
            <Switch value={locationAccess} onValueChange={setLocationAccess} />
          )}
        />
      </List.Section>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: "12@s",
    paddingTop: "12@vs",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: "8@vs",
  },
  title: {
    color: colors.textPrimary,
  },
  section: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: "12@vs",
  },
});
