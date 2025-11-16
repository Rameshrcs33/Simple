import React from "react";
import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import { Button, ButtonProps } from "react-native-paper";
import { ScaledSheet } from "react-native-size-matters";

type PrimaryButtonProps = {
  label: string;
  onPress: (e: GestureResponderEvent) => void;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: ButtonProps["contentStyle"];
  icon?: string;
  mode?: ButtonProps["mode"];
  compact?: boolean;
  uppercase?: boolean;
  testID?: string;
};

export default function PrimaryButton({
  label,
  onPress,
  loading,
  disabled,
  style,
  contentStyle,
  icon,
  mode = "contained",
  compact,
  uppercase,
  testID,
}: PrimaryButtonProps) {
  return (
    <Button
      mode={mode}
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      style={[styles.button, style]}
      contentStyle={[styles.content, contentStyle]}
      icon={icon}
      compact={compact}
      uppercase={uppercase}
      testID={testID}
    >
      {label}
    </Button>
  );
}

const styles = ScaledSheet.create({
  button: {
    marginTop: "8@vs",
    marginBottom: "16@vs",
    paddingVertical: "4@vs",
  },
  content: {
    paddingVertical: "4@vs",
  },
});
