import React, { FormEvent, useCallback, useRef } from 'react';
import { KeyboardAvoidingView, ScrollView, Platform, View, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Container, Title, BackButton, UserAvatarButton, UserAvatar } from './styles';

import * as Yup from 'yup';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles, FormHelpers, FormProps, FormProvider } from '@unform/core';
import getValidationErros from '../../utils/getValidationErros';
import { useAuth } from '../../hooks/auth';

interface SignUpFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
};

const SignUp = () => {
  const formRef = useRef<FormHandles>(null);
  const { singIn, user, updateUser } = useAuth();
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);
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
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val: string) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val: string) => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Confirmação incorreta.'),
        });

        await schema.validate(data, { abortEarly: false });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;
        const formData = {
          name,
          email,
          ...(data.old_password
            ? {
              old_password,
              password,
              password_confirmation,
            }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        Alert.alert('Perfil atualizado com sucesso!');

        navigation.goBack();

      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErros(error);
          formRef.current?.setErrors(errors);
          return;
        }
        if (error.response.data) {
          Alert.alert('Erro na atualização do perfil !', error.response.data.message); ''
          return;
        }
        Alert.alert('Erro na atualização do perfil !', 'Ocorreu um erro ao atualizar seu perfil, tente novamente');
      }
    }, [navigation]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (<>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
      <ScrollView
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{ flex: 1 }}>
        <Container>

          <BackButton onPress={handleGoBack}>
            <Icon name='chevron-left' size={24} color='#999591' />
          </BackButton>

          <UserAvatarButton>
            <UserAvatar source={{ uri: user.avatar_url }} />
          </UserAvatarButton>

          <View>
            <Title>Meu perfil</Title>
          </View>
          <Form initialData={user} onSubmit={handleSignUP} ref={formRef} style={{ width: '100%' }} >

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
              name='email'
              icon='mail'
              placeholder='E-mail'
              autoCorrect={false}
              autoCapitalize='none'
              keyboardType='email-address'
              returnKeyType='next'
              onSubmitEditing={() => {
                oldPasswordInputRef.current?.focus();
              }}
            />

            <Input
              ref={oldPasswordInputRef}
              name='old_password'
              icon='lock'
              placeholder='Senha atual'
              secureTextEntry
              returnKeyType='next'
              containerStyle={{ marginTop: 16 }}
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }} />

            <Input
              ref={passwordInputRef}
              name='password'
              icon='lock'
              placeholder='Nova senha'
              secureTextEntry
              returnKeyType='next'
              onSubmitEditing={() => {
                confirmPasswordInputRef.current?.focus();
              }} />

            <Input
              ref={confirmPasswordInputRef}
              name='password_confirmation'
              icon='lock'
              placeholder='Confirmar senha'
              secureTextEntry
              returnKeyType='send'
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }} />

            <Button onPress={() => {
              formRef.current?.submitForm();
            }} >Confirmar mudanças</Button>

          </Form>

        </Container>
      </ScrollView>
    </ KeyboardAvoidingView>
  </>)
}

export default SignUp;

