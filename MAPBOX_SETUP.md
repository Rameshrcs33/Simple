# Mapbox Native Setup Guide

Your app now uses the **native Mapbox library** (`@rnmapbox/maps`). This requires a **development build**, not Expo Go.

## Steps to Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Development Build
```bash
npx expo prebuild
```

This generates `android/` and `ios/` native project folders.

### 3. Build & Run on Device/Emulator

**For Android:**
```bash
npx expo run:android
```

**For iOS:**
```bash
npx expo run:ios
```

## Notes

- **No more Expo Go**: The app uses native modules and must run as a development build.
- **First build takes time**: The first build downloads dependencies (Gradle, Android SDK, etc.). Subsequent builds are faster.
- **Ensure emulator/device is running**: Before running the build command.
- **Mapbox Token**: The trial token is embedded in `map.tsx`. For production, replace it with your own token from [mapbox.com](https://account.mapbox.com/access-tokens/).

## Map Features

✅ Tap on map to move marker
✅ Beautiful native Mapbox rendering
✅ Zoom, pan, rotate controls
✅ Access token configured

## Troubleshooting

If you see a blank black screen:
1. Ensure you ran `npx expo run:android` or `npx expo run:ios` (not `expo start`)
2. Check that your device/emulator has internet access
3. Verify the Mapbox token in `map.tsx`

If build fails:
1. Run `npm install` to sync dependencies
2. Run `npx expo prebuild --clean` to regenerate native projects
3. Check for Java/Android SDK installation

---

**Happy mapping!** 🗺️
