import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  formContainer: {
    marginVertical: '25%',
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
  },
  mapContainer: {
    flex: 1,
  },
  currentLocationIcon: {
    color: 'blue',
  },
  listNextIcon: {
    color: 'gray',
  },
  title: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    padding: 15,
    margin: 15
  },
  titleText: {
    color: '#38ACEC',
    fontSize: 24,
  },
  addBikeInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 5,
    fontSize: 18,
    borderRadius: 4,
    width: '90%',
    alignSelf: 'center'
  },
  addBikePickerView: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 0,
    margin: 0,
    fontSize: 18,
    borderRadius: 4,
    width: '90%',
    alignSelf: 'center'
  },
  addBikePicker: {
    padding: 0,
    margin: 0,
    color: 'black'
  },
  addBikeButton: {
    alignSelf: 'center',
    flex: 1,
    width: '90%',
    margin: 5,
    padding: 10,
    borderRadius: 4,
    textAlign: 'center'
  },
  addBikeErrorText: {
    width: '90%',
    alignSelf: 'center',
    color: 'red'
  }
});

export default globalStyles;
