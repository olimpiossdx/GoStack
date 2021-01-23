import React from 'react';
import { Image, KeyboardAvoidingView, ScrollView, Platform, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const navigation = useNavigation();
  return (<>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
      <ScrollView
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{ flex: 1 }}>
        <Container>
          <Image source={logoImg} />
          <View>
            <Title>Crie sua conta</Title>
          </View>
          <Input name='name' icon='user' placeholder='Nome' />
          <Input name='email' icon='mail' placeholder='E-mail' />
          <Input name='password' icon='lock' placeholder='Senha' />
          <Button onPress={() => { console.log('clicou') }} >Cadastrar</Button>
        </Container>
      </ScrollView>
    </ KeyboardAvoidingView>
    <BackToSignIn>
      <Icon name='arrow-left' size={20} color="#ff9000" />
      <BackToSignInText onPress={() => navigation.goBack()}>
        Voltar para logon
      </BackToSignInText>
    </BackToSignIn>
  </>)
}

export default SignUp;

