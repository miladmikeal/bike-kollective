import React from 'react';
import { registerRootComponent } from 'expo';
import {
  Container,
  Header,
  Body,
  Title,
  Left,
  Right,
  Icon,
  Content,
  Text,
  Button,
  Footer,
  FooterTab
} from 'native-base';
// eslint-disable-next-line import/no-unresolved
import { TEST_VAR } from '@env';

const App = () => (
  <Container>
    <Header color="primary">
      <Left>
        <Icon name='menu' />
      </Left>
      <Body>
        <Title>BikeKollective</Title>
      </Body>
      <Right />
    </Header>
    <Content>
      <Text>{TEST_VAR}</Text>
      <Text>Hot reload test</Text>
    </Content>
    <Footer>
      <FooterTab>
        <Button full>
          <Text>Footer</Text>
        </Button>
      </FooterTab>
    </Footer>
  </Container>
);

export default registerRootComponent(App);
