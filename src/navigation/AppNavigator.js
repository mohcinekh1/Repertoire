import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactsListScreen from '../screens/ContactsListScreen';
import AddContactScreen from '../screens/AddContactScreen';
import ContactDetailsScreen from '../screens/ContactDetailsScreen';
import EditContactScreen from '../screens/EditContactScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ContactsList" component={ContactsListScreen} />
            <Stack.Screen name="AddContact" component={AddContactScreen} />
            <Stack.Screen name="ContactDetails" component={ContactDetailsScreen} />
            <Stack.Screen name="EditContact" component={EditContactScreen} />
        </Stack.Navigator>
    );
}