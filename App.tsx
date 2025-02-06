
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/pages/login/index";
import CreateAccount from "./src/pages/newUser/CreateAccount";
import { AuthProvider } from "./src/viewmodels/AuthViewModel"; 
import { RootStackParamList } from "./src/routes/routes";
import { initializeDatabase } from "./src/database/database";
import Home from "./src/pages/home/home";


const Stack = createStackNavigator<RootStackParamList>();

export default function App() {

  useEffect(() => {
    initializeDatabase(); 
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} /> 
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
