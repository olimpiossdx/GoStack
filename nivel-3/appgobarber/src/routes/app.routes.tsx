import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import CreateAppointment from '../pages/CreateAppointment';
import CreateAppointmentCreated from '../pages/AppointmentCreated';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (<App.Navigator screenOptions={{
    headerShown: false,
    cardStyle: { backgroundColor: '#312e38' }
  }} >
    <App.Screen name='Dashboard' component={Dashboard} />
    <App.Screen name='CreateAppointment' component={CreateAppointment} />
    <App.Screen name='CreateAppointmentCreated' component={CreateAppointmentCreated} />

    <App.Screen name='Prile' component={Profile} />
  </App.Navigator>)
}
export default AppRoutes;
