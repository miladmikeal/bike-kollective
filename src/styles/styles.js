import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  formContainer: {
    marginVertical: '25%',
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
  },
  // For text input
  inputStyle: {
    flex: 1,
    fontSize: 18,
  },
  // Container/styling for text input above
  textInputContainer: {
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: '#F0EEEE',
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    // allow TextInput and icon to show up on same line
    flexDirection: 'row',
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
  addBikeInfoView: {
    width: '90%',
    alignSelf: 'center'
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
  cancelButton: {
    alignSelf: 'center',
    flex: 1,
    width: '90%',
    margin: 5,
    padding: 10,
    borderRadius: 4,
    textAlign: 'center',
    backgroundColor: 'red'
  },
  addBikeErrorText: {
    width: '90%',
    alignSelf: 'center',
    color: 'red'
  },
  addBikeSubmitImage: {
    width: 567*0.6,
    height: 450*0.6,
    alignSelf: 'center',
  },
  mapContainer: {
    flex: 1
  }
});

export default globalStyles;