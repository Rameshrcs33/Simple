import React from "react";
import { View } from "react-native";
import { Text, TextInput, TextInputProps } from "react-native-paper";
import { ScaledSheet } from "react-native-size-matters";

interface CustomTextInputProps extends Omit<TextInputProps, "style"> {
  error?: boolean;
  errorMessage?: string;
  containerStyle?: any;
  leftIcon?: string;
  rightIcon?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  error,
  errorMessage,
  containerStyle,
  leftIcon,
  rightIcon,
  left,
  right,
  ...props
}) => {
  // Determine which left/right component to use
  const leftComponent =
    left !== undefined ? (
      left
    ) : leftIcon ? (
      <TextInput.Icon icon={leftIcon} />
    ) : undefined;

  const rightComponent =
    right !== undefined ? (
      right
    ) : rightIcon ? (
      <TextInput.Icon icon={rightIcon} />
    ) : undefined;

  return (
    <View style={styles.wrapper}>
      <TextInput
        {...props}
        left={leftComponent}
        right={rightComponent}
        error={error}
        style={[styles.input, containerStyle]}
        mode="outlined"
        outlineColor={error ? "#B00020" : undefined}
        activeOutlineColor={error ? "#B00020" : "#6200EE"}
      />
      {error && errorMessage && (
        <Text variant="bodySmall" style={styles.errorText}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  wrapper: {
    marginBottom: "8@vs",
  },
  input: {
    marginBottom: 0,
    backgroundColor: "#ffffff",
  },
  errorText: {
    color: "#B00020",
    marginTop: "4@vs",
    marginLeft: "12@s",
  },
});

export default CustomTextInput;
