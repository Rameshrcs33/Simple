import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { Avatar, Button, IconButton, Text } from "react-native-paper";
import { ScaledSheet } from "react-native-size-matters";
import colors from "../utils/colors";

export default function ProfileScreen() {
  const navigation: any = useNavigation();
  return (
    <View style={styles.container}>
      <IconButton
        icon="menu"
        size={24}
        onPress={() => navigation.openDrawer()}
        style={styles.menuButton}
      />
      <Avatar.Icon size={72} icon="account" style={styles.avatar} />
      <Text variant="titleLarge" style={styles.name}>
        John Doe
      </Text>
      <Text variant="bodyMedium" style={styles.email}>
        john.doe@example.com
      </Text>

      <Button mode="contained" style={styles.button} icon="pencil-outline">
        Edit Profile
      </Button>
      <Button
        mode="outlined"
        style={styles.button}
        textColor={colors.textPrimary}
        icon="logout"
        onPress={() => {
          navigation.reset({ index: 0, routes: [{ name: "Login" }] });
        }}
      >
        Log Out
      </Button>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    paddingHorizontal: "16@s",
  },
  avatar: {
    backgroundColor: colors.primary,
    marginBottom: "12@vs",
  },
  name: {
    color: colors.textPrimary,
  },
  email: {
    color: colors.textSecondary,
    marginBottom: "16@vs",
  },
  button: {
    alignSelf: "stretch",
    marginHorizontal: "16@s",
    marginTop: "8@vs",
  },
  menuButton: {
    alignSelf: "flex-start",
    marginLeft: "0@s",
  },
});
