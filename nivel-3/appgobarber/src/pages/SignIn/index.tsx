import React from 'react';
import { Image, KeyboardAvoidingView, ScrollView, Platform, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles';

import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn = () => {
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
            <Title>Faça seu logon</Title>
          </View>
          <Input name='email' icon='mail' placeholder='E-mail' />
          <Input name='password' icon='lock' placeholder='Senha' />
          <Button onPress={() => { console.log('clicou') }} >Entrar</Button>
          <ForgotPassword onPress={() => { console.log('clicou senha') }}>
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPassword>
        </Container>
      </ScrollView>
    </ KeyboardAvoidingView>
    <CreateAccountButton>
      <Icon name='log-in' size={20} color="#ff9000" />
      <CreateAccountButtonText onPress={() => { console.log('criar conta') }}>
        Criar conta
      </CreateAccountButtonText>
    </CreateAccountButton>
  </>)
}

export default SignIn;

