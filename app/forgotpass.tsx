import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleResetPassword = async () => {
    // Reset errors
    setEmailError(false);
    setSuccess(false);

    // Validation
    if (!email.trim()) {
      setEmailError(true);
      return;
    }

    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }

    // Handle reset password logic here
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
      setEmail("");
    } catch (error) {
      console.error("Reset password error:", error);
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
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>
              Forgot Password?
            </Text>
            <Text style={styles.subtitle}>
              {success
                ? "We've sent a password reset link to your email address."
                : "Enter your email address and we'll send you a link to reset your password."}
            </Text>
          </View>

          {!success ? (
            <>
              {/* Email Input */}
              <View style={styles.formSection}>
                <Text style={styles.label}>
                  Email Address
                </Text>
                <View
                  style={[
                    styles.inputContainer,
                    emailError && styles.inputContainerError,
                  ]}
                >
                  <Text style={styles.icon}>✉</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#9CA3AF"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      setEmailError(false);
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!loading}
                  />
                </View>
                {emailError && (
                  <Text style={styles.errorMessage}>
                    Please enter a valid email address
                  </Text>
                )}
              </View>

              {/* Reset Button */}
              <TouchableOpacity
                style={[
                  styles.button,
                  loading && styles.buttonDisabled,
                ]}
                onPress={handleResetPassword}
                disabled={loading}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>
                  {loading ? "Sending..." : "Send Reset Link"}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* Success Message */}
              <View style={styles.successContainer}>
                <View style={styles.successBadge}>
                  <Text style={styles.successIcon}>✓</Text>
                </View>
                <Text style={styles.successTitle}>
                  Check Your Email
                </Text>
                <Text style={styles.successMessage}>
                  Please check your inbox and follow the instructions to reset
                  your password.
                </Text>
              </View>

              {/* Back to Login Button */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/login")}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>
                  Back to Login
                </Text>
              </TouchableOpacity>
            </>
          )}

          {/* Back to Login Link */}
          {!success && (
            <View style={styles.footerLink}>
              <Text style={styles.footerText}>
                Remember your password?{" "}
              </Text>
              <Link href="/login" asChild>
                <TouchableOpacity>
                  <Text style={styles.footerLinkText}>
                    Sign In
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          )}
        </View>
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
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: "20@s",
    paddingVertical: "32@vs",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16@ms",
    paddingHorizontal: "24@s",
    paddingVertical: "24@vs",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: "8@ms",
    elevation: 4,
  },
  header: {
    alignItems: "center",
    marginBottom: "32@vs",
  },
  title: {
    fontSize: "28@ms",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "8@vs",
  },
  subtitle: {
    fontSize: "16@ms",
    color: "#4b5563",
    textAlign: "center",
    paddingHorizontal: "16@s",
  },
  formSection: {
    marginBottom: "24@vs",
  },
  label: {
    fontSize: "14@ms",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "8@vs",
    marginLeft: "4@s",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: "2@ms",
    borderColor: "#d1d5db",
    borderRadius: "12@ms",
    paddingHorizontal: "16@s",
    paddingVertical: "12@vs",
    backgroundColor: "#f9fafb",
  },
  inputContainerError: {
    borderColor: "#ef4444",
  },
  icon: {
    color: "#9ca3af",
    marginRight: "8@s",
  },
  input: {
    flex: 1,
    fontSize: "16@ms",
    color: "#1f2937",
  },
  errorMessage: {
    fontSize: "14@ms",
    color: "#ef4444",
    marginTop: "4@vs",
    marginLeft: "4@s",
  },
  button: {
    backgroundColor: "#7c3aed",
    borderRadius: "12@ms",
    paddingVertical: "16@vs",
    paddingHorizontal: "24@s",
    marginBottom: "16@vs",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: "16@ms",
    fontWeight: "600",
  },
  successContainer: {
    alignItems: "center",
    marginBottom: "24@vs",
  },
  successBadge: {
    backgroundColor: "#dcfce7",
    borderRadius: "50@ms",
    width: "80@s",
    height: "80@s",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16@vs",
  },
  successIcon: {
    fontSize: "36@ms",
  },
  successTitle: {
    fontSize: "18@ms",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "8@vs",
  },
  successMessage: {
    fontSize: "14@ms",
    color: "#4b5563",
    textAlign: "center",
  },
  footerLink: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "16@vs",
  },
  footerText: {
    color: "#4b5563",
    fontSize: "16@ms",
  },
  footerLinkText: {
    color: "#7c3aed",
    fontSize: "16@ms",
    fontWeight: "600",
  },
});
