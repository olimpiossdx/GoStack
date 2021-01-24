import React, { FormEvent, useCallback, useRef } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, Platform, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles, FormHelpers, FormProps, FormProvider } from '@unform/core';

interface SignUpProps {
  user: string;
  email: string;
  password: string;
}
const SignUp = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const handleSignUP = useCallback((data: SignUpProps, helpers: FormHelpers, event?: FormEvent) => {
    console.log('data', data);
  }, []);

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

          <Form onSubmit={handleSignUP} ref={formRef} style={{ width: '100%' }}>

            <Input
              autoCapitalize='words'
              name='name'
              icon='user'
              placeholder='Nome'
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />

            <Input
              ref={emailInputRef}
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize='none'
              name='email'
              icon='mail'
              placeholder='E-mail'
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />

            <Input
              ref={passwordInputRef}
              textContentType='newPassword'
              secureTextEntry
              name='password'
              icon='lock'
              placeholder='Senha'
              returnKeyType='send'
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <Button onPress={() => {
              formRef.current?.submitForm();
            }}>Cadastrar</Button>

          </Form>

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

