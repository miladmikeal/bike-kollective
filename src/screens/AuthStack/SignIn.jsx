/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { Alert, ScrollView, Keyboard } from 'react-native';
import {
  Container,
  Content,
  Button,
  Form,
  Input,
  Text,
  H1,
} from 'native-base';
import PropTypes from 'prop-types';
import { signIn } from '../../api/auth';

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePress = () => {
    if (!email) {
      Alert.alert('Email field is required.');
    }

    if (!password) {
      Alert.alert('Password field is required.');
    }

    signIn(email, password);
    setEmail('');
    setPassword('');
  };

  return (
    <Container>
      <ScrollView onBlur={Keyboard.dismiss}>
        <Content>
          <H1>Sign in to your account:</H1>
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
              <Text>Sumbit</Text>
            </Button>
          </Form>
          <Text>Need an account?</Text>
          <Button block transparent onPress={() => navigation.navigate('SignUp')}>
            <Text>Sign Up</Text>
          </Button>
        </Content>
      </ScrollView>
    </Container>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
}