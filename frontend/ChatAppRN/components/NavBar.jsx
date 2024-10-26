import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Notification from './chat/Notification';
import { useNavigation } from '@react-navigation/native';

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      <Text style={styles.title}>ChatApp</Text>
      {user && <Text style={styles.loggedInText}>Logged in as {user.name}</Text>}
      <View style={styles.navItems}>
        {user ? (
          <>
            <Notification />
            <TouchableOpacity onPress={() => { logoutUser(); navigation.navigate('Login'); }}>
              <Text style={styles.link}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}>Register</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#343a40', // Dark color for the navbar
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
  },
  loggedInText: {
    color: '#ffc107', // Warning color
  },
  navItems: {
    flexDirection: 'row',
    gap: 10, // Similar to Bootstrap's Stack
  },
  link: {
    color: '#fff', // Link color
    textDecorationLine: 'underline',
  },
});

export default NavBar;
