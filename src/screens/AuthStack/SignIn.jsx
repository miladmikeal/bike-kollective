/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { Alert, ScrollView, Keyboard, Image, TouchableWithoutFeedback } from 'react-native';
import { Content, Button, Form, Input, Text, H1, View } from 'native-base';
import PropTypes from 'prop-types';
import { signIn } from '../../api/auth';
import globalStyles from '../../styles/styles';
import bikeKollective from '../../../assets/bikeKollective.png';

const SignIn = ({ navigation }) => {
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
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View>
        <ScrollView style={globalStyles.formContainer} onBlur={Keyboard.dismiss}>
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
        <Image source={bikeKollective} />
      </View>
    </TouchableWithoutFeedback>
  );
};

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignIn;
