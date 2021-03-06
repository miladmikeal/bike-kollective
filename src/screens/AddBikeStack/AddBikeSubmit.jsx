import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Image } from 'react-native';
import { Button, Container, Content, Text, Title, View } from 'native-base';
import * as firebase from "firebase";
import confirmation from '../../../assets/confirmation.png';
import globalStyles from '../../styles/styles';
import getGeoStore from '../../api/geofirestore';
import { saveBike, saveBikeImg } from '../../api/bikes';

const AddBikeSubmit = ({ navigation, route }) => {
  const bike = route.params.bike;
  const location = route.params.location;
  const imgUri = route.params.imgUri;

  const handleConfirm = async () => {
    const geostore = getGeoStore();
    const bikeData = bike;
    bikeData.coordinates = new firebase.firestore.GeoPoint(location.latitude, location.longitude);

    let picUrl;
    try {
      picUrl = await saveBikeImg(imgUri);
    } catch (err) {
      Alert.alert(`There as an unexpected error saving the bike image to the data store: ${err}`);
    }

    bikeData.pic_url = picUrl;
    
    try {
      await saveBike(geostore, bike);
    } catch (err) {
      Alert.alert(`There was an unexpected error saving the bike to the data store: ${err}`);
    }
    Alert.alert('Your bike has been added to the bike-kollective!');
    navigation.navigate('AddBikeFormScreen');
  };

  return (
    <Container>
      <Content>
        <Title style={globalStyles.title}>
          <Text style={globalStyles.titleText}>
            Thank you!
          </Text>
        </Title>
        <Image style={globalStyles.addBikeSubmitImage} source={confirmation} />
        <View style={globalStyles.addBikeInfoView}>
          <Text>
            Please confirm you want to donate your bicycle to the bike-kollective.
            Power to the people!
          </Text>
        </View>
        <Button
          onPress={handleConfirm}
          style={globalStyles.addBikeButton}
        >
          <Text>Confirm</Text>
        </Button>
      </Content>
    </Container>
  );
};

AddBikeSubmit.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      bike: PropTypes.shape({
        name: PropTypes.string.isRequired,
        style: PropTypes.string.isRequired,
        frame: PropTypes.string.isRequired,
        keywords: PropTypes.string,
        lock: PropTypes.string.isRequired
      }).isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired
      }).isRequired,
      imgUri: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default AddBikeSubmit;
