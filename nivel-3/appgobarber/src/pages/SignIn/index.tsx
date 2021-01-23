import React from 'react';
import { View, Text, Image } from 'react-native';
import { Container } from './styles';

import logoImg from '../../assets/logo.png';

const SignIn = () => {
  return (<>
    <Container />
    <View style={{ flex: 1, backgroundColor: '#312e38' }}>
      <Image source={logoImg} />
    </View>
  </>)
}

export default SignIn;
