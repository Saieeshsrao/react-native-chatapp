import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native'; // For navigation
import { createStackNavigator } from '@react-navigation/stack'; // Stack navigator
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './components/NavBar';
import { AuthContextProvider, AuthContext } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import { NativeBaseProvider } from 'native-base';

const Stack = createStackNavigator();

function App() {
  return (
    <NativeBaseProvider>
    <AuthContextProvider>
      <AuthContext.Consumer>
        {({ user }) => ( // Access user from AuthContext here
          <ChatContextProvider user={user}>
            <NavigationContainer>
              <NavBar />
              <Stack.Navigator>
                {/* If user is logged in, redirect to Chat, otherwise show Login/Register */}
                {!user ? (
                  <>
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                  </>
                ) : (
                  <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </ChatContextProvider>
        )}
      </AuthContext.Consumer>
    </AuthContextProvider>
    </NativeBaseProvider>
  );
}

export default App;
