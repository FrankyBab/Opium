import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';

const BlankPage = () => {
    const [editMode, setEditMode] = useState(false);
    const [user, setUser] = useState({
        emoji: '🙂',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        phone: '+1234567890',
        address: '123 Main St',
        sex: 'Male',
        age: '30',
        height: '175cm',
        weight: '70kg',
        fieldsAdded: 2,
        modifications: 3,
    });

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleInputChange = (field, value) => {
        setUser({...user, [field]: value});
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.card}>
                    <View style={styles.topContainer}>
                        <Avatar
                            size="large"
                            title={user.emoji}
                            containerStyle={styles.avatar}
                        />
                        <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
                    </View>

                    <Text>Fields added: {user.fieldsAdded}</Text>
                    <ProgressBar progress={user.fieldsAdded/10} width={200} color="#4682B4" />

                    <Text>Modifications made: {user.modifications}</Text>
                    <ProgressBar progress={user.modifications/10} width={200} color="#4682B4" />
                </View>

                <View style={styles.card}>
                    <Text>Email:</Text>
                    {editMode ?
                        <TextInput
                            onChangeText={(value) => handleInputChange('email', value)}
                            value={user.email}
                            keyboardType="email-address"
                        /> : <Text>{user.email}</Text>}

                    <Text>Phone:</Text>
                    {editMode ?
                        <TextInput
                            onChangeText={(value) => handleInputChange('phone', value)}
                            value={user.phone}
                            keyboardType="phone-pad"
                        /> : <Text>{user.phone}</Text>}

                    <Text>Gender:</Text>
                    {editMode ?
                        <TextInput
                            onChangeText={(value) => handleInputChange('sex', value)}
                            value={user.sex}
                        /> : <Text>{user.sex}</Text>}

                    <Text>Age:</Text>
                    {editMode ?
                        <TextInput
                            onChangeText={(value) => handleInputChange('age', value)}
                            value={user.age}
                            keyboardType="numeric"
                        /> : <Text>{user.age}</Text>}

                    <Text>Height:</Text>
                    {editMode ?
                        <TextInput
                            onChangeText={(value) => handleInputChange('height', value)}
                            value={user.height}
                            keyboardType="numeric"
                        /> : <Text>{user.height}</Text>}

                    <Text>Weight:</Text>
                    {editMode ?
                        <TextInput
                            onChangeText={(value) => handleInputChange('weight', value)}
                            value={user.weight}
                            keyboardType="numeric"
                        /> : <Text>{user.weight}</Text>}
                </View>

                <View style={styles.card}>
                    <Text>Address:</Text>
                    {editMode ?
                        <TextInput
                            onChangeText={(value) => handleInputChange('address', value)}
                            value={user.address}
                            multiline
                            numberOfLines={4}
                        /> : <Text>{user.address}</Text>}
                </View>

                <Button title={editMode ? "Save" : "Edit"} onPress={toggleEditMode} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 20,
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    avatar: {
        marginRight: 10,
    },
});

export default BlankPage;
