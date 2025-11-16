import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Button, Surface, Text, TextInput } from "react-native-paper";
import { ScaledSheet } from "react-native-size-matters";
import CustomTextInput from "../components/CustomTextInput";
import PrimaryButton from "../components/PrimaryButton";

export default function SignupScreen() {
  const navigation: any = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState<string | null>(null);
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDobPicker, setShowDobPicker] = useState(false);
  const [dobDate, setDobDate] = useState<Date | null>(null);
  const [touched, setTouched] = useState<{
    firstName?: boolean;
    lastName?: boolean;
    mobile?: boolean;
    gender?: boolean;
    dob?: boolean;
    email?: boolean;
    password?: boolean;
    confirmPassword?: boolean;
  }>({});

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    mobile?: string;
    gender?: string;
    dob?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const genderItems = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

  const validateFirstName = (value: string) => {
    if (!value || value.trim().length === 0) return "First name is required";
    if (value.trim().length < 2)
      return "First name must be at least 2 characters";
    return "";
  };

  const validateLastName = (value: string) => {
    if (!value || value.trim().length === 0) return "Last name is required";
    if (value.trim().length < 2)
      return "Last name must be at least 2 characters";
    return "";
  };

  const validateMobile = (value: string) => {
    if (!value) return "Mobile is required";
    const digits = value.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15)
      return "Enter a valid mobile number";
    return "";
  };

  const validateGender = (value: string | null) => {
    if (!value || value.trim().length === 0) return "Gender is required";
    const normalized = value.trim().toLowerCase();
    const allowed = ["male", "female", "other"];
    if (!allowed.includes(normalized))
      return "Gender must be Male, Female, or Other";
    return "";
  };

  const validateDob = (value: string) => {
    if (!value) return "Date of birth is required";
    // Expecting DD-MM-YYYY
    const m = value.match(/^(\d{2})-(\d{2})-(\d{4})$/);
    if (!m) return "Use format DD-MM-YYYY";
    const day = Number(m[1]);
    const month = Number(m[2]);
    const year = Number(m[3]);
    const date = new Date(Date.UTC(year, month - 1, day));
    if (
      isNaN(date.getTime()) ||
      date.getUTCMonth() + 1 !== month ||
      date.getUTCDate() !== day
    ) {
      return "Enter a valid date";
    }
    // Optional: minimum age 13
    const today = new Date();
    const thirteenYearsMs = 13 * 365.25 * 24 * 60 * 60 * 1000;
    if (today.getTime() - date.getTime() < thirteenYearsMs)
      return "Must be at least 13 years old";
    return "";
  };

  const validateEmail = (value: string) => {
    if (!value) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Enter a valid email address";
    return "";
  };

  const formatDateDDMMYYYY = (date: Date) => {
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear().toString();
    return `${d}-${m}-${y}`;
  };

  const parseDobToDate = (value: string): Date | null => {
    const m = value.match(/^(\d{2})-(\d{2})-(\d{4})$/);
    if (!m) return null;
    const day = Number(m[1]);
    const month = Number(m[2]);
    const year = Number(m[3]);
    const date = new Date(year, month - 1, day);
    return isNaN(date.getTime()) ? null : date;
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

  const runValidation = (
    fields?: Array<
      | "firstName"
      | "lastName"
      | "mobile"
      | "gender"
      | "dob"
      | "email"
      | "password"
      | "confirmPassword"
    >
  ) => {
    const nextErrors = { ...errors };
    const fieldsToValidate = fields ?? [
      "firstName",
      "lastName",
      "mobile",
      "gender",
      "dob",
      "email",
      "password",
      "confirmPassword",
    ];

    if (fieldsToValidate.includes("firstName")) {
      nextErrors.firstName = validateFirstName(firstName) || undefined;
    }
    if (fieldsToValidate.includes("lastName")) {
      nextErrors.lastName = validateLastName(lastName) || undefined;
    }
    if (fieldsToValidate.includes("mobile")) {
      nextErrors.mobile = validateMobile(mobile) || undefined;
    }
    if (fieldsToValidate.includes("gender")) {
      nextErrors.gender = validateGender(gender) || undefined;
    }
    if (fieldsToValidate.includes("dob")) {
      nextErrors.dob = validateDob(dob) || undefined;
    }
    if (fieldsToValidate.includes("email")) {
      nextErrors.email = validateEmail(email) || undefined;
    }
    if (fieldsToValidate.includes("password")) {
      nextErrors.password = validatePassword(password) || undefined;
    }
    if (fieldsToValidate.includes("confirmPassword")) {
      nextErrors.confirmPassword =
        validateConfirmPassword(confirmPassword, password) || undefined;
    }

    setErrors(nextErrors);
    return nextErrors;
  };

  const handleSignup = () => {
    // Validate all before submit
    const allErrors = runValidation();
    setTouched({
      firstName: true,
      lastName: true,
      mobile: true,
      gender: true,
      dob: true,
      email: true,
      password: true,
      confirmPassword: true,
    });
    if (
      allErrors.firstName ||
      allErrors.lastName ||
      allErrors.mobile ||
      allErrors.gender ||
      allErrors.dob ||
      allErrors.email ||
      allErrors.password ||
      allErrors.confirmPassword
    ) {
      return;
    }

    // Handle signup logic here
    setLoading(true);
    console.log("Signup attempted:", {
      firstName,
      lastName,
      mobile,
      gender,
      dob,
      email,
      password,
    });

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Navigate to login or handle success
    }, 1000);
  };

  const handleBlur = (
    field:
      | "firstName"
      | "lastName"
      | "mobile"
      | "gender"
      | "dob"
      | "email"
      | "password"
      | "confirmPassword"
  ) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    runValidation([field]);
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
            Create Account
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Sign up to get started
          </Text>

          <View style={styles.form}>
            <CustomTextInput
              label="First name"
              value={firstName}
              onChangeText={setFirstName}
              onBlur={() => handleBlur("firstName")}
              autoCapitalize="words"
              autoCorrect={false}
              leftIcon="account-outline"
              containerStyle={styles.input}
              error={!!(touched.firstName && errors.firstName)}
              errorMessage={touched.firstName ? errors.firstName : ""}
            />

            <CustomTextInput
              label="Last name"
              value={lastName}
              onChangeText={setLastName}
              onBlur={() => handleBlur("lastName")}
              autoCapitalize="words"
              autoCorrect={false}
              leftIcon="account"
              containerStyle={styles.input}
              error={!!(touched.lastName && errors.lastName)}
              errorMessage={touched.lastName ? errors.lastName : ""}
            />

            <CustomTextInput
              label="Mobile"
              value={mobile}
              onChangeText={setMobile}
              onBlur={() => handleBlur("mobile")}
              keyboardType="phone-pad"
              autoCapitalize="none"
              autoCorrect={false}
              leftIcon="phone"
              containerStyle={styles.input}
              error={!!(touched.mobile && errors.mobile)}
              errorMessage={touched.mobile ? errors.mobile : ""}
            />

            <View style={styles.dropdownWrapper}>
              <Text variant={"bodySmall"} style={styles.dropdownLabelText}>
                Gender
              </Text>
              <DropDownPicker
                open={genderOpen}
                value={gender}
                items={genderItems}
                setOpen={setGenderOpen}
                setValue={setGender}
                onChangeValue={(value: string | null) => {
                  setTouched((prev) => ({ ...prev, gender: true }));
                  // Validate with the new value
                  const error = validateGender(value);
                  setErrors((prev) => ({
                    ...prev,
                    gender: error || undefined,
                  }));
                }}
                placeholder="Select Gender"
                placeholderStyle={styles.dropdownPlaceholder}
                style={[
                  styles.dropdown,
                  touched.gender && errors.gender ? styles.dropdownError : {},
                ]}
                dropDownContainerStyle={styles.dropdownList}
                textStyle={styles.dropdownText}
                labelStyle={styles.dropdownItemLabel}
                selectedItemLabelStyle={styles.dropdownSelectedLabel}
                listMode="FLATLIST"
                flatListProps={{
                  nestedScrollEnabled: true,
                }}
                onOpen={() => {
                  setTouched((prev) => ({ ...prev, gender: true }));
                }}
              />
              {touched.gender && errors.gender && (
                <Text variant="bodySmall" style={styles.dropdownErrorText}>
                  {errors.gender}
                </Text>
              )}
            </View>

            <CustomTextInput
              label="Date of Birth (DD-MM-YYYY)"
              value={dob}
              onChangeText={setDob}
              onBlur={() => handleBlur("dob")}
              autoCapitalize="none"
              autoCorrect={false}
              leftIcon="calendar"
              containerStyle={styles.input}
              error={!!(touched.dob && errors.dob)}
              errorMessage={touched.dob ? errors.dob : ""}
              editable={false}
              right={
                <TextInput.Icon
                  icon="calendar-month"
                  onPress={() => {
                    const initial = parseDobToDate(dob) ?? new Date(2000, 0, 1);
                    setDobDate(initial);
                    setShowDobPicker(true);
                  }}
                  forceTextInputFocus={false}
                />
              }
            />

            {showDobPicker && (
              <DateTimePicker
                value={dobDate ?? parseDobToDate(dob) ?? new Date(2000, 0, 1)}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                maximumDate={new Date()}
                onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                  if (Platform.OS === "android") {
                    if (event.type === "set" && selectedDate) {
                      const formatted = formatDateDDMMYYYY(selectedDate);
                      setDob(formatted);
                      setTouched((prev) => ({ ...prev, dob: true }));
                      runValidation(["dob"]);
                    }
                    setShowDobPicker(false);
                  } else {
                    if (selectedDate) {
                      setDobDate(selectedDate);
                      const formatted = formatDateDDMMYYYY(selectedDate);
                      setDob(formatted);
                      setTouched((prev) => ({ ...prev, dob: true }));
                      runValidation(["dob"]);
                    }
                  }
                }}
              />
            )}

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

            <CustomTextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              onBlur={() => handleBlur("password")}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              leftIcon="lock"
              containerStyle={styles.input}
              error={!!(touched.password && errors.password)}
              errorMessage={touched.password ? errors.password : ""}
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
              label="Sign Up"
              onPress={handleSignup}
              loading={loading}
              disabled={loading}
            />

            <View style={styles.loginContainer}>
              <Text variant="bodyMedium" style={styles.loginText}>
                Already have an account?{" "}
              </Text>
              <Button mode="text" compact style={styles.loginButton} textColor="#6200EE" onPress={() => navigation.navigate('Login', {})}>
                Login
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
  signupButton: {
    marginTop: "8@vs",
    marginBottom: "16@vs",
    paddingVertical: "4@vs",
  },
  buttonContent: {
    paddingVertical: "8@vs",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "8@vs",
  },
  loginText: {
    color: "#757575",
  },
  loginButton: {
    margin: 0,
    padding: 0,
  },
  dropdownWrapper: {
    marginBottom: "16@vs",
    zIndex: 3000,
  },
  dropdownLabelText: {
    fontSize: "13@ms",
    marginBottom: "8@vs",
    marginLeft: "4@s",
    color: "#424242",
    fontWeight: "500",
  },
  dropdown: {
    backgroundColor: "#ffffff",
    borderColor: "#BDBDBD",
    borderWidth: 1,
    borderRadius: 4,
    minHeight: 56,
    paddingHorizontal: 12,
  },
  dropdownError: {
    borderColor: "#B00020",
    borderWidth: 2,
  },
  dropdownPlaceholder: {
    color: "#9E9E9E",
    fontSize: "13@ms",
  },
  dropdownText: {
    fontSize: "13@ms",
    color: "#212121",
  },
  dropdownItemLabel: {
    fontSize: "13@ms",
    color: "#212121",
  },
  dropdownSelectedLabel: {
    fontWeight: "600",
    color: "#212121",
    fontSize: "13@ms",
  },
  dropdownList: {
    backgroundColor: "#ffffff",
    borderColor: "#BDBDBD",
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 4,
    maxHeight: 200,
  },
  dropdownErrorText: {
    color: "#B00020",
    marginTop: "4@vs",
    marginLeft: "12@s",
    fontSize: "12@ms",
  },
});
