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
});

export default globalStyles;
