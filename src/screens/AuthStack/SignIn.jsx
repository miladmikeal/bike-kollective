/* eslint-disable no-shadow */
import React, { useState, useContext } from 'react';
import { Alert, StyleSheet, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Content, Button, Form, Input, Text, H1, View } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { AuthContext } from '../../context/AuthProvider';
import SignInImage from '../../components/SignInImage';
import globalStyles from '../../styles/styles';

const SignIn = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePress = () => {
    if (!email) {
      Alert.alert('Email field is required.');
    }

    if (!password) {
      Alert.alert('Password field is required.');
    }

    login(email, password);
    setEmail('');
    setPassword('');
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View>
        <ScrollView style={globalStyles.formContainer} onBlur={Keyboard.dismiss}>
          <Content style={styles.content}>
            <Text styles={styles.row}>
              <Text style={styles.bike}>Bike</Text>
              <Text style={styles.kollective}>Kollective</Text>
            </Text>
            <H1 style={styles.instructions}>Sign in to your account:</H1>
            <Form>
              <Input
                placeholder="Enter your email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                autoCapitalize="none"
              />
              <Input
                placeholder="Enter your password"
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry
              />
              <Button block onPress={handlePress}>
                <Text>Submit</Text>
              </Button>
            </Form>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpLink}>Need an account? Sign Up</Text>
            </TouchableOpacity>
            <SignInImage />
          </Content>
        </ScrollView>
        
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 5
  },
  row: {
    margin: 20,
    padding: 30,
  },
  bike: {
    fontSize: 38,
    color: '#64B5F6',
    textAlign: 'center'
  },
  kollective: {
    fontSize: 38,
    color: '#2196F3'
  },
  instructions: {
    marginTop: 25
  },
  signUpLink: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 18,
    color: '#2196F3'
  }
});

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignIn;
