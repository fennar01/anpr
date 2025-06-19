# ANPR (Automatic Number Plate Recognition)

This project is a cross-platform (React Native + Expo) app for live license plate recognition using your device's camera and on-device text recognition.

## Features
- Live camera preview using `expo-camera`
- Real-time license plate detection using `@react-native-ml-kit/text-recognition`
- Bounding boxes drawn around detected text (license plates) anywhere in the frame
- Works on Android emulator and physical devices

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   npx expo install expo-camera
   npm install @react-native-ml-kit/text-recognition
   ```

2. **Start the Expo development server:**
   ```sh
   npx expo start --lan
   ```
   - Use `--lan` to ensure the Android emulator can access your dev server.

3. **Run on Android Emulator:**
   - Start your emulator (e.g., Pixel_6)
   - Open Expo Go on the emulator
   - Enter the LAN URL (e.g., `exp://192.168.1.114:8081` or the port shown in your terminal)
   - Grant camera permissions when prompted

## Usage
- The app will show a live camera preview.
- Detected text (including license plates) will be highlighted with a red bounding box and the recognized text above it.
- No need to position the plate in a specific area—detection works anywhere in the frame.

## Troubleshooting
- If you see `Failed to download remote update` in Expo Go, make sure you are using your Mac's LAN IP address, not `localhost` or `127.0.0.1`.
- If the camera preview is black or not working, ensure you have granted camera permissions.
- For best results, use a physical device or a high-quality emulator with camera passthrough.

## Updating
- To update dependencies:
  ```sh
  npm install -g npm@latest
  npx expo install
  npm install
  ```
- To clear cache:
  ```sh
  npx expo start --clear
  ```

## License
MIT 