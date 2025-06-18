import { Platform } from 'react-native';

let SQLite: any;
if (Platform.OS === 'web') {
  SQLite = require('../mocks/react-native-sqlite-storage.web').default;
} else {
  try {
    SQLite = require('react-native-sqlite-storage').default;
  } catch (error) {
    console.warn('SQLite not available:', error);
    SQLite = require('../mocks/react-native-sqlite-storage.web').default;
  }
}

SQLite.enablePromise(true);

interface LicensePlateRecord {
  id?: number;
  plateNumber: string;
  timestamp: number;
  latitude: number;
  longitude: number;
}

class Database {
  private database: SQLite.SQLiteDatabase | null = null;

  async init() {
    try {
      const db = await SQLite.openDatabase({
        name: 'anpr.db',
        location: 'default',
      });
      this.database = db;
      await this.createTables();
    } catch (error) {
      console.error('Database initialization error:', error);
    }
  }

  private async createTables() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS license_plates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        plate_number TEXT NOT NULL,
        timestamp INTEGER NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL
      );
    `;

    try {
      await this.database?.executeSql(createTableQuery);
    } catch (error) {
      console.error('Error creating tables:', error);
    }
  }

  async insertLicensePlate(record: LicensePlateRecord): Promise<void> {
    const insertQuery = `
      INSERT INTO license_plates (plate_number, timestamp, latitude, longitude)
      VALUES (?, ?, ?, ?);
    `;

    try {
      await this.database?.executeSql(insertQuery, [
        record.plateNumber,
        record.timestamp,
        record.latitude,
        record.longitude,
      ]);
    } catch (error) {
      console.error('Error inserting license plate:', error);
    }
  }

  async getLicensePlateHistory(plateNumber: string): Promise<LicensePlateRecord[]> {
    const query = `
      SELECT * FROM license_plates
      WHERE plate_number = ?
      ORDER BY timestamp DESC;
    `;

    try {
      const [results] = await this.database!.executeSql(query, [plateNumber]);
      const records: LicensePlateRecord[] = [];
      
      for (let i = 0; i < results.rows.length; i++) {
        records.push(results.rows.item(i));
      }
      
      return records;
    } catch (error) {
      console.error('Error fetching license plate history:', error);
      return [];
    }
  }

  async getAllLicensePlates(): Promise<LicensePlateRecord[]> {
    const query = `
      SELECT * FROM license_plates
      ORDER BY timestamp DESC;
    `;

    try {
      const [results] = await this.database!.executeSql(query);
      const records: LicensePlateRecord[] = [];
      
      for (let i = 0; i < results.rows.length; i++) {
        records.push(results.rows.item(i));
      }
      
      return records;
    } catch (error) {
      console.error('Error fetching all license plates:', error);
      return [];
    }
  }
}

export const database = new Database();
export type { LicensePlateRecord }; 