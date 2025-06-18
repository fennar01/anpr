// Placeholder service - no actual functionality
class PlateRecognitionService {
  private isInitialized: boolean = false;

  async initialize() {
    console.log('[PlateRecognitionService] Initializing placeholder service');
    this.isInitialized = true;
    console.log('[PlateRecognitionService] Placeholder service initialized');
  }

  async processFrame(frame: any): Promise<string | null> {
    console.log('[PlateRecognitionService] Processing frame (placeholder)');
    return null;
  }

  setCamera(cameraRef: any) {
    console.log('[PlateRecognitionService] Setting camera (placeholder)');
  }

  filterPotentialPlates(text: string): string[] {
    console.log('[PlateRecognitionService] Filtering plates (placeholder)');
    return [];
  }
}

export const plateRecognitionService = new PlateRecognitionService(); 