# ANPR (Automatic Number Plate Recognition) App

A React Native/Expo application for automatic license plate recognition using camera and machine learning.

## Features

- 📱 **Camera Integration**: Real-time camera feed for license plate detection
- 🔍 **ML Kit Text Recognition**: Uses Google ML Kit for text recognition from camera frames
- 📍 **GPS Tracking**: Records location data for each detected license plate
- 💾 **Local Database**: SQLite storage for license plate history
- 🔔 **Push Notifications**: Alerts when previously seen plates are detected
- 📊 **History View**: Browse all detected license plates with timestamps and locations
- 🌐 **Web Support**: Runs in web browsers with mocked native features

## Tech Stack

- **React Native** with **Expo SDK 53**
- **TypeScript**
- **React Navigation** for tab navigation
- **Expo Camera** for camera access
- **Google ML Kit** for text recognition
- **SQLite** for local data storage
- **React Native Geolocation** for GPS tracking
- **Notifee** for push notifications

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo`)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/fennar01/anpr.git
cd anpr
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Start the development server:
```bash
npx expo start
```

### Running the App

#### Mobile Device (Recommended)
1. Install **Expo Go** on your device:
   - **iOS:** [Expo Go on the App Store](https://apps.apple.com/app/expo-go/id982107779)
   - **Android:** [Expo Go on Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
2. Make sure your phone and computer are on the same Wi-Fi network
3. Scan the QR code shown in the terminal with Expo Go
4. Grant camera, location, and notification permissions when prompted

#### iOS Simulator
```bash
npx expo start --ios
```

#### Android Emulator
```bash
npx expo start --android
```

#### Web Browser (Limited Functionality)
```bash
npx expo start --web
```
**Note:** Web version has limited functionality due to browser restrictions on camera access.

## Project Structure

```
src/
├── screens/
│   ├── CameraScreen.tsx      # Main camera interface
│   └── HistoryScreen.tsx     # License plate history
├── services/
│   └── PlateRecognitionService.ts  # ML Kit integration
├── database/
│   └── Database.ts           # SQLite operations
└── mocks/                    # Web compatibility mocks
    ├── react-native-sqlite-storage.web.ts
    ├── @notifee/react-native.web.ts
    ├── @react-native-community/geolocation.web.ts
    └── @react-native-ml-kit/text-recognition.web.ts
```

## Features by Platform

### Native (iOS/Android) - Full Functionality
- ✅ Real-time camera feed
- ✅ ML Kit text recognition
- ✅ GPS location tracking
- ✅ Push notifications
- ✅ Local SQLite database
- ✅ Tab navigation

### Web Browser - Limited Functionality
- ✅ UI and navigation
- ✅ Mocked database operations
- ✅ Mocked location services
- ❌ Camera functionality (browser restrictions)
- ❌ Push notifications (browser restrictions)
- ❌ ML Kit text recognition (browser restrictions)

## Development Notes

### SDK 53 Compatibility
This project uses **Expo SDK 53** and is compatible with the latest Expo Go app. All dependencies have been updated to their latest compatible versions.

### Web Compatibility
The app includes web mocks for native modules to allow testing in browsers. These mocks provide no-op implementations for:
- SQLite database operations
- Geolocation services
- Push notifications
- ML Kit text recognition

### Dependencies
Some dependencies were installed with `--legacy-peer-deps` to resolve Expo compatibility issues:
- `@react-navigation/bottom-tabs`
- Various React Native packages

### Breaking Changes Fixed
- Updated Camera API from `CameraType.back` to `facing="back"` for SDK 53
- Removed missing asset references
- Updated all dependencies to SDK 53 compatible versions

## Troubleshooting

### App Won't Load
1. Make sure both devices are on the same Wi-Fi network
2. Try restarting the Expo Go app
3. Check that all permissions are granted
4. Restart the Expo development server: `npx expo start --clear`

### Camera Not Working
1. Grant camera permissions in your device settings
2. Make sure you're testing on a real device (camera doesn't work in web browsers)
3. Check that Expo Go has camera access

### Dependencies Issues
If you encounter dependency conflicts:
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on both native and web platforms
5. Submit a pull request

## License

[Add your license here]

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a detailed history of changes.

## Current Status

✅ **SDK 53 upgrade completed**  
✅ **Native builds working**  
✅ **Expo Go compatibility**  
⚠️ **Web builds have some configuration issues**  
✅ **All breaking changes fixed** 