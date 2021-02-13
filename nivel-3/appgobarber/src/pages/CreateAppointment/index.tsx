import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import DateTimePicker, { AndroidEvent } from '@react-native-community/datetimepicker';

import {
  Container, Header, BackButton, HeaderTitle, UserAvatar, Content,
  ProvidersListContainer, ProvidersList, ProviderContainer,
  ProviderAvatar, ProviderName, Calendar, Title, OpenDatePickerButton, OpenDatePickerButtonText,
  Schedule, Section, SectionTitle, SectionContent, Hour, HourText
} from './styles';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { Platform } from 'react-native';
import { date } from 'yup/lib/locale';
import { format } from 'date-fns';

interface RouteParms {
  providerId: string;
}

interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface IAvailabiltyItem {
  hour: number;
  available: boolean;
}
const CreateAppointment = () => {
  const { user } = useAuth();
  const route = useRoute();
  const { goBack } = useNavigation();
  const routeParams = route.params as RouteParms;

  const [availability, setAvailability] = useState<IAvailabiltyItem[]>([]);
  const [providers, setproviders] = useState<Provider[]>([])
  const [selectedProvider, setSelectedProvider] = useState(routeParams.providerId);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedHour, setSelectedHour] = useState<number>(0);


  useEffect(() => {
    api.get('providers').then(response => {
      setproviders(response.data);
    })
  }, []);

  useEffect(() => {
    api.get(`/providers/${selectedProvider}/day-availability`, {
      params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate()
      }
    }).then(response => {
      setAvailability(response.data);
    })
  }, [selectedDate, selectedProvider]);


  const navigateBack = useCallback(() => {
    goBack()
  }, [goBack]);

  const handleSelectProviderId = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, [])

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((state) => !state);
  }, []);

  const handleDateChanged = useCallback((_event: AndroidEvent, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (date) {
      setSelectedDate(date);
    }
  }, []);

  const morningAvailability = useMemo(() => {
    return availability.filter(({ hour }) => hour < 12)
      .map(({ available, hour }) =>
      ({
        hour,
        available,
        hourFormatted: format(new Date().setHours(hour), 'HH:00')
      }));
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability.filter(({ hour }) => hour >= 12)
      .map(({ available, hour }) =>
      ({
        hour,
        available,
        hourFormatted: format(new Date().setHours(hour), 'HH:00')
      }));
  }, [availability]);

  const handleSelected = useCallback((hour: number) => {
    setSelectedHour(hour)
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={() => { navigateBack() }}>
          <Icon name='chevron-left' size={24} color='#999591' />
        </BackButton>
        <HeaderTitle>Cabelereiro</HeaderTitle>
        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <Content>
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

        <Calendar>
          <Title>Escolha a data</Title>
          <OpenDatePickerButton onPress={handleToggleDatePicker}>
            <OpenDatePickerButtonText>Selecionar outra data </OpenDatePickerButtonText>
          </OpenDatePickerButton>
          {showDatePicker && (<DateTimePicker
            {...(Platform.OS === 'ios' && { textColor: '#f4ede8' })}
            mode="date"
            display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
            value={selectedDate}
            onChange={handleDateChanged}
          />)}
        </Calendar>

        <Schedule>
          <Title>Escolha o horário</Title>

          <Section>
            <SectionTitle>Manhã</SectionTitle>
            <SectionContent>
              {morningAvailability.map(({ hour, hourFormatted, available }) =>
              (<Hour
                key={hourFormatted}
                selected={selectedHour === hour}
                enabled={available}
                available={available}
                onPress={() => handleSelected(hour)}
              >
                <HourText selected={selectedHour === hour}>
                  {hourFormatted}
                </HourText>
              </Hour>))}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Tarde</SectionTitle>
            <SectionContent>
              {afternoonAvailability.map(({ hourFormatted, available, hour }) =>
              (<Hour
                key={hourFormatted}
                selected={selectedHour === hour}
                enabled={available}
                available={available}
                onPress={() => handleSelected(hour)}>
                <HourText selected={selectedHour === hour}>
                  {hourFormatted}
                </HourText>
              </Hour>))}
            </SectionContent>
          </Section>
        </Schedule>
      </Content>
    </Container>
  )
}

export default CreateAppointment

