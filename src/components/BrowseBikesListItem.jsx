import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Grid,
  Icon,
  ListItem,
  Right,
  Row,
  Thumbnail,
  Text,
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import Bike from '../models/Bike';
import { kmToMile } from '../utility/distanceConversion';
import globalStyles from '../styles/styles';

// Pic -> Frame -> Style -> Distance (miles) -> rating -> next icon
// Incorporate Listitem Selected later
const BrowseBikesListItem = ({ bike, navigation, selectedBikeID, setSelectedBikeID }) => (
  <ListItem
    keyExtractor={{ item: bike, index: bike.id }}
    selected={bike.id === selectedBikeID}
  >
    <Grid style={{ flex: 1 }}>
      <Row>
        <Col>
          <TouchableOpacity onPress={() => {setSelectedBikeID(bike.id); }}>
            <Thumbnail circle source={{ uri: bike.picUrl }} />
          </TouchableOpacity>
        </Col>
        <Col>
          <TouchableOpacity onPress={() => {setSelectedBikeID(bike.id); }}>
            <Text>Frame</Text>
            <Text note>{bike.frame}</Text>
          </TouchableOpacity>
        </Col>
        <Col>
          <TouchableOpacity onPress={() => {setSelectedBikeID(bike.id); }}>
            <Text>Style</Text>
            <Text note>{bike.style}</Text>
          </TouchableOpacity>
        </Col>
        <Col>
          <TouchableOpacity onPress={() => {setSelectedBikeID(bike.id); }}>
            <Text>Distance</Text>
            <Text note>{kmToMile(bike.distance).toFixed(1)} mi</Text>
          </TouchableOpacity>
        </Col>
      </Row>
    </Grid>
    <Right>
      <Button
        transparent
        iconRight
        onPress={() => navigation.push('BikeDetails', { bike: { bike } })}
      >
        <Icon type="MaterialIcons" name="navigate-next" style={globalStyles.listNextIcon} />
      </Button>
    </Right>
  </ListItem>
);

BrowseBikesListItem.propTypes = {
  bike: PropTypes.instanceOf(Bike).isRequired,
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  selectedBikeID: PropTypes.string.isRequired,
  setSelectedBikeID: PropTypes.func.isRequired
};

export default BrowseBikesListItem;
