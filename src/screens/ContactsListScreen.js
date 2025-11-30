import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useContacts } from '../context/ContactsContext';
import ContactItem from '../components/ContactItem';
import EmptyState from '../components/EmptyState';

export default function ContactsListScreen({ navigation }) {
    const { contacts } = useContacts();
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const filteredContacts = contacts.filter(contact => {
        const fullName = `${contact.name} ${contact.surname}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
    });

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                {showSearch ? (
                    <View style={styles.searchContainer}>
                        <TouchableOpacity onPress={() => {
                            setShowSearch(false);
                            setSearchQuery('');
                        }}>
                            <MaterialIcons name="arrow-back" size={24} color="#000" />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search contacts..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            autoFocus
                        />
                    </View>
                ) : (
                    <>
                        <Text style={styles.title}>Contacts</Text>
                        <View style={styles.headerIcons}>
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() => setShowSearch(true)}
                            >
                                <MaterialIcons name="search" size={24} color="#000" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconButton}>
                                <MaterialIcons name="more-vert" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>

            {contacts.length === 0 ? (
                <EmptyState />
            ) : (
                <FlatList
                    data={filteredContacts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ContactItem
                            contact={item}
                            onPress={() => navigation.navigate('ContactDetails', { contact: item })}
                        />
                    )}
                />
            )}

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddContact')}
            >
                <MaterialIcons name="add" size={28} color="#FFF" />
            </TouchableOpacity>
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
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        marginLeft: 16,
        fontSize: 16,
    },
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#00B0FF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
});