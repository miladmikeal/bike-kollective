import * as Location from 'expo-location';

class LocationServices {
  static async getCurrentLocation() {
    return Location.getCurrentPositionAsync({});
  }

  static async getLocationPermission() {
    const { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      return false;
    }
    return true;
  }
}

export default LocationServices;
