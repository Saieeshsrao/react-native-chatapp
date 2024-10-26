import React, { useContext } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
    const { registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading } = useContext(AuthContext);

    const handleRegister = () => {
        if (registerError?.error) {
            Alert.alert("Error", registerError.message);
        } else {
            registerUser();
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={(text) => updateRegisterInfo({ ...registerInfo, name: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={(text) => updateRegisterInfo({ ...registerInfo, email: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => updateRegisterInfo({ ...registerInfo, password: text })}
            />
            <Button title={isRegisterLoading ? "Creating your account..." : "Register"} onPress={handleRegister} disabled={isRegisterLoading} />
            {registerError?.error && <Text style={styles.error}>{registerError.message}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
    },
    title: {
        fontSize: 24,
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 12,
    },
    error: {
        color: "red",
        textAlign: "center",
        marginTop: 12,
    },
});

export default Register;
