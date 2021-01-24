import React, { FormEvent, useCallback, useRef } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, Platform, View, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles';
import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { FormHelpers } from '@unform/core';
import getValidationErros from '../../utils/getValidationErros';
import { useAuth } from '../../hooks/auth';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const formRef = useRef<FormHandles>(null);
  const { singIn } = useAuth();
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const handleSignIn = useCallback(
    async (data: SignInFormData, _helpers: FormHelpers, _event?: FormEvent) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um email valido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, { abortEarly: false });

        await singIn({ email: data.email, password: data.password });

        // navigation.navigate('/Menu');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErros(error);
          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert('Erro na autenticação !', 'Ocorreu um erro ao fazer login, cheque as credenciais');
      }
    }, [singIn]);

  return (<>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
      <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flex: 1 }}>
        <Container>
          <Image source={logoImg} />

          <View>
            <Title>Faça seu logon</Title>
          </View>

          <Form onSubmit={handleSignIn} ref={formRef} style={{ width: '100%' }}>
            <Input
              name='email'
              icon='mail'
              placeholder='E-mail'
              autoCorrect={false}
              autoCapitalize='none'
              keyboardType='email-address'
              returnKeyType='next'
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />

            <Input
              ref={passwordInputRef}
              name='password'
              icon='lock'
              placeholder='Senha'
              secureTextEntry
              returnKeyType='send'
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }} />

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


