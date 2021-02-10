import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container, Header, BackButton, HeaderTitle, UserAvatar,
  ProvidersListContainer, ProvidersList, ProviderContainer,
  ProviderAvatar, ProviderName
} from './styles';
import { Provider } from '../Dashboard';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface RouteParms {
  providerId: string;
}


const CreateAppointment = () => {
  const { user } = useAuth();
  const route = useRoute();
  const { goBack } = useNavigation();
  const routeParams = route.params as RouteParms;

  const [providers, setproviders] = useState<Provider[]>([])
  const [selectedProvider, setSelectedProvider] = useState(routeParams.providerId);


  useEffect(() => {
    api.get('providers').then(response => {
      setproviders(response.data);
    })
  }, [])

  const navigateBack = useCallback(() => {
    goBack()
  }, [goBack]);

  const handleSelectProviderId = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, [])

  return (
    <Container>
      <Header>
        <BackButton onPress={() => { navigateBack() }}>
          <Icon name='chevron-left' size={24} color='#999591' />
        </BackButton>
        <HeaderTitle>Cabelereiro</HeaderTitle>
        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={provider => provider.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer selected={provider.id === selectedProvider} onPress={() => handleSelectProviderId(provider.id)}>
              <ProviderAvatar source={{ uri: provider.avatar_url }} />
              <ProviderName selected={provider.id === selectedProvider}>{provider.name}</ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>
    </Container>
  )
}

export default CreateAppointment
