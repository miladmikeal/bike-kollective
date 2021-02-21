import React, { useState } from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Container, Content, Icon, Spinner, Text } from 'native-base';
import Stars from 'react-native-stars';
import Bike from '../../models/Bike';
import globalStyles from '../../styles/styles';
import { getBikeRatingCountAndAvg } from '../../api/bikeRatings';
import { getUserComments } from '../../api/userComments';

const BikeDetails = ({ navigation, route }) => {
  const [rating, setRating] = useState();
  const [comments, setComments] = useState();
  const [err, setErr] = useState();

  const bike = route.params.bike.bike;

  let keywordText = '';
  if (bike.keywords.length > 0) {
    keywordText = bike.keywords.replace(',', ' #');
    keywordText = '#'.concat(keywordText);
  } else {
    keywordText = 'None';
  }

  if (!rating) {
    getBikeRatingCountAndAvg(bike.id)
      .then((bikeRating) => setRating(bikeRating))
      .catch((e) => setErr(e));
  }

  if (!comments) {
    getUserComments(bike.id)
      .then((bikeComments) => setComments(bikeComments))
      .catch((e) => setErr(e));
  }

  if (err) {
    return (
      <Container>
        <Text>There was an unexpected error!</Text>
        <Text>{err}</Text>
      </Container>
    );
  }

  if (!rating || !comments) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  console.log(comments);

  return (
    <Container>
      <Content>
        <Image style={styles.img} source={{uri: bike.picUrl}}/>
        <Button
          style={globalStyles.addBikeButton}
          onPress={() => navigation.push('CheckoutConfirmation', { bike })}
        >
          <Text>Check Out</Text>
        </Button>
        <Content style={styles.dataView}>
          <Text style={styles.boldText}>Bike Name</Text>
          <Text style={styles.dataView} note>{bike.name}</Text>
          <Text style={styles.boldText}>Frame Size</Text>
          <Text style={styles.dataView} note>{bike.name}</Text>
          <Text style={styles.boldText}>Distance</Text>
          <Text style={styles.dataView} note>{route.params.distance} miles</Text>
          <Text style={styles.boldText}>Tags</Text>
          <Text style={styles.dataView} note>{keywordText}</Text>
          <Text style={styles.boldText}>Rating ({rating.sample})</Text>
          <Text style={styles.dataView} note>{
            rating.sample > 0 ?
              <Stars
                display={rating.score}
                spacing={4}
                starSize={20}
                count={5}
                fullStar={<Icon name="star" style={[styles.starStyle]} />}
                emptyStar={<Icon name="star-outline" style={[styles.starStyle, styles.emptyStarStyle]} />}
                halfStar={<Icon name="star-half" style={[styles.starStyle]} />}
              />
              :
              'No ratings'
          }</Text>
          <Text style={styles.boldText}>Comments ({comments.length})</Text>
          <Text style={styles.dataView} note>{comments[0]}</Text>
          <Text style={styles.dataView} note>{comments[1]}</Text>
          <Text style={styles.dataView} note>{comments[2]}</Text>
        </Content>
      </Content>
    </Container>
  );
};

BikeDetails.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      bike: PropTypes.shape({
        bike: PropTypes.instanceOf(Bike).isRequired,
      }).isRequired,
      distance: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

const styles = {
  img: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.5, // This assumes the image is going to be landscape to look OK 
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  boldText: {
    fontWeight: 'bold'
  },
  dataView: {
    width: '90%',
    alignSelf: 'center'
  },
  starStyle: {
    color: 'yellow',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  emptyStarStyle: {
    color: 'white',
  },
};

export default BikeDetails;
