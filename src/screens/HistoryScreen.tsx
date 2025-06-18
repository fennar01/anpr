import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, RefreshControl } from 'react-native';
import { database, LicensePlateRecord } from '../database/Database';

export const HistoryScreen: React.FC = () => {
  const [records, setRecords] = useState<LicensePlateRecord[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadRecords = async () => {
    try {
      const allRecords = await database.getAllLicensePlates();
      setRecords(allRecords);
    } catch (error) {
      console.error('Error loading records:', error);
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadRecords();
    setRefreshing(false);
  };

  const renderItem = ({ item }: { item: LicensePlateRecord }) => (
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
      <FlatList
        data={records}
        renderItem={renderItem}
        keyExtractor={(item) => item.id?.toString() || item.timestamp.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No license plates detected yet</Text>
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
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
    color: '#666',
  },
}); 