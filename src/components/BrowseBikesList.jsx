import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, Text } from 'native-base';
import Bike from '../models/Bike';
import BrowseBikesListItem from './BrowseBikesListItem';

const BrowseBikesList = ({ bikes, searchRadiusMi, navigation, selectedBikeID, setSelectedBikeID }) => {
  // Verify that the query returned at least one open bike
  let availableBikes = 0;
  for (let i = 0; i < bikes.length; i += 1) {
    if (!bikes[i].getCheckedOut()) {
      availableBikes += 1;
      break;
    }
  }

  if (availableBikes === 0) {
    return (
      <List>
        <ListItem>
          <Text>
            There are no bikes within the {searchRadiusMi.toFixed(2)} mile search range that match your filter criteria.
          </Text>
        </ListItem>
      </List>
    );
  }

  return (
    <List>
      {bikes.map((bike) => {
        if (!bike.getCheckedOut()) {
          return <BrowseBikesListItem
            key={bike.getBikeId()}
            bike={bike}
            navigation={navigation}
            selectedBikeID={selectedBikeID}
            setSelectedBikeID={setSelectedBikeID}
          />;
        }
        return null;
      })}
    </List>
  );
};

BrowseBikesList.propTypes = {
  bikes: PropTypes.arrayOf(PropTypes.instanceOf(Bike)).isRequired,
  searchRadiusMi: PropTypes.number.isRequired,
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  selectedBikeID: PropTypes.string.isRequired,
  setSelectedBikeID: PropTypes.func.isRequired
};

export default BrowseBikesList;
