import React, { useState } from 'react';
import { Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import PropTypes from 'prop-types';
import { Button, Container, Content, Icon, Text, Title } from 'native-base';
import globalStyles from '../../styles/styles';

const AddBikePic = ({ navigation, route }) => {
  const [imgUri, setImgUri] = useState();

  const values = route.params.values;
  const location = route.params.location;

  const pickImage = async () => {
    const permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions.status !== 'granted') {
      Alert.alert('Media library permissions are required, please enable them in your device settings.');
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });

      if (!result.cancelled) {
        setImgUri(result.uri);
      }
    }
  };

  const takePicture = async () => {
    const permissions = await ImagePicker.requestCameraPermissionsAsync();
    if (permissions.status !== 'granted') {
      Alert.alert('Camera permissions are required, please enable them in your device settings.');
    } else {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });

      if (!result.cancelled) {
        setImgUri(result.uri);
      }
    }
  };

  return (
    <Container>
      <Content>
        <Title style={globalStyles.title}>
          <Text style={globalStyles.titleText}>
            Let's get a picture of your bike
          </Text>
        </Title>
        <Button
          onPress={pickImage}
          style={globalStyles.addBikeButton}
        >
          <Text>Upload Image from Gallery</Text>
          <Icon type="MaterialIcons" name="image" style={globalStyles.listNextIcon} />
        </Button>
        <Button
          onPress={takePicture}
          style={globalStyles.addBikeButton}
        >
          <Text>Take a Photo Now</Text>
          <Icon type="MaterialIcons" name="camera-alt" style={globalStyles.listNextIcon} />
        </Button>
        {imgUri &&
          <Image style={styles.img} source={{ uri: imgUri }} />
        }
        {imgUri &&
          <Button
            onPress={() => { navigation.push('AddBikeWaiver', { values, location, imgUri} ); }}
            style={globalStyles.addBikeButton}
          >
            <Text>Continue</Text>
          </Button>
        }
      </Content>
    </Container>
  );
};

AddBikePic.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      values: PropTypes.shape({
        name: PropTypes.string.isRequired,
        style: PropTypes.string.isRequired,
        frame: PropTypes.string.isRequired,
        keywords: PropTypes.string,
        lock: PropTypes.string.isRequired
      }).isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired
      })
    }).isRequired,
  }).isRequired,
};

const styles = {
  img: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.5,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
};

export default AddBikePic;
