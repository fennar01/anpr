# ANPR (Automatic Number Plate Recognition) App

A React Native/Expo application for automatic license plate recognition using camera and machine learning.

## Current Status

🚧 **This is a simplified prototype version** 🚧

The app currently runs with placeholder functionality while the core features are being developed. All complex dependencies have been temporarily replaced with mock implementations to ensure the app loads and runs properly.

## Features

### Currently Working ✅
- 📱 **Basic App Structure**: React Native/Expo app with tab navigation
- 🎨 **UI Components**: Camera and History screens with placeholder content
- 📱 **Navigation**: Bottom tab navigation between Camera and History screens
- 🔧 **Development Setup**: Clean Expo SDK 53 setup with TypeScript

### Planned Features 🚧
- 📷 **Camera Integration**: Real-time camera feed for license plate detection
- 🔍 **ML Kit Text Recognition**: Uses Google ML Kit for text recognition from camera frames
- 📍 **GPS Tracking**: Records location data for each detected license plate
- 💾 **Local Database**: SQLite storage for license plate history
- 🔔 **Push Notifications**: Alerts when previously seen plates are detected
- 📊 **History View**: Browse all detected license plates with timestamps and locations

## Tech Stack

- **React Native** with **Expo SDK 53**
- **TypeScript**
- **React Navigation** for tab navigation
- **Expo Status Bar** for status bar management
- **React Native Safe Area Context** for safe area handling

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
npm install
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

#### iOS Simulator
```bash
npx expo start --ios
```

#### Android Emulator
```bash
npx expo start --android
```

#### Web Browser
```bash
npx expo start --web
```

## Project Structure

```
src/
├── screens/
│   ├── CameraScreen.tsx      # Camera placeholder interface
│   └── HistoryScreen.tsx     # License plate history placeholder
├── services/
│   └── PlateRecognitionService.ts  # Placeholder ML Kit integration
├── database/
│   └── Database.ts           # Placeholder SQLite operations
└── mocks/                    # Web compatibility mocks (unused in current version)
    ├── react-native-sqlite-storage.web.ts
    ├── @notifee/react-native.web.ts
    ├── @react-native-community/geolocation.web.ts
    └── @react-native-ml-kit/text-recognition.web.ts
```

## Current Implementation

### App.tsx
- Simplified main component with basic navigation
- No complex initialization or error handling
- Clean tab navigation setup

### CameraScreen.tsx
- Placeholder camera interface with mock UI
- No actual camera functionality
- Styled placeholder with camera icon and button

### HistoryScreen.tsx
- Mock data display for license plate history
- No database integration
- Clean list interface with sample data

### Services
- **PlateRecognitionService**: Placeholder service with logging
- **Database**: Placeholder database with mock operations

## Development Notes

### Why Placeholders?
The app was experiencing multiple dependency conflicts and module resolution errors. To get a working foundation, all complex features were temporarily replaced with placeholders that:
- Don't import problematic native modules
- Provide clear logging for debugging
- Maintain the app structure for future development

### Next Steps
1. **Camera Integration**: Add real camera functionality using expo-camera
2. **ML Kit Setup**: Properly configure @react-native-ml-kit/text-recognition
3. **Database**: Implement real SQLite storage
4. **Geolocation**: Add location tracking
5. **Notifications**: Implement push notifications

### Dependencies
The app currently uses minimal dependencies to ensure stability:
- Core Expo packages
- React Navigation for routing
- TypeScript for type safety

## Troubleshooting

### Common Issues
- **Port 8081 conflicts**: Kill existing Metro processes with `npx expo start --clear`
- **Module resolution errors**: The app has been simplified to avoid these issues
- **Camera not working**: Currently using placeholder - real camera integration pending

### Development Commands
```bash
# Start with clean cache
npx expo start --clear

# Start on specific platform
npx expo start --ios
npx expo start --android
npx expo start --web

# Install dependencies
npm install

# Clear all caches
npx expo start --clear
rm -rf node_modules
npm install
```

## Contributing

This is a work in progress. The current focus is on:
1. Getting the basic app structure stable
2. Adding real camera functionality
3. Implementing ML Kit text recognition
4. Adding database storage

## License

This project is under development. 