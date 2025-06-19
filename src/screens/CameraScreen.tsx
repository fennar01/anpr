import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { CameraView, CameraType, FlashMode, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import TextRecognition from '@react-native-ml-kit/text-recognition';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const CameraScreen: React.FC = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState<CameraType>('back');
  const [flashMode, setFlashMode] = useState<FlashMode>('off');
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedBlocks, setDetectedBlocks] = useState<any[]>([]);
  const cameraRef = useRef<any>(null);
  const detectionInterval = useRef<NodeJS.Timeout | null>(null);

  // Remove static overlay and use live detection
  useEffect(() => {
    if (permission && permission.granted && !isDetecting) {
      setIsDetecting(true);
      detectionInterval.current = setInterval(runTextDetection, 1000); // every 1s
    }
    return () => {
      if (detectionInterval.current) clearInterval(detectionInterval.current);
      setIsDetecting(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permission?.granted]);

  const runTextDetection = async () => {
    if (!cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        base64: true,
        skipProcessing: true,
      });
      // Optionally resize for performance
      const processed = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: 640 } }],
        { base64: true, compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      const result = await TextRecognition.recognize(processed.uri);
      setDetectedBlocks(result.blocks || []);
    } catch (err) {
      // Ignore errors (e.g., if camera is busy)
    }
  };

  const toggleCameraType = () => {
    setCameraType(current => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setFlashMode(current => (current === 'off' ? 'on' : 'off'));
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No access to camera</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={cameraType}
        flash={flashMode}
      />
      {/* Overlay bounding boxes and recognized text */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {detectedBlocks.map((block, idx) => {
          // block.bounding is {left, top, width, height} in image coordinates
          // We'll scale to screen size (approximate)
          const left = (block.bounding.left / 640) * screenWidth;
          const top = (block.bounding.top / 480) * screenHeight;
          const width = (block.bounding.width / 640) * screenWidth;
          const height = (block.bounding.height / 480) * screenHeight;
          return (
            <View
              key={idx}
              style={[
                styles.boundingBox,
                { left, top, width, height },
              ]}
            >
              <Text style={styles.boundingText}>{block.text}</Text>
            </View>
          );
        })}
      </View>
      {/* Camera controls */}
      <View style={styles.overlay} pointerEvents="box-none">
        <View style={styles.topControls}>
          <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
            <Text style={styles.controlText}>{flashMode === 'on' ? '🔦' : '⚡'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={toggleCameraType}>
            <Text style={styles.controlText}>🔄</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    width: '100%',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlText: {
    fontSize: 24,
  },
  boundingBox: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'red',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boundingText: {
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'rgba(255,0,0,0.7)',
    paddingHorizontal: 4,
    borderRadius: 4,
    fontSize: 16,
    textAlign: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 