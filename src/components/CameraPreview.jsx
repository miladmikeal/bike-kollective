import React from 'react';
import { ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import PropTypes from 'prop-types';

const CameraPreview = ({photo, retakePicture, savePhoto}) => (
  <View style={styles.container}>
    <ImageBackground
      source={{uri: photo && photo.uri}}
      style={styles.imageBackground}
    >
      <View style={styles.innerContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={retakePicture}
            style={styles.button}
          >
            <Text style={styles.text}>
              Re-take
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={savePhoto}
            style={styles.button}
          >
            <Text style={styles.text}>
              save photo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  </View>
);


CameraPreview.propTypes = {
  photo: PropTypes.shape({
    uri: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
  retakePicture: PropTypes.func.isRequired,
  savePhoto: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    height: '100%'
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 15,
    justifyContent: 'flex-end'
  },
  imageBackground: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    width: 130,
    height: 40,
    alignItems: 'center',
    borderRadius: 4
  },
  text: {
    color: '#fff',
    fontSize: 20
  }
});

export default CameraPreview;