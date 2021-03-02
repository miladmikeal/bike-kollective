/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { Alert, StyleSheet, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Container, Content, Button, Text, Form, Input, H1 } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { signUp } from '../../api/auth';
import SignUpImage from '../../components/SignUpImage';
import globalStyles from '../../styles/styles';

const SignUp = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emptyState = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handlePress = () => {
    if (!firstName) {
      Alert.alert('First name is required');
    } else if (!email) {
      Alert.alert('Email field is required.');
    } else if (!password) {
      Alert.alert('Password field is required.');
    } else if (!confirmPassword) {
      setPassword('');
      Alert.alert('Confirm password field is required.');
    } else if (password !== confirmPassword) {
      Alert.alert('Password does not match!');
    } else {
      signUp(email, password, lastName, firstName);
      navigation.navigate('BrowseBikes');
      emptyState();
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <Container>
        <ScrollView style={globalStyles.formContainer} onBlur={Keyboard.dismiss}>
          <Content style={styles.content}>
            <Text styles={styles.row}>
              <Text style={styles.bike}>Bike</Text>
              <Text style={styles.kollective}>Kollective</Text>
            </Text>
            <H1 style={styles.instructions}>Create account:</H1>
            <Form>
              <Input
                placeholder="First name*"
                value={firstName}
                onChangeText={(firstName) => setFirstName(firstName)}
              />
              <Input
                placeholder="Last name"
                value={lastName}
                onChangeText={(lastName) => setLastName(lastName)}
              />
              <Input
                placeholder="Enter your email*"
                value={email}
                onChangeText={(email) => setEmail(email)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Input
                placeholder="Enter your password*"
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry
              />
              <Input
                placeholder="Retype your password to confirm*"
                value={confirmPassword}
                onChangeText={(password2) => setConfirmPassword(password2)}
                secureTextEntry
              />
              <Button block onPress={handlePress}>
                <Text>Sign Up</Text>
              </Button>
            </Form>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.signUpLink}>Already have an account? Sign In</Text>
            </TouchableOpacity>
            <SignUpImage />
          </Content>
        </ScrollView>
      </Container>
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

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignUp;
