import React, { useState } from 'react';
import { Alert, StyleSheet, View, Text } from 'react-native';
import { Content, Container } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Camera } from 'expo-camera';
import { Entypo } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import CameraPreview from '../../components/CameraPreview';
import globalStyles from '../../styles/styles';

let camera;

const CameraInput = ({ navigation, route }) => {
  const bike = route.params.values.values;
  const location = route.params.location.location;
  const [startCamera, setStartCamera] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  // const [flashMode, setFlashMode] = useState('off');

  const __startCamera = async () => {
    const {status} = await Camera.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Access denied');
    }
  };

  const __takePicture = async () => {
    const photo = await camera.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const __savePhoto = () => {
    console.log(bike, location);
    console.log(capturedImage);
  };

  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  };

  // const __handleFlashMode = () => {
  //   if (flashMode === 'on') {
  //     setFlashMode('off');
  //   } else if (flashMode === 'off') {
  //     setFlashMode('on');
  //   } else {
  //     setFlashMode('auto');
  //   }
  // };

  return (
    <Content>
      {startCamera ? (
        <View>
          {previewVisible && capturedImage ? (
            <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
          ) : (
            <View style={styles.container}>
              <Camera
                type={Camera.Constants.Type.back}
                style={styles.camera}
                ref={(r) => {
                  camera = r;
                }}
              >
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={__takePicture}
                    style={styles.button}
                  />
                </View>
              </Camera>
            </View>
          )}
        </View>
      ) : (
        <View styles={styles.container}>
          <TouchableOpacity styles={styles.cameraIcon} onPress={setStartCamera(true)}>
            <Entypo name="upload-to-cloud" size={120} color="blue" />
          </TouchableOpacity>
        </View>
      )}
    </Content>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 25,
  },
  button: {
    flex: 0.1,
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: '#fff'
  },
  cameraIcon: {
    flex: 1
  }
});

CameraInput.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      values: PropTypes.shape({
        values: PropTypes.shape({
          name: PropTypes.string.isRequired,
          style: PropTypes.string.isRequired,
          frame: PropTypes.string.isRequired,
          keywords: PropTypes.string,
          lock: PropTypes.string.isRequired
        }).isRequired,
      }).isRequired,
      location: PropTypes.shape({
        location: PropTypes.shape({
          latitude: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired
        })
      }).isRequired
    }).isRequired,
  }).isRequired,
};

export default CameraInput;
