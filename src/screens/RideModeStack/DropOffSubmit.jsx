import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, Button } from 'native-base';
import PropTypes from 'prop-types';
import Stars from 'react-native-stars'; // Link to docs: https://www.npmjs.com/package/react-native-stars
import Bike from '../../models/Bike';
import { addBikeRating } from '../../api/bikeRatings';
import { addUserComment } from '../../api/userComments';
import { checkInBike } from '../../api/checkBike';
import { deleteBikeRental } from '../../api/bikeRental';

const DropOffSubmit = ({ navigation, route }) => {
  const bike = route.params.bike;
  const [starRating, setStarRating] = useState(2.5);
  const [feedback, setFeedback] = useState('');

  // This function will submit the rating and user's feedback to db, check the bike
  // back into the system, delete the rental document and then navigate the user
  // back to the HomeStack
  const endRide = async (bikeId) => {
    await addBikeRating(starRating, bikeId);
    await addUserComment(feedback, bikeId);
    deleteBikeRental(bikeId);
    checkInBike(bikeId);
    navigation.navigate('Home', {
      screen: 'BrowseBikes',
    });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Rate your ride</Text>
        <Stars
          default={2.5}
          count={5}
          half
          starSize={60}
          update={(val) => {
            setStarRating(val);
          }}
          fullStar={<Icon name="star" size={60} style={[styles.myStarStyle]} />}
          emptyStar={
            <Icon name="star-outline" size={60} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />
          }
          halfStar={<Icon name="star-half" size={60} style={[styles.myStarStyle]} />}
        />
        <View style={styles.textInputContainer}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Leave Feedback"
            onChangeText={(userText) => setFeedback(userText)}
            style={styles.input}
          />
        </View>

        <Button style={styles.button} onPress={() => endRide(bike.id)}>
          <Text>Confirm Drop Off</Text>
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    paddingBottom: 10,
    fontSize: 48 
  },
  myStarStyle: {
    color: 'yellow',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: 'white',
  },
  textInputContainer: {
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: '#F0EEEE',
    height: 50,
    width: '50%',
    borderRadius: 5,
    marginHorizontal: 15,
    // allow TextInput and icon to show up on same line
    flexDirection: 'row',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 5,
    fontSize: 18,
    borderRadius: 4,
    width: '100%',
    alignSelf: 'center'
  },
  button: {
    alignSelf: 'center',
    width: '50%',
  },
});

DropOffSubmit.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      bike: PropTypes.instanceOf(Bike).isRequired
    }).isRequired
  }).isRequired,
};

export default DropOffSubmit;
