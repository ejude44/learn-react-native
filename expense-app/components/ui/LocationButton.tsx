import React, { useState } from 'react';
import { Alert, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../../constants/styles';

interface LocationData {
  latitude: number;
  longitude: number;
  locationName?: string;
}

interface Props {
  onLocationSelected: (location: LocationData) => void;
  currentLocation?: LocationData;
}

function LocationButton({ onLocationSelected, currentLocation }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  async function requestPermissions() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Location permission is required');
      return false;
    }
    return true;
  }

  async function getCurrentLocation() {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    setIsLoading(true);
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = location.coords;

      const addresses = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const locationName = addresses[0]
        ? `${addresses[0].name || ''} ${addresses[0].street || ''}, ${addresses[0].city || ''}`.trim()
        : `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

      onLocationSelected({
        latitude,
        longitude,
        locationName,
      });
    } catch (error) {
      console.error('Location error:', error);
      Alert.alert('Error', 'Failed to get location');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <TouchableOpacity
      style={[styles.button, currentLocation && styles.buttonSelected]}
      onPress={getCurrentLocation}
      disabled={isLoading}
    >
      <Ionicons
        name={currentLocation ? 'location' : 'location-outline'}
        size={20}
        color="white"
      />
      <Text style={styles.text}>
        {isLoading
          ? 'Getting Location...'
          : currentLocation
            ? 'Location Added'
            : 'Add Location'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.primary500,
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonSelected: {
    backgroundColor: GlobalStyles.colors.accent500,
  },
  text: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default LocationButton;
