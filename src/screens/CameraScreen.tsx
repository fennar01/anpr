import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Alert, Platform } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { plateRecognitionService } from '../services/PlateRecognitionService';
import { database, LicensePlateRecord } from '../database/Database';

let Geolocation: any;
if (Platform.OS === 'web') {
  Geolocation = require('../mocks/@react-native-community/geolocation.web').default;
} else {
  try {
    Geolocation = require('@react-native-community/geolocation').default;
  } catch (error) {
    console.warn('Geolocation not available:', error);
    Geolocation = require('../mocks/@react-native-community/geolocation.web').default;
  }
}

let notifee: any;
if (Platform.OS === 'web') {
  notifee = require('../mocks/@notifee/react-native.web').default;
} else {
  try {
    notifee = require('@notifee/react-native').default;
  } catch (error) {
    console.warn('Notifee not available:', error);
    notifee = require('../mocks/@notifee/react-native.web').default;
  }
}

export const CameraScreen: React.FC = () => {
  const camera = useRef<Camera>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
        
        if (status === 'granted') {
          await plateRecognitionService.initialize();
          await database.init();
        }
      } catch (error) {
        console.error('Initialization error:', error);
        Alert.alert('Error', 'Failed to initialize camera and services');
      }
    };

    initialize();
  }, []);

  const handlePlateDetection = async (plateNumber: string) => {
    try {
      const position = await new Promise<Geolocation.GeoPosition>((resolve, reject) => {
        Geolocation.getCurrentPosition(
          resolve,
          reject,
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      });

      const record: LicensePlateRecord = {
        plateNumber,
        timestamp: Date.now(),
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      const history = await database.getLicensePlateHistory(plateNumber);
      
      if (history.length > 0) {
        const firstSighting = history[history.length - 1];
        const lastSighting = history[0];

        await notifee.displayNotification({
          title: 'License Plate Detected',
          body: `Plate: ${plateNumber}\nFirst seen: ${new Date(firstSighting.timestamp).toLocaleString()}\nLast seen: ${new Date(lastSighting.timestamp).toLocaleString()}`,
          android: {
            channelId: 'plate-detection',
            pressAction: {
              id: 'default',
            },
          },
        });
      }

      await database.insertLicensePlate(record);
    } catch (error) {
      console.error('Error handling plate detection:', error);
    }
  };

  const onFrameDetected = async (frame: any) => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const plateNumber = await plateRecognitionService.processFrame(frame);
      if (plateNumber) {
        await handlePlateDetection(plateNumber);
      }
    } catch (error) {
      console.error('Error processing frame:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        type={CameraType.back}
        onFrameDetected={onFrameDetected}
        frameInterval={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
}); 