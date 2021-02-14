import React, { useState } from 'react';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import { Button, Fab, Icon } from 'native-base';
import { getBikesWithinRadius } from '../api/bikes';
import { mileToKm } from '../utility/distanceConversion';

const BrowseBikesFab = ({ centerPoint, radiusMi, setData, setErr, setModalVisible }) => {
  const [fabActive, setFabActive] = useState(false);

  return (
    <Fab
      active={fabActive}
      direction='up'
      position='bottomRight'
      containerStyle={{}}
      onPress={() => { setFabActive(!fabActive); }}
    >
      <Icon type='MaterialIcons' name='more-horiz'/>

      <Button onPress={() => {setModalVisible(true); }}>
        <Icon type='MaterialIcons' name='filter-alt'/>
      </Button>

      <Button onPress={() => {
        getBikesWithinRadius(centerPoint, mileToKm(radiusMi))
          .then((bikes) => {
            setData(bikes);
          })
          .catch((e) => {
            setErr(e);
          });
        
      }}>
        <Icon type='MaterialIcons' name='refresh'/>
      </Button>

    </Fab>
  );
};

BrowseBikesFab.propTypes = {
  centerPoint: PropTypes.instanceOf(firebase.firestore.GeoPoint).isRequired,
  radiusMi: PropTypes.number.isRequired,
  setData: PropTypes.func.isRequired,
  setErr: PropTypes.func.isRequired,
  setModalVisible: PropTypes.func.isRequired
};

export default BrowseBikesFab;
