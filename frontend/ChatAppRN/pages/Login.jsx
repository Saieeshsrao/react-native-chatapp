import React, { useContext } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const { loginUser, loginError, loginInfo, updateLoginInfo, isloginLoading } = useContext(AuthContext);

    const handleLogin = () => {
        
        if (loginError?.error) {
            Alert.alert("Error", loginError.message);
        }
        loginUser();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email add"
                keyboardType="email-address"
                onChangeText={(text) => updateLoginInfo({ ...loginInfo, email: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => updateLoginInfo({ ...loginInfo, password: text })}
            />
            <Button title={isloginLoading ? "Loading..." : "Login"} onPress={handleLogin} disabled={isloginLoading} />
            {loginError?.error && <Text style={styles.error}>{loginError.message}</Text>}
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

export default Login;
