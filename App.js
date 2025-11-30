import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { ContactsProvider } from './src/context/ContactsContext';

export default function App() {
  return (
    <ContactsProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ContactsProvider>
  );
}