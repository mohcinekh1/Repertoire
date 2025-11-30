import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function ContactForm({ initialValues = {}, onValuesChange }) {
    const [name, setName] = useState(initialValues.name || '');
    const [surname, setSurname] = useState(initialValues.surname || '');
    const [phone, setPhone] = useState(initialValues.phone || '');

    const handleChange = (field, value) => {
        const updatedValues = { name, surname, phone };
        updatedValues[field] = value;

        if (field === 'name') setName(value);
        if (field === 'surname') setSurname(value);
        if (field === 'phone') setPhone(value);

        if (onValuesChange) {
            onValuesChange(updatedValues);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={(value) => handleChange('name', value)}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Surname"
                    value={surname}
                    onChangeText={(value) => handleChange('surname', value)}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Phone number"
                    value={phone}
                    onChangeText={(value) => handleChange('phone', value)}
                    keyboardType="phone-pad"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 4,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#FFF',
    },
});