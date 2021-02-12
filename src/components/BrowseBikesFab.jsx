import React, { useState } from 'react';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import { Button, Fab, Icon } from 'native-base';
import { getBikesWithinRadius } from '../api/bikes';

const BrowseBikesFab = ({ centerPoint, radiusKm, setData, setErr, setModalVisible }) => {
  const [fabActive, setFabActive] = useState(false);

  return (
    <Fab
      active={fabActive}
      direction='left'
      position='bottomRight'
      containerStyle={{}}
      onPress={() => { setFabActive(!fabActive); }}
    >
      <Icon type='MaterialIcons' name='more-horiz'/>

      <Button onPress={() => {setModalVisible(true); }}>
        <Icon type='MaterialIcons' name='filter-alt'/>
      </Button>

      <Button onPress={() => {
        getBikesWithinRadius(centerPoint, radiusKm)
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
  radiusKm: PropTypes.number.isRequired,
  setData: PropTypes.func.isRequired,
  setErr: PropTypes.func.isRequired,
  setModalVisible: PropTypes.func.isRequired
};

export default BrowseBikesFab;
