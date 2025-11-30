import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useContacts } from '../context/ContactsContext';
import ContactForm from '../components/ContactForm';

export default function EditContactScreen({ navigation, route }) {
    const { contact } = route.params;
    const { updateContact } = useContacts();
    const [formValues, setFormValues] = useState({
        name: contact.name,
        surname: contact.surname,
        phone: contact.phone,
    });

    const handleSave = () => {
        if (!formValues.name || !formValues.surname || !formValues.phone) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        // Mettre à jour le contact
        updateContact(contact.id, formValues);

        // Naviguer vers ContactDetails avec les nouvelles données
        navigation.navigate('ContactDetails', {
            contact: {
                ...contact,
                ...formValues
            }
        });
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Edit</Text>
                <TouchableOpacity onPress={handleSave}>
                    <MaterialIcons name="check" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <ContactForm
                initialValues={formValues}
                onValuesChange={setFormValues}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
    },
});