import React from 'react';
import { Alert, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../../constants/styles';

interface Props {
  onImageSelected: (imageUri: string) => void;
}

function CameraButton({ onImageSelected }: Props) {
  async function requestPermissions() {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const mediaPermission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (
      cameraPermission.status !== 'granted' ||
      mediaPermission.status !== 'granted'
    ) {
      Alert.alert(
        'Permission needed',
        'Camera and photo library permissions are required'
      );
      return false;
    }
    return true;
  }
  async function takePhoto() {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    Alert.alert('Select Image', 'Choose how to add receipt image', [
      { text: 'Camera', onPress: openCamera },
      { text: 'Gallery', onPress: openGallery },
      { text: 'Cancel', style: 'cancel' },
    ]);
  }

  async function openCamera() {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled && result.assets[0]) {
      onImageSelected(result.assets[0].uri);
    }
  }

  async function openGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled && result.assets[0]) {
      onImageSelected(result.assets[0].uri);
    }
  }

  return (
    <TouchableOpacity style={styles.button} onPress={takePhoto}>
      <Ionicons name="camera" size={20} color="white" />
      <Text style={styles.text}>Add Receipt</Text>
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
  text: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default CameraButton;
