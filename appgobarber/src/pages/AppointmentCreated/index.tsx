import React, { useCallback, useMemo } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import ptBR from 'date-fns/locale/pt-BR';

import { Container, Description, OkButton, OkButtonText, Title } from './styles';
import { format } from 'date-fns';

interface RouteParams {
  date: number;
}

const CreateAppointmentCreated = () => {
  const { reset } = useNavigation();
  const { params } = useRoute();

  const routeParams = params as RouteParams;


  const handleOkPressed = useCallback(() => {
    reset({ routes: [{ name: 'Dashboard' }], index: 0 });
  }, [reset]);

  const formattedDate = useMemo(() => {
    return format(routeParams.date, "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'", { locale: ptBR })
  }, [routeParams]);

  return (
    <Container>
      <Icon name='check' size={80} color='#04d361' />
      <Title>Agendamento concluído</Title>
      <Description>{formattedDate}</Description>
      <OkButton onPress={handleOkPressed}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  )
}

export default CreateAppointmentCreated
