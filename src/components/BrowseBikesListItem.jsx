import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Col, Grid, Icon, ListItem, Right, Row, Thumbnail, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import haversine from 'haversine';
import { getBikeRatingCountAndAvg } from '../api/bikeRatings';
import Bike from '../models/Bike';
import globalStyles from '../styles/styles';

// Pic -> Frame -> Style -> Distance (miles) -> rating -> next icon
// Incorporate Listitem Selected later
const BrowseBikesListItem = ({ bike, navigation, selectedBikeID, setSelectedBikeID, location }) => {
  const [rating, setRating] = useState();
  const [err, setErr] = useState();

  useEffect(() => {
    getBikeRatingCountAndAvg(bike.id)
      .then((bikeRating) => {
        setRating(bikeRating.score);
      })
      .catch((e) => setErr(e));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (err) {
    return (
      <Container>
        <Text>There was an unexpected error</Text>
        <Text>{err}</Text>
      </Container>
    );
  }

  return (
    <ListItem keyExtractor={{ item: bike, index: bike.id }} selected={bike.id === selectedBikeID}>
      <Grid style={{ flex: 1 }}>
        <Row>
          <Col>
            <TouchableOpacity
              onPress={() => {
                setSelectedBikeID(bike.id);
              }}
            >
              <Thumbnail circle source={{ uri: bike.picUrl }} />
            </TouchableOpacity>
          </Col>
          <Col>
            <TouchableOpacity
              onPress={() => {
                setSelectedBikeID(bike.id);
              }}
            >
              <Text>Frame</Text>
              <Text note>{bike.frame}</Text>
            </TouchableOpacity>
          </Col>
          <Col>
            <TouchableOpacity
              onPress={() => {
                setSelectedBikeID(bike.id);
              }}
            >
              <Text>Dist</Text>
              <Text note>
                {haversine({ latitude: bike.latitude, longitude: bike.longitude }, location, {
                  unit: 'mile',
                }).toFixed(1)}{' '}
                mi
              </Text>
            </TouchableOpacity>
          </Col>
          <Col>
            <TouchableOpacity
              onPress={() => {
                setSelectedBikeID(bike.id);
              }}
            >
              <Text>Rating</Text>
              {rating ? (
                <Text note>
                  {rating}
                </Text>
              ) : (
                <Text note>
                  None
                </Text>
              )}
            </TouchableOpacity>
          </Col>
        </Row>
      </Grid>
      <Right>
        <Button
          transparent
          iconRight
          onPress={() =>
            navigation.navigate('BikeDetails', {
              bike: { bike },
              distance: haversine({ latitude: bike.latitude, longitude: bike.longitude }, location, {
                unit: 'mile',
              }).toFixed(1),
            })
          }
        >
          <Icon type="MaterialIcons" name="navigate-next" style={globalStyles.listNextIcon} />
        </Button>
      </Right>
    </ListItem>
  );
};

BrowseBikesListItem.propTypes = {
  bike: PropTypes.instanceOf(Bike).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  selectedBikeID: PropTypes.string.isRequired,
  setSelectedBikeID: PropTypes.func.isRequired,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
};

export default BrowseBikesListItem;
