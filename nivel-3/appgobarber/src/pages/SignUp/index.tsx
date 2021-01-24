import React, { FormEvent, useCallback, useRef } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, Platform, View, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

import * as Yup from 'yup';
import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles, FormHelpers, FormProps, FormProvider } from '@unform/core';
import getValidationErros from '../../utils/getValidationErros';

interface SignUpFormData {
  user: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const handleSignUP = useCallback(
    async (data: SignUpFormData, _helpers: FormHelpers, _event?: FormEvent) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido.'),
          password: Yup.string().required('Senha obrigatória.'),
        });
        await schema.validate(data, { abortEarly: false });

        await api.post('/users', data);

        Alert.alert('Cadastro realizado com sucesso!', 'Você ja pode fazer seu login no GoBarber');

        navigation.goBack();

      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErros(error);
          formRef.current?.setErrors(errors);
          return;
        }
        if (error.response.data) {
          Alert.alert('Erro no cadastro !', error.response.data.message); ''
          return;
        }
        Alert.alert('Erro no cadastro !', 'Ocorreu um erro ao fazer cadastro, tente novamente');
      }
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

