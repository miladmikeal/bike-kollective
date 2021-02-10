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
import Bike from '../models/Bike';
import { kmToMile } from '../../utility/distanceConversion';
import globalStyles from '../styles/styles';

// Pic -> Frame -> Style -> Distance (miles) -> rating -> next icon
// Incorporate Listitem Selected later
const BrowseBikesListItem = ({ bike, navigation }) => (
  <ListItem keyExtractor={{ item: bike, index: bike.id }}>
    <Grid>
      <Row>
        <Col>
          <Thumbnail circle source={{ uri: bike.picUrl }} />
        </Col>
        <Col>
          <Text>Frame</Text>
          <Text note>{bike.frame}</Text>
        </Col>
        <Col>
          <Text>Style</Text>
          <Text note>{bike.style}</Text>
        </Col>
        <Col>
          <Text>Distance</Text>
          <Text note>{kmToMile(bike.distance).toFixed(1)} mi</Text>
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
};

export default BrowseBikesListItem;
