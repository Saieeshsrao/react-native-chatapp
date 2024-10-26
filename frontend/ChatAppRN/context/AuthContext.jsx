import React, { createContext, useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Use AsyncStorage for local storage
import { postRequest } from '../utils/services';
import { baseUrl } from '../utils/services';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem('User');
      setUser(JSON.parse(storedUser));
    };
    fetchUser();
  }, []);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const loginUser = useCallback(async () => {
    setIsLoginLoading(true);
    setLoginError(null);
    
    const response = await postRequest(`${baseUrl}/users/login`, loginInfo);
    console.log("response",response)
    setIsLoginLoading(false);
    if (response.error) {
      return setLoginError(response); 
    }
  
    await AsyncStorage.setItem('User', JSON.stringify(response)); 
    setUser(response);
  }, [loginInfo]);

  const logoutUser = useCallback(async () => {
    await AsyncStorage.removeItem('User'); // Use AsyncStorage
    setUser(null);
  }, []);

  const registerUser = useCallback(async (e) => {
    e.preventDefault();
    setIsRegisterLoading(true);
    setRegisterError(null);
    const response = await postRequest(`${baseUrl}/users/register`, registerInfo);
    setIsRegisterLoading(false);
    if (response.error) {
      return setRegisterError(response);
    }
    await AsyncStorage.setItem('User', JSON.stringify(response)); // Use AsyncStorage
    setUser(response);
  }, [registerInfo]);

  return (
    <AuthContext.Provider value={{
      user,
      registerInfo,
      updateRegisterInfo,
      registerUser,
      registerError,
      isRegisterLoading,
      logoutUser,
      loginUser,
      loginError,
      loginInfo,
      updateLoginInfo,
      isLoginLoading,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
