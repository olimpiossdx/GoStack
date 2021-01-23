import React from 'react';
import { View, Text, Image } from 'react-native';
import { Container, Title } from './styles';

import logoImg from '../../assets/logo.png';

const SignIn = () => {
  return (
    <Container>
      <Image source={logoImg} />
      <Title>Faça seu logon</Title>
    </Container>
  )
}

export default SignIn;
