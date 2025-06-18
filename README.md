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

- **React Native** with **Expo**
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
- Expo CLI (`npm install -g @expo/cli`)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd anpr
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

### Running the App

#### Web Browser (Recommended for UI Testing)
```bash
npx expo start --web
```
Open http://localhost:19006 in your browser.

#### Mobile Device
1. Install Expo Go on your device
2. Scan the QR code from the terminal
3. The app will load on your device

#### iOS Simulator
```bash
npx expo start --ios
```

#### Android Emulator
```bash
npx expo start --android
```

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

### Native (iOS/Android)
- ✅ Full camera functionality
- ✅ Real GPS location tracking
- ✅ Push notifications
- ✅ Local SQLite database
- ✅ ML Kit text recognition

### Web Browser
- ✅ UI and navigation
- ✅ Mocked database operations
- ✅ Mocked location services
- ❌ Camera functionality (not available in browsers)
- ❌ Push notifications (not available in browsers)

## Development Notes

### Web Compatibility
The app includes web mocks for native modules to allow testing in browsers. These mocks provide no-op implementations for:
- SQLite database operations
- Geolocation services
- Push notifications
- ML Kit text recognition

### Dependencies
Some dependencies were installed with `--legacy-peer-deps` to resolve Expo compatibility issues:
- `@react-navigation/bottom-tabs`

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