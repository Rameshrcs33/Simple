import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";
import { ScaledSheet } from "react-native-size-matters";
import CustomTextInput from "../components/CustomTextInput";
import PrimaryButton from "../components/PrimaryButton";
import { AuthError, dummyLogin } from "../services/auth";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const navigation: any = useNavigation();

  const handleLogin = async () => {
    // Reset errors
    setUsernameError(false);
    setPasswordError(false);
    setAuthError(null);

    // Validation
    let hasError = false;

    if (!username.trim()) {
      setUsernameError(true);
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // Handle login logic here
    setLoading(true);
    try {
      const res = await dummyLogin(username, password);
      console.log("Login success:", res);
      // Navigate to the app's main tabs after successful login.
      // 'Main' route does not exist; the correct route is 'Tabs' defined in `MainStack`.
      navigation.reset({ index: 0, routes: [{ name: "Tabs" }] });
    } catch (e) {
      const message =
        e instanceof AuthError ? e.message : "Something went wrong. Try again.";
      setAuthError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Surface style={styles.surface} elevation={2}>
          <Text variant="headlineMedium" style={styles.title}>
            Welcome Back
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Sign in to continue
          </Text>

          <View style={styles.form}>
            <CustomTextInput
              label="Username"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                setUsernameError(false);
              }}
              error={usernameError}
              errorMessage="Username is required"
              autoCapitalize="none"
              autoCorrect={false}
              leftIcon="account"
              containerStyle={styles.input}
            />

            <CustomTextInput
              label="Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError(false);
              }}
              error={passwordError}
              errorMessage="Password is required"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              leftIcon="lock"
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye-off" : "eye"}
                  onPress={() => setShowPassword((v) => !v)}
                  forceTextInputFocus={false}
                />
              }
              containerStyle={styles.input}
            />

            <View style={styles.forgotPasswordContainer}>
              <Button mode="text" compact textColor="#6200EE" onPress={() => navigation.navigate('ForgotPass', {})}>
                Forgot Password?
              </Button>
            </View>

            <PrimaryButton
              label="Login"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
            />

            {authError ? (
              <Text variant="bodySmall" style={styles.errorText}>
                {authError}
              </Text>
            ) : null}

            <View style={styles.signupContainer}>
              <Text variant="bodyMedium" style={styles.signupText}>
                Don't have an account?{" "}
              </Text>
              <Button mode="text" compact style={styles.signupButton} textColor="#6200EE" onPress={() => navigation.navigate('Signup', {})}>
                Sign Up
              </Button>
            </View>
          </View>
        </Surface>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: "20@s",
  },
  surface: {
    padding: "24@s",
    borderRadius: "16@ms",
    backgroundColor: "#ffffff",
  },
  title: {
    textAlign: "center",
    marginBottom: "8@vs",
    fontWeight: "bold",
    color: "#212121",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: "32@vs",
    color: "#757575",
  },
  form: {
    width: "100%",
  },
  input: {
    marginBottom: "16@vs",
  },
  loginButton: {
    marginTop: "8@vs",
    marginBottom: "16@vs",
    paddingVertical: "4@vs",
  },
  buttonContent: {
    paddingVertical: "8@vs",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "8@vs",
  },
  signupText: {
    color: "#757575",
  },
  signupButton: {
    margin: 0,
    padding: 0,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: "16@vs",
  },
  errorText: {
    color: "#B00020",
    textAlign: "center",
    marginTop: "4@vs",
  },
});
