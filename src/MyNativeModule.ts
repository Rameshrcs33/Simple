import { NativeModules } from "react-native";

const MyNativeModule = NativeModules.MyNativeModule;

export async function sayHello() {
  return await MyNativeModule.sayHello();
}
