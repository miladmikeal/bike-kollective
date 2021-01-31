/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { Alert, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Container, Content, Button, Text, Form, Item, Input, H1 } from 'native-base';
import PropTypes from 'prop-types';
import { signUp } from '../../api/auth';
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
          <Content>
            <H1>Create an account </H1>

            <Form>
              <Item>
                <Input
                  placeholder="First name*"
                  value={firstName}
                  onChangeText={(firstName) => setFirstName(firstName)}
                />
              </Item>
              <Item>
                <Input
                  placeholder="Last name"
                  value={lastName}
                  onChangeText={(lastName) => setLastName(lastName)}
                />
              </Item>
              <Item>
                <Input
                  placeholder="Enter your email*"
                  value={email}
                  onChangeText={(email) => setEmail(email)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </Item>
              <Item>
                <Input
                  placeholder="Enter your password*"
                  value={password}
                  onChangeText={(password) => setPassword(password)}
                  secureTextEntry
                />
              </Item>
              <Item>
                <Input
                  placeholder="Retype your password to confirm*"
                  value={confirmPassword}
                  onChangeText={(password2) => setConfirmPassword(password2)}
                  secureTextEntry
                />
              </Item>
              <Button block onPress={handlePress}>
                <Text>Sign Up</Text>
              </Button>
            </Form>
            <Text>Already have an account?</Text>
            <Button block transparent onPress={() => navigation.navigate('SignIn')}>
              <Text>Sign In</Text>
            </Button>
          </Content>
        </ScrollView>
      </Container>
    </TouchableWithoutFeedback>
  );
};

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignUp;
