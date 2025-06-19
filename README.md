# ANPR (Automatic Number Plate Recognition)

This project is a cross-platform (React Native + Expo) app for live license plate recognition using your device's camera and on-device text recognition.

## Features
- Live camera preview using `expo-camera`
- Real-time license plate detection using `@react-native-ml-kit/text-recognition`
- Bounding boxes drawn around detected text (license plates) anywhere in the frame
- Works on Android physical devices
- Standalone APK build (no Expo Go required)

## Quick Start - Install on Your Phone

### Option 1: Install the Pre-built APK (Recommended)
1. **Download the APK:**
   - The latest APK is located at: `build-1750315978588.apk` in the project root
   - Transfer this file to your Android phone using any method (USB, Google Drive, etc.)

2. **Install on your phone:**
   - Enable "Install from unknown sources" in your Android settings
   - Open the APK file and install
   - Launch the app and grant camera permissions

### Option 2: Build Your Own APK
1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Build the production APK:**
   ```sh
   npx eas build --profile production --platform android --local
   ```

3. **Install the APK:**
   - The APK will be created in the project root
   - Transfer to your phone and install

## Development Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Build for development:**
   ```sh
   cd android && ./gradlew assembleDebug
   ```

3. **Install development build:**
   ```sh
   adb install app/build/outputs/apk/debug/app-debug.apk
   ```

## Usage
- The app will show a live camera preview
- Detected text (including license plates) will be highlighted with a red bounding box and the recognized text above it
- No need to position the plate in a specific area—detection works anywhere in the frame
- Use the bottom tabs to switch between Camera and History views

## Requirements
- Android device with camera
- Android 7.0 (API level 24) or higher
- Camera permissions

## Troubleshooting
- If the camera preview is black or not working, ensure you have granted camera permissions
- For best results, use a physical device with good lighting
- The app requires camera permissions to function

## Building
- **Production build:** `npx eas build --profile production --platform android --local`
- **Development build:** `cd android && ./gradlew assembleDebug`
- **Clean build:** `cd android && ./gradlew clean && ./gradlew assembleDebug`

## License
MIT 