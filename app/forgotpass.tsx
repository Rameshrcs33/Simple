import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";
import { ScaledSheet } from "react-native-size-matters";
import CustomTextInput from "../components/common/CustomTextInput";
import PrimaryButton from "../components/common/PrimaryButton";

type ForgotPasswordStep = "email" | "otp" | "password";

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const [step, setStep] = useState<ForgotPasswordStep>("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [touched, setTouched] = useState<{
        email?: boolean;
        otp?: boolean;
        newPassword?: boolean;
        confirmPassword?: boolean;
    }>({});

    const [errors, setErrors] = useState<{
        email?: string;
        otp?: string;
        newPassword?: string;
        confirmPassword?: string;
    }>({});

    const validateEmail = (value: string) => {
        if (!value) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Enter a valid email address";
        return "";
    };

    const validateOtp = (value: string) => {
        if (!value) return "OTP is required";
        if (!/^\d{6}$/.test(value.replace(/\s/g, "")))
            return "OTP must be 6 digits";
        return "";
    };

    const validatePassword = (value: string) => {
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/[A-Z]/.test(value)) return "Include at least one uppercase letter";
        if (!/[a-z]/.test(value)) return "Include at least one lowercase letter";
        if (!/[0-9]/.test(value)) return "Include at least one number";
        if (!/[!@#$%^&*(),.?":{}|<>_\-\[\]\\\/;'+=~`]/.test(value))
            return "Include at least one special character";
        return "";
    };

    const validateConfirmPassword = (value: string, pwd: string) => {
        if (!value) return "Please confirm your password";
        if (value !== pwd) return "Passwords do not match";
        return "";
    };

    const handleEmailSubmit = async () => {
        setErrorMessage(null);
        setSuccessMessage(null);

        const emailError = validateEmail(email);
        setErrors((prev) => ({ ...prev, email: emailError || undefined }));
        setTouched((prev) => ({ ...prev, email: true }));

        if (emailError) return;

        setLoading(true);
        try {
            // Simulate API call to send OTP
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSuccessMessage("OTP sent to your email address");
            setStep("otp");
        } catch (error) {
            setErrorMessage("Failed to send OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async () => {
        setErrorMessage(null);
        setSuccessMessage(null);

        const otpError = validateOtp(otp);
        setErrors((prev) => ({ ...prev, otp: otpError || undefined }));
        setTouched((prev) => ({ ...prev, otp: true }));

        if (otpError) return;

        setLoading(true);
        try {
            // Simulate API call to verify OTP
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSuccessMessage("OTP verified successfully");
            setStep("password");
        } catch (error) {
            setErrorMessage("Invalid OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async () => {
        setErrorMessage(null);
        setSuccessMessage(null);

        const passwordError = validatePassword(newPassword);
        const confirmError = validateConfirmPassword(confirmPassword, newPassword);

        setErrors((prev) => ({
            ...prev,
            newPassword: passwordError || undefined,
            confirmPassword: confirmError || undefined,
        }));
        setTouched((prev) => ({
            ...prev,
            newPassword: true,
            confirmPassword: true,
        }));

        if (passwordError || confirmError) return;

        setLoading(true);
        try {
            // Simulate API call to reset password
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSuccessMessage("Password reset successfully");
            setTimeout(() => {
                router.replace("/login");
            }, 1000);
        } catch (error) {
            setErrorMessage("Failed to reset password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleBlur = (field: "email" | "otp" | "newPassword" | "confirmPassword") => {
        setTouched((prev) => ({ ...prev, [field]: true }));

        if (field === "email") {
            const error = validateEmail(email);
            setErrors((prev) => ({ ...prev, email: error || undefined }));
        } else if (field === "otp") {
            const error = validateOtp(otp);
            setErrors((prev) => ({ ...prev, otp: error || undefined }));
        } else if (field === "newPassword") {
            const error = validatePassword(newPassword);
            setErrors((prev) => ({ ...prev, newPassword: error || undefined }));
        } else if (field === "confirmPassword") {
            const error = validateConfirmPassword(confirmPassword, newPassword);
            setErrors((prev) => ({ ...prev, confirmPassword: error || undefined }));
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
                        Forgot Password
                    </Text>
                    <Text variant="bodyMedium" style={styles.subtitle}>
                        {step === "email" && "Enter your email to receive an OTP"}
                        {step === "otp" && "Enter the OTP sent to your email"}
                        {step === "password" && "Create a new password"}
                    </Text>

                    <View style={styles.form}>
                        {step === "email" && (
                            <>
                                <CustomTextInput
                                    label="Email"
                                    value={email}
                                    onChangeText={setEmail}
                                    onBlur={() => handleBlur("email")}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                    leftIcon="email"
                                    containerStyle={styles.input}
                                    error={!!(touched.email && errors.email)}
                                    errorMessage={touched.email ? errors.email : ""}
                                />

                                <PrimaryButton
                                    label="Send OTP"
                                    onPress={handleEmailSubmit}
                                    loading={loading}
                                    disabled={loading}
                                />
                            </>
                        )}

                        {step === "otp" && (
                            <>
                                <CustomTextInput
                                    label="Enter OTP (6 digits)"
                                    value={otp}
                                    onChangeText={(text) => {
                                        const digits = text.replace(/\D/g, "").slice(0, 6);
                                        setOtp(digits);
                                    }}
                                    onBlur={() => handleBlur("otp")}
                                    keyboardType="number-pad"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    leftIcon="shield-check"
                                    containerStyle={styles.input}
                                    error={!!(touched.otp && errors.otp)}
                                    errorMessage={touched.otp ? errors.otp : ""}
                                    maxLength={6}
                                />

                                <Text variant="bodySmall" style={styles.otpHint}>
                                    Didn't receive the code?{" "}
                                    <Text
                                        style={styles.resendLink}
                                        onPress={() => {
                                            setStep("email");
                                            setOtp("");
                                        }}
                                    >
                                        Resend
                                    </Text>
                                </Text>

                                <PrimaryButton
                                    label="Verify OTP"
                                    onPress={handleOtpSubmit}
                                    loading={loading}
                                    disabled={loading}
                                />
                            </>
                        )}

                        {step === "password" && (
                            <>
                                <CustomTextInput
                                    label="New Password"
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                    onBlur={() => handleBlur("newPassword")}
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    leftIcon="lock"
                                    containerStyle={styles.input}
                                    error={!!(touched.newPassword && errors.newPassword)}
                                    errorMessage={touched.newPassword ? errors.newPassword : ""}
                                    right={
                                        <TextInput.Icon
                                            icon={showPassword ? "eye-off" : "eye"}
                                            onPress={() => setShowPassword((prev) => !prev)}
                                            forceTextInputFocus={false}
                                        />
                                    }
                                />

                                <CustomTextInput
                                    label="Confirm Password"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    onBlur={() => handleBlur("confirmPassword")}
                                    secureTextEntry={!showConfirmPassword}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    leftIcon="lock-check"
                                    containerStyle={styles.input}
                                    error={!!(touched.confirmPassword && errors.confirmPassword)}
                                    errorMessage={
                                        touched.confirmPassword ? errors.confirmPassword : ""
                                    }
                                    right={
                                        <TextInput.Icon
                                            icon={showConfirmPassword ? "eye-off" : "eye"}
                                            onPress={() => setShowConfirmPassword((prev) => !prev)}
                                            forceTextInputFocus={false}
                                        />
                                    }
                                />

                                <PrimaryButton
                                    label="Reset Password"
                                    onPress={handlePasswordReset}
                                    loading={loading}
                                    disabled={loading}
                                />
                            </>
                        )}

                        {errorMessage && (
                            <Text variant="bodySmall" style={styles.errorText}>
                                {errorMessage}
                            </Text>
                        )}

                        {successMessage && (
                            <Text variant="bodySmall" style={styles.successText}>
                                {successMessage}
                            </Text>
                        )}

                        <View style={styles.backContainer}>
                            <Link href="/login" asChild>
                                <Button mode="text" compact textColor="#6200EE">
                                    Back to Login
                                </Button>
                            </Link>
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
    otpHint: {
        color: "#757575",
        textAlign: "center",
        marginBottom: "16@vs",
    },
    resendLink: {
        color: "#6200EE",
        fontWeight: "bold",
    },
    errorText: {
        color: "#B00020",
        textAlign: "center",
        marginVertical: "8@vs",
    },
    successText: {
        color: "#22C55E",
        textAlign: "center",
        marginVertical: "8@vs",
    },
    backContainer: {
        alignItems: "center",
        marginTop: "8@vs",
    },
});