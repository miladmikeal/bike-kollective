import React from 'react';
import PropTypes from 'prop-types';
import {
    Body,
    Button,
    Col,
    Grid,
    Icon,
    ListItem,
    Left,
    Right,
    Row,
    Thumbnail,
    Text
} from 'native-base';
import Bike from '../../models/Bike';
import { kmToMile } from '../../utility/distanceConversion';

// Pic -> Frame -> Style -> Distance (miles) -> rating -> next icon
// Incorporate Listitem Selected later
const BrowseBikesListItem = ({bike, navigation}) => (
    <ListItem>
        <Left>
            <Thumbnail circle source={{ uri: bike.picUrl}} />
        </Left>
        <Body>
            <Grid>
                <Row>
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
                        <Text note>{kmToMile(bike.distance).toFixed(2)} miles</Text>
                    </Col>
                </Row>
            </Grid>
        </Body>
        <Right>
            <Button transparent onPress={() => navigation.push('BikeDetails')}>
                <Icon name='home' />
            </Button>
        </Right>
    </ListItem>
)

BrowseBikesListItem.propTypes = {
    bike: PropTypes.instanceOf(Bike).isRequired,
    navigation: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired
}

export default BrowseBikesListItem
