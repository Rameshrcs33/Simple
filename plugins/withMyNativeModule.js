const { withDangerousMod } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

module.exports = function withMyNativeModule(config) {
  // Only apply modifications during local prebuild, not for EAS cloud builds
  // EAS cloud builds use native files directly from the repository

  config = withDangerousMod(config, [
    "android",
    async (config) => {
      try {
        const androidSrc = path.join(
          config.modRequest.projectRoot,
          "src/native/android"
        );

        // Get package name from app.json
        const packageName = config.android?.package || "com.anonymous.Simple";
        const packagePath = packageName.replace(/\./g, "/");
        const dest = path.join(
          config.modRequest.platformProjectRoot,
          "app/src/main/java",
          packagePath
        );

        if (fs.existsSync(androidSrc)) {
          fs.mkdirSync(dest, { recursive: true });
          const sourceFile = path.join(androidSrc, "MyNativeModuleModule.java");
          const destFile = path.join(dest, "MyNativeModuleModule.java");

          if (fs.existsSync(sourceFile)) {
            fs.copyFileSync(sourceFile, destFile);
          }
        }
      } catch (error) {
        console.warn(
          "Warning: Could not copy Android native module:",
          error.message
        );
      }
      return config;
    },
  ]);

  config = withDangerousMod(config, [
    "ios",
    async (config) => {
      try {
        const iosSrc = path.join(
          config.modRequest.projectRoot,
          "src/native/ios"
        );
        const dest = path.join(
          config.modRequest.platformProjectRoot,
          "MyNativeModule"
        );

        if (fs.existsSync(iosSrc)) {
          fs.mkdirSync(dest, { recursive: true });
          fs.copyFileSync(
            path.join(iosSrc, "MyNativeModuleModule.swift"),
            path.join(dest, "MyNativeModuleModule.swift")
          );
        }
      } catch (error) {
        console.warn(
          "Warning: Could not copy iOS native module:",
          error.message
        );
      }
      return config;
    },
  ]);

  return config;
};
