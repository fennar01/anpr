import { Camera } from 'expo-camera';
import { Platform } from 'react-native';

let TextRecognition: any;
if (Platform.OS === 'web') {
  TextRecognition = require('../mocks/@react-native-ml-kit/text-recognition.web').default;
} else {
  try {
    TextRecognition = require('@react-native-ml-kit/text-recognition').default;
  } catch (error) {
    console.warn('TextRecognition not available:', error);
    TextRecognition = require('../mocks/@react-native-ml-kit/text-recognition.web').default;
  }
}

class PlateRecognitionService {
  private camera: Camera | null = null;
  private isProcessing: boolean = false;

  async initialize() {
    try {
      // Request camera permissions
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Camera permission not granted');
      }
    } catch (error) {
      console.error('Error initializing plate recognition service:', error);
      throw error;
    }
  }

  async processFrame(frame: any): Promise<string | null> {
    if (this.isProcessing) return null;
    this.isProcessing = true;

    try {
      // Use ML Kit's text recognition
      const result = await TextRecognition.recognize(frame);
      
      // Process the recognized text to find potential license plates
      const potentialPlates = this.filterPotentialPlates(result.text);
      
      this.isProcessing = false;
      return potentialPlates.length > 0 ? potentialPlates[0] : null;
    } catch (error) {
      console.error('Error processing frame:', error);
      this.isProcessing = false;
      return null;
    }
  }

  private filterPotentialPlates(text: string): string[] {
    // This is a simple regex for demonstration
    // You should implement more sophisticated plate detection logic
    const plateRegex = /[A-Z0-9]{2,8}/g;
    const matches = text.match(plateRegex) || [];
    
    return matches.filter(plate => {
      // Add additional validation rules here
      return plate.length >= 4 && plate.length <= 8;
    });
  }

  setCamera(camera: Camera) {
    this.camera = camera;
  }
}

export const plateRecognitionService = new PlateRecognitionService(); 