import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export const CameraScreen: React.FC = () => {
  console.log('[CameraScreen] Rendering camera screen');

  return (
    <View style={styles.container}>
      <View style={styles.cameraPlaceholder}>
        <Text style={styles.placeholderText}>📷</Text>
        <Text style={styles.placeholderTitle}>Camera Placeholder</Text>
        <Text style={styles.placeholderSubtitle}>
          Camera functionality will be implemented here
        </Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Start Detection</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
  placeholderText: {
    fontSize: 80,
    marginBottom: 20,
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  placeholderSubtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
  },
  buttonContainer: {
    padding: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 