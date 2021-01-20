import { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';
import getValidationErros from '../../utils/getValidationErros';

import { useAuth } from '../../context/AuthContext';

interface SignInFormData {
  email: string;
  password: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const SignIn = () => {
  const formRef = useRef<FormHandles>(null);
  const { singIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um email valido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });
        await schema.validate(data, { abortEarly: false });

        singIn({ email: data.email, password: data.password });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        const errors = getValidationErros(error);
        formRef.current?.setErrors(errors);
      }
    },
    [singIn],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha </a>
        </Form>
        <a href="forgot2">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
