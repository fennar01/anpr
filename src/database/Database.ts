// Placeholder database - no actual functionality
export interface LicensePlateRecord {
  id?: number;
  plateNumber: string;
  timestamp: number;
  latitude: number;
  longitude: number;
}

class Database {
  private isInitialized: boolean = false;

  async init() {
    console.log('[Database] Initializing placeholder database');
    this.isInitialized = true;
    console.log('[Database] Placeholder database initialized');
  }

  async insertLicensePlate(record: LicensePlateRecord): Promise<void> {
    console.log('[Database] Inserting license plate (placeholder):', record.plateNumber);
  }

  async getAllLicensePlates(): Promise<LicensePlateRecord[]> {
    console.log('[Database] Getting all license plates (placeholder)');
    return [];
  }

  async getLicensePlateHistory(plateNumber: string): Promise<LicensePlateRecord[]> {
    console.log('[Database] Getting license plate history (placeholder):', plateNumber);
    return [];
  }
}

export const database = new Database(); 