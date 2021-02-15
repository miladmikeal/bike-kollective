import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, Button } from 'native-base';
import PropTypes from 'prop-types';
import Stars from 'react-native-stars'; // Link to docs: https://www.npmjs.com/package/react-native-stars
import { addBikeRating } from '../../api/bikeRatings';
import { addUserComment } from '../../api/userComments';

const DropOffSubmit = ({ navigation }) => {
  const [starRating, setStarRating] = useState(3.5);
  const [feedback, setFeedback] = useState('');

  // This function will submit the rating and user's feedback to db
  // then navigate the user back to the HomeStack
  const endRide = async () => {
    // id is a placeholder value until the bike id is passed from HomeStack
    const id = 'LLjhXrjG2xagRG6U63A1';
    await addBikeRating(starRating, id);
    await addUserComment(feedback, id);
    navigation.navigate('Home');
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View>
        <Stars
          default={2.5}
          count={5}
          half
          starSize={50}
          update={(val) => {
            setStarRating(val);
          }}
          fullStar={<Icon name="star" style={[styles.myStarStyle]} />}
          emptyStar={
            <Icon name="star-outline" style={[styles.myStarStyle, styles.myEmptyStarStyle]} />
          }
          halfStar={<Icon name="star-half" style={[styles.myStarStyle]} />}
        />
        <View style={styles.textInputContainer}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Leave Feedback"
            onChangeText={(userText) => setFeedback(userText)}
          />
        </View>

        <Button style={styles.buttonStyle} onPress={() => endRide()}>
          <Text>Drop Bike Here</Text>
        </Button>
        <Button style={styles.buttonStyle} onPress={() => navigation.goBack()}>
          <Text>Keep Riding!</Text>
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
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
    borderRadius: 5,
    marginHorizontal: 15,
    // allow TextInput and icon to show up on same line
    flexDirection: 'row',
  },
  buttonStyle: {
    margin: 10,
  },
});

DropOffSubmit.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
    navigate: PropTypes.string.isRequired,
    goBack: PropTypes.string.isRequired,
  }).isRequired,
};

export default DropOffSubmit;
