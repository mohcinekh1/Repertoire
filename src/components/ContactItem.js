import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ContactItem({ contact, onPress }) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.avatar}>
                <MaterialIcons name="person" size={32} color="#FFF" />
            </View>
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>
                    {contact.name} {contact.surname}
                </Text>
                <Text style={styles.phone}>{contact.phone}</Text>
            </View>
            <TouchableOpacity style={styles.phoneButton}>
                <MaterialIcons name="phone" size={24} color="#4CAF50" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#999',
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        flex: 1,
        marginLeft: 16,
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
        marginBottom: 2,
    },
    phone: {
        fontSize: 14,
        color: '#666',
    },
    phoneButton: {
        padding: 8,
    },
});