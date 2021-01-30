import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, Text } from 'native-base';
import Bike from '../../models/Bike';
import BrowseBikesListItem from './BrowseBikesListItem';
import { kmToMile } from '../../utility/distanceConversion';

const BrowseBikesList = ({bikes, searchRadiusKm}) => {
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
                    <Text>There are no bikes within the {kmToMile(searchRadiusKm)} mile search range.</Text>
                </ListItem>
            </List>
        )
    }

    return (
        <List>
            {
                bikes.map(bike => {
                    if (!bike.getCheckedOut()) {
                        return (
                        <BrowseBikesListItem bike={bike} />
                        );
                    }
                    return null;
                })
            }
        </List>
    )
}

BrowseBikesList.propTypes = {
    bikes: PropTypes.arrayOf(PropTypes.instanceOf(Bike)).isRequired,
    searchRadiusKm: PropTypes.number.isRequired
}

export default BrowseBikesList
