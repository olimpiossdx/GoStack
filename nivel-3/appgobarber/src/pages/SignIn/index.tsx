import React, { FormEvent, useCallback, useRef } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, Platform, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles';
import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { FormHelpers } from '@unform/core';

interface FormProps {
  email: string;
  password: string;
}

const SignIn = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleSignIn = useCallback((data: FormProps, helpers: FormHelpers, event?: FormEvent) => {
    console.log('data', data);
  }, []);

  return (<>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
      <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flex: 1 }}>
        <Container>
          <Image source={logoImg} />

          <View>
            <Title>Faça seu logon</Title>
          </View>

          <Form onSubmit={handleSignIn} ref={formRef} style={{ width: '100%' }}>
            <Input name='email' icon='mail' placeholder='E-mail' />
            <Input name='password' icon='lock' placeholder='Senha' />
            <Button onPress={() => {
              formRef.current?.submitForm();
              }} >Entrar</Button>
          </Form>

          <ForgotPassword onPress={() => { console.log('clicou senha') }}>
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPassword>

        </Container>
      </ScrollView>
    </ KeyboardAvoidingView>
    <CreateAccountButton>
      <Icon name='log-in' size={20} color="#ff9000" />
      <CreateAccountButtonText onPress={() => navigation.navigate('SignUp')}>
        Criar conta
      </CreateAccountButtonText>
    </CreateAccountButton>
  </>)
}

export default SignIn;


