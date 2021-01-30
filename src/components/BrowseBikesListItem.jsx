import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Text } from 'native-base';
import Bike from '../../models/Bike';

const BrowseBikesListItem = ({bike}) => (
    <ListItem>
        <Text>{bike.name}</Text>
    </ListItem>
)

BrowseBikesListItem.propTypes = {
    bike: PropTypes.instanceOf(Bike).isRequired,
}

export default BrowseBikesListItem
