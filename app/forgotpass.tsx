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
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 20,
          paddingVertical: 32,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="bg-white rounded-2xl p-6 shadow-lg">
          {/* Header */}
          <View className="items-center mb-8">
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Forgot Password?
            </Text>
            <Text className="text-base text-gray-600 text-center px-4">
              {success
                ? "We've sent a password reset link to your email address."
                : "Enter your email address and we'll send you a link to reset your password."}
            </Text>
          </View>

          {!success ? (
            <>
              {/* Email Input */}
              <View className="mb-6">
                <Text className="text-sm font-medium text-gray-700 mb-2 ml-1">
                  Email Address
                </Text>
                <View
                  className={`flex-row items-center border-2 rounded-xl px-4 py-3 bg-gray-50 ${
                    emailError
                      ? "border-red-500"
                      : "border-gray-300 focus:border-purple-600"
                  }`}
                >
                  <Text className="text-gray-400 mr-2">✉</Text>
                  <TextInput
                    className="flex-1 text-base text-gray-900"
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
                  <Text className="text-sm text-red-500 mt-1 ml-1">
                    Please enter a valid email address
                  </Text>
                )}
              </View>

              {/* Reset Button */}
              <TouchableOpacity
                className={`bg-purple-600 rounded-xl py-4 px-6 mb-4 ${
                  loading ? "opacity-50" : ""
                }`}
                onPress={handleResetPassword}
                disabled={loading}
                activeOpacity={0.8}
              >
                <Text className="text-white text-center text-base font-semibold">
                  {loading ? "Sending..." : "Send Reset Link"}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* Success Message */}
              <View className="items-center mb-6">
                <View className="bg-green-100 rounded-full p-4 mb-4">
                  <Text className="text-4xl">✓</Text>
                </View>
                <Text className="text-lg font-semibold text-gray-900 mb-2">
                  Check Your Email
                </Text>
                <Text className="text-sm text-gray-600 text-center">
                  Please check your inbox and follow the instructions to reset
                  your password.
                </Text>
              </View>

              {/* Back to Login Button */}
              <TouchableOpacity
                className="bg-purple-600 rounded-xl py-4 px-6 mb-4"
                onPress={() => router.push("/login")}
                activeOpacity={0.8}
              >
                <Text className="text-white text-center text-base font-semibold">
                  Back to Login
                </Text>
              </TouchableOpacity>
            </>
          )}

          {/* Back to Login Link */}
          {!success && (
            <View className="flex-row justify-center items-center mt-4">
              <Text className="text-gray-600 text-base">
                Remember your password?{" "}
              </Text>
              <Link href="/login" asChild>
                <TouchableOpacity>
                  <Text className="text-purple-600 text-base font-semibold">
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
