import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useContacts } from '../context/ContactsContext';

export default function ContactDetailsScreen({ navigation, route }) {
    const { contact } = route.params;
    const { deleteContact } = useContacts();

    const handleDelete = () => {
        Alert.alert(
            'Delete Contact',
            'Are you sure you want to delete this contact?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        deleteContact(contact.id);
                        // Navigation directe vers la liste des contacts (pas goBack)
                        navigation.navigate('ContactsList');
                    },
                },
            ]
        );
    };

    const callHistoryData = [
        { date: 'Apr 27, 14:16', number: contact.phone, status: "Didn't connect", icon: 'call-made' },
        { date: 'Apr 20, 10:35', number: contact.phone, status: 'Rang 5 times', icon: 'call-received' },
        { date: 'Mar 05, 19:23', number: contact.phone, status: 'Outgoing 15 min 12 sec', icon: 'call-made' },
        { date: 'Feb 12, 08:03', number: contact.phone, status: 'Incoming 30 sec', icon: 'call-received' },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Contacts</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.iconButton}>
                        <MaterialIcons name="search" size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <MaterialIcons name="more-vert" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView>
                <View style={styles.profileSection}>
                    <View style={styles.avatarLarge}>
                        <MaterialIcons name="person" size={80} color="#FFF" />
                    </View>

                    <View style={styles.actionIcons}>
                        <TouchableOpacity onPress={handleDelete}>
                            <MaterialIcons name="delete" size={24} color="#000" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('EditContact', { contact })}
                            style={{ marginLeft: 20 }}
                        >
                            <MaterialIcons name="edit" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.contactName}>
                        {contact.name} {contact.surname}
                    </Text>

                    <View style={styles.phoneSection}>
                        <Text style={styles.phoneNumber}>{contact.phone}</Text>
                        <View style={styles.phoneActions}>
                            <TouchableOpacity style={styles.phoneActionButton}>
                                <MaterialIcons name="phone" size={24} color="#FFF" />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.phoneActionButton, styles.messageButton]}>
                                <MaterialIcons name="message" size={24} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.historySection}>
                    <Text style={styles.historyTitle}>Call history</Text>
                    {callHistoryData.map((item, index) => (
                        <View key={index} style={styles.historyItem}>
                            <View style={styles.historyLeft}>
                                <Text style={[
                                    styles.historyDate,
                                    index === 1 && { color: '#F44336' }
                                ]}>
                                    {item.date}
                                </Text>
                                <View style={styles.historyNumber}>
                                    <Text style={styles.historyNumberText}>{item.number}</Text>
                                    <MaterialIcons name={item.icon} size={16} color="#666" />
                                </View>
                            </View>
                            <Text style={styles.historyStatus}>{item.status}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
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
    headerIcons: {
        flexDirection: 'row',
    },
    iconButton: {
        padding: 8,
        marginLeft: 8,
    },
    profileSection: {
        alignItems: 'center',
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    avatarLarge: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#999',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    actionIcons: {
        flexDirection: 'row',
        position: 'absolute',
        right: 16,
        top: 24,
    },
    contactName: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000',
        marginBottom: 16,
    },
    phoneSection: {
        width: '100%',
        paddingHorizontal: 16,
    },
    phoneNumber: {
        fontSize: 18,
        color: '#000',
        marginBottom: 12,
    },
    phoneActions: {
        flexDirection: 'row',
    },
    phoneActionButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    messageButton: {
        backgroundColor: '#FFC107',
    },
    historySection: {
        padding: 16,
    },
    historyTitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    historyItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    historyLeft: {
        flex: 1,
    },
    historyDate: {
        fontSize: 16,
        color: '#000',
        marginBottom: 4,
    },
    historyNumber: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    historyNumberText: {
        fontSize: 14,
        color: '#666',
        marginRight: 4,
    },
    historyStatus: {
        fontSize: 14,
        color: '#666',
        textAlign: 'right',
    },
});