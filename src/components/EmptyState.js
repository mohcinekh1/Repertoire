import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function EmptyState() {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name="package-variant" size={120} color="#000" />
            <Text style={styles.text}>You have no contacts yet</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    text: {
        marginTop: 20,
        fontSize: 16,
        color: '#999',
    },
});