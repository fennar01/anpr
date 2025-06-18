import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CameraScreen } from './src/screens/CameraScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { database } from './src/database/Database';
import { plateRecognitionService } from './src/services/PlateRecognitionService';

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    const initialize = async () => {
      try {
        await database.init();
        await plateRecognitionService.initialize();
      } catch (error) {
        console.error('Initialization error:', error);
      }
    };

    initialize();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Camera') {
                iconName = focused ? 'camera' : 'camera-outline';
              } else if (route.name === 'History') {
                iconName = focused ? 'list' : 'list-outline';
              }

              return <Ionicons name={iconName as any} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen 
            name="Camera" 
            component={CameraScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen 
            name="History" 
            component={HistoryScreen}
            options={{ title: 'Detection History' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
} 