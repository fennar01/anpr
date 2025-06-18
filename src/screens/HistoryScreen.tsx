import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

// Mock data for demonstration
const mockRecords = [
  {
    id: 1,
    plateNumber: 'ABC123',
    timestamp: Date.now() - 3600000, // 1 hour ago
    latitude: 37.7749,
    longitude: -122.4194,
  },
  {
    id: 2,
    plateNumber: 'XYZ789',
    timestamp: Date.now() - 7200000, // 2 hours ago
    latitude: 37.7849,
    longitude: -122.4094,
  },
];

export const HistoryScreen: React.FC = () => {
  console.log('[HistoryScreen] Rendering history screen');

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.recordContainer}>
      <Text style={styles.plateNumber}>{item.plateNumber}</Text>
      <Text style={styles.timestamp}>
        {new Date(item.timestamp).toLocaleString()}
      </Text>
      <Text style={styles.location}>
        Lat: {item.latitude.toFixed(6)}, Long: {item.longitude.toFixed(6)}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Detection History</Text>
        <Text style={styles.headerSubtitle}>Mock data - Database not connected</Text>
      </View>
      
      <FlatList
        data={mockRecords}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No license plates detected yet</Text>
            <Text style={styles.emptySubtext}>This is placeholder data</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  recordContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  plateNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  timestamp: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    textAlign: 'center',
    fontSize: 14,
    color: '#999',
  },
}); 