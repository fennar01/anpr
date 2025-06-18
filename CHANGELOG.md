# Changelog

## [Unreleased]

### Added
- Placeholder favicon added to `assets/favicon.png` to resolve missing file error for web builds.

### Fixed
- Expo/React Native dependency versions fixed for compatibility.
- Installed web dependencies for Expo.

### Issues
- Installing `@react-navigation/bottom-tabs` failed due to a dependency conflict with `react-native-screens`. Upgrading `react-native-screens` to a compatible version.

### Issues (continued)
- Attempted to upgrade `react-native-screens` to `~4.20.0` for navigation compatibility, but the upgrade did not succeed. The dependency conflict with `@react-navigation/bottom-tabs` persists.

### Fixed (continued)
- Forced install of `@react-navigation/bottom-tabs` using `--legacy-peer-deps` to bypass Expo/React Native dependency conflict and allow navigation to work.
- Improved web mock implementation using `Platform.OS` checks instead of `typeof window` for better webpack compatibility.
- Added try-catch blocks for native module imports to handle cases where modules are not available.

### Success
- **ANPR app is now running successfully in the web browser at http://localhost:19006**
- All native module dependencies have been mocked for web compatibility
- The app can now be tested for UI and non-native functionality in the browser

### Added (continued)
- Created web mocks for native modules in `src/mocks/`:
  - `react-native-sqlite-storage.web.ts`
  - `@notifee/react-native.web.ts`
  - `@react-native-community/geolocation.web.ts`
  - `@react-native-ml-kit/text-recognition.web.ts`
- These allow the app to load in the browser with native features disabled. 