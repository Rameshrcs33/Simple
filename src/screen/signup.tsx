import React, { useState } from "react";
import { Platform, View, KeyboardAvoidingView, ScrollView } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { Text, Button, TextInput } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import CustomTextInput from "../components/CustomTextInput";
import PrimaryButton from "../components/PrimaryButton";

const formatDateDDMMYYYY = (date: Date) => {
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear().toString();
  return `${d}-${m}-${y}`;
};

export default function SignupScreen() {
  const navigation: any = useNavigation();

  // form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState<string | null>(null);
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderItems, setGenderItems] = useState([
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ]);

  const [dob, setDob] = useState("");
  const [pickerDate, setPickerDate] = useState<Date>(new Date());
  const [showDobPicker, setShowDobPicker] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [touched, setTouched] = useState<any>({});
  const [errors, setErrors] = useState<any>({});

  const parseDobToDate = (value: string): Date | null => {
    const m = value.match(/^(\d{2})-(\d{2})-(\d{4})$/);
    if (!m) return null;
    const day = Number(m[1]);
    const month = Number(m[2]);
    const year = Number(m[3]);
    const date = new Date(year, month - 1, day);
    return isNaN(date.getTime()) ? null : date;
  };

  const validateFirstName = (v: string) => {
    if (!v || v.trim().length === 0) return "First name is required";
    if (v.trim().length < 2) return "First name must be at least 2 characters";
    return "";
  };

  const validateLastName = (v: string) => {
    if (!v || v.trim().length === 0) return "Last name is required";
    if (v.trim().length < 2) return "Last name must be at least 2 characters";
    return "";
  };

  const validateMobile = (v: string) => {
    if (!v) return "Mobile is required";
    const digits = v.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15)
      return "Enter a valid mobile number";
    return "";
  };

  const validateGender = (v: string | null) => {
    if (!v || v.trim().length === 0) return "Gender is required";
    return "";
  };

  const validateDob = (v: string) => {
    if (!v) return "Date of birth is required";
    const m = v.match(/^(\d{2})-(\d{2})-(\d{4})$/);
    if (!m) return "Use format DD-MM-YYYY";
    const day = Number(m[1]);
    const month = Number(m[2]);
    const year = Number(m[3]);
    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime())) return "Enter a valid date";
    const today = new Date();
    const minAgeMs = 13 * 365.25 * 24 * 60 * 60 * 1000;
    if (today.getTime() - date.getTime() < minAgeMs)
      return "Must be at least 13 years old";
    return "";
  };

  const validateEmail = (v: string) => {
    if (!v) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(v)) return "Enter a valid email address";
    return "";
  };

  const validatePassword = (v: string) => {
    if (!v) return "Password is required";
    if (v.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(v)) return "Include at least one uppercase letter";
    if (!/[a-z]/.test(v)) return "Include at least one lowercase letter";
    if (!/[0-9]/.test(v)) return "Include at least one number";
    if (!/[!@#$%^&*(),.?":{}|<>_\-\[\]\\\/;'+=~`]/.test(v))
      return "Include at least one special character";
    return "";
  };

  const validateConfirmPassword = (v: string, pwd: string) => {
    if (!v) return "Please confirm your password";
    if (v !== pwd) return "Passwords do not match";
    return "";
  };

  const runValidation = (fields?: string[]) => {
    const nextErrors: any = { ...errors };
    const toValidate = fields ?? [
      "firstName",
      "lastName",
      "mobile",
      "gender",
      "dob",
      "email",
      "password",
      "confirmPassword",
    ];

    if (toValidate.includes("firstName"))
      nextErrors.firstName = validateFirstName(firstName) || undefined;
    if (toValidate.includes("lastName"))
      nextErrors.lastName = validateLastName(lastName) || undefined;
    if (toValidate.includes("mobile"))
      nextErrors.mobile = validateMobile(mobile) || undefined;
    if (toValidate.includes("gender"))
      nextErrors.gender = validateGender(gender) || undefined;
    if (toValidate.includes("dob"))
      nextErrors.dob = validateDob(dob) || undefined;
    if (toValidate.includes("email"))
      nextErrors.email = validateEmail(email) || undefined;
    if (toValidate.includes("password"))
      nextErrors.password = validatePassword(password) || undefined;
    if (toValidate.includes("confirmPassword"))
      nextErrors.confirmPassword =
        validateConfirmPassword(confirmPassword, password) || undefined;

    setErrors(nextErrors);
    return nextErrors;
  };

  const handleSignup = () => {
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
    const all = runValidation();
    if (
      all.firstName ||
      all.lastName ||
      all.mobile ||
      all.gender ||
      all.dob ||
      all.email ||
      all.password ||
      all.confirmPassword
    )
      return;

    // Submit or navigate
    navigation.navigate("Login");
  };

  const onDobChange = (event: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS === "android") {
      // Android closes picker automatically
      if (event.type === "dismissed") {
        setShowDobPicker(false);
        return;
      }
      if (event.type === "set" && selected) {
        setPickerDate(selected);
        const formatted = formatDateDDMMYYYY(selected);
        setDob(formatted);
        setTouched((p: any) => ({ ...p, dob: true }));
        runValidation(["dob"]);
      }
      setShowDobPicker(false);
    } else {
      if (selected) {
        setPickerDate(selected);
        const formatted = formatDateDDMMYYYY(selected);
        setDob(formatted);
        setTouched((p: any) => ({ ...p, dob: true }));
        runValidation(["dob"]);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text variant="headlineMedium" style={styles.title}>
            Create Account
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Fill in your details
          </Text>

          <CustomTextInput
            label="First name"
            value={firstName}
            onChangeText={setFirstName}
            onBlur={() => {
              setTouched((p: any) => ({ ...p, firstName: true }));
              runValidation(["firstName"]);
            }}
            containerStyle={styles.input}
            leftIcon="account-outline"
            error={!!(touched.firstName && errors.firstName)}
            errorMessage={touched.firstName ? errors.firstName : ""}
          />

          <CustomTextInput
            label="Last name"
            value={lastName}
            onChangeText={setLastName}
            onBlur={() => {
              setTouched((p: any) => ({ ...p, lastName: true }));
              runValidation(["lastName"]);
            }}
            containerStyle={styles.input}
            leftIcon="account"
            error={!!(touched.lastName && errors.lastName)}
            errorMessage={touched.lastName ? errors.lastName : ""}
          />

          <View style={styles.dropdownWrapper}>
            <Text variant="bodySmall" style={styles.dropdownLabelText}>
              Gender
            </Text>
            <DropDownPicker
              open={genderOpen}
              value={gender}
              items={genderItems}
              setOpen={setGenderOpen}
              setValue={setGender}
              onChangeValue={(value: string | null) => {
                setTouched((p: any) => ({ ...p, gender: true }));
                const err = validateGender(value);
                setErrors((prev: any) => ({
                  ...prev,
                  gender: err || undefined,
                }));
              }}
              setItems={setGenderItems}
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
              flatListProps={{ nestedScrollEnabled: true }}
              onOpen={() => setTouched((p: any) => ({ ...p, gender: true }))}
            />
            {touched.gender && errors.gender && (
              <Text variant="bodySmall" style={styles.dropdownErrorText}>
                {errors.gender}
              </Text>
            )}
          </View>

          <CustomTextInput
            label="Mobile"
            value={mobile}
            onChangeText={setMobile}
            onBlur={() => {
              setTouched((p: any) => ({ ...p, mobile: true }));
              runValidation(["mobile"]);
            }}
            containerStyle={styles.input}
            keyboardType="phone-pad"
            leftIcon="phone"
            error={!!(touched.mobile && errors.mobile)}
            errorMessage={touched.mobile ? errors.mobile : ""}
          />

          <CustomTextInput
            label="Date of Birth (DD-MM-YYYY)"
            value={dob}
            editable={false}
            containerStyle={styles.input}
            leftIcon="calendar"
            right={
              <TextInput.Icon
                icon="calendar"
                onPress={() => {
                  setTouched((p: any) => ({ ...p, dob: true }));
                  setShowDobPicker(true);
                }}
                forceTextInputFocus={false}
              />
            }
            error={!!(touched.dob && errors.dob)}
            errorMessage={touched.dob ? errors.dob : ""}
          />

          {showDobPicker && (
            <View style={styles.pickerContainer}>
              <DateTimePicker
                value={parseDobToDate(dob) ?? pickerDate}
                mode="date"
                display={Platform.OS === "android" ? "calendar" : "spinner"}
                onChange={onDobChange}
                maximumDate={new Date()}
                minimumDate={new Date(1900, 0, 1)}
              />
              {Platform.OS === "ios" && (
                <Button mode="text" onPress={() => setShowDobPicker(false)}>
                  Done
                </Button>
              )}
            </View>
          )}

          <CustomTextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            onBlur={() => {
              setTouched((p: any) => ({ ...p, email: true }));
              runValidation(["email"]);
            }}
            containerStyle={styles.input}
            keyboardType="email-address"
            leftIcon="email"
            error={!!(touched.email && errors.email)}
            errorMessage={touched.email ? errors.email : ""}
          />

          <CustomTextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            onBlur={() => {
              setTouched((p: any) => ({ ...p, password: true }));
              runValidation(["password"]);
            }}
            secureTextEntry={!showPassword}
            containerStyle={styles.input}
            leftIcon="lock"
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword((s) => !s)}
                forceTextInputFocus={false}
              />
            }
            error={!!(touched.password && errors.password)}
            errorMessage={touched.password ? errors.password : ""}
          />

          <CustomTextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onBlur={() => {
              setTouched((p: any) => ({ ...p, confirmPassword: true }));
              runValidation(["confirmPassword"]);
            }}
            secureTextEntry={!showConfirmPassword}
            containerStyle={styles.input}
            leftIcon="lock-check"
            right={
              <TextInput.Icon
                icon={showConfirmPassword ? "eye-off" : "eye"}
                onPress={() => setShowConfirmPassword((s) => !s)}
                forceTextInputFocus={false}
              />
            }
            error={!!(touched.confirmPassword && errors.confirmPassword)}
            errorMessage={touched.confirmPassword ? errors.confirmPassword : ""}
          />

          <PrimaryButton label="Sign Up" onPress={handleSignup} />

          <View style={styles.loginContainer}>
            <Text variant="bodyMedium" style={styles.loginText}>
              Already have an account?{" "}
            </Text>
            <Button
              mode="text"
              compact
              style={styles.loginButton}
              textColor="#6200EE"
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = ScaledSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { flexGrow: 1, justifyContent: "center", padding: "20@s" },
  card: { backgroundColor: "#fff", padding: "20@s", borderRadius: "12@ms" },
  title: { textAlign: "center", marginBottom: "6@vs", fontWeight: "700" },
  subtitle: { textAlign: "center", marginBottom: "16@vs", color: "#666" },
  input: { marginBottom: "12@vs" },
  pickerContainer: { marginBottom: "16@vs" },
  dropdownWrapper: { marginBottom: "12@vs", zIndex: 5000 },
  dropdownLabelText: {
    fontSize: "13@ms",
    marginBottom: "6@vs",
    color: "#424242",
    marginLeft: "4@s",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderColor: "#BDBDBD",
    borderWidth: 1,
    borderRadius: "4@ms",
    minHeight: "56@vs",
    paddingHorizontal: "12@s",
  },
  dropdownError: { borderColor: "#B00020", borderWidth: 2 },
  dropdownPlaceholder: { color: "#9E9E9E" },
  dropdownText: { fontSize: "13@ms", color: "#212121" },
  dropdownItemLabel: { fontSize: "13@ms", color: "#212121" },
  dropdownSelectedLabel: {
    fontWeight: "600",
    color: "#212121",
    fontSize: "13@ms",
  },
  dropdownList: {
    backgroundColor: "#fff",
    borderColor: "#BDBDBD",
    borderWidth: 1,
    borderRadius: "4@ms",
    marginTop: "4@vs",
    maxHeight: 200,
  },
  dropdownErrorText: {
    color: "#B00020",
    marginTop: "4@vs",
    marginLeft: "12@s",
    fontSize: "12@ms",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "12@vs",
  },
  loginText: { color: "#757575" },
  loginButton: { margin: 0, padding: 0 },
});
