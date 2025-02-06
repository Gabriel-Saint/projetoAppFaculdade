import React, { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { styles } from "./styles";
import Logo from '../../assets/logo.png';
import { MaterialIcons } from '@expo/vector-icons';
import { themes } from "../../global/themes";
import { useAuth } from "../../viewmodels/AuthViewModel";  // Importando o hook de autenticação

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { login } = useAuth();  // Obtendo a função de login do contexto

  const handleLogin = async () => {
    console.log(email,password)
    console.log("email,password")
    const isLoggedIn = await login(email, password);
    if (isLoggedIn) {
      console.log("Login bem-sucedido!");
      // Navegar para a tela do usuário (ou onde for o destino após o login)
      navigation.navigate("Home");  // Supondo que tenha uma tela "Home"
    } else {
      console.log("Login falhou!");
      // Aqui você pode mostrar uma mensagem de erro para o usuário
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.boxTop}>
          <Image source={Logo} />
          <Text style={styles.text}>Bem Vindo</Text>
        </View>
        <View style={styles.boxMid}>
          <Text style={styles.titleInput}>Endereço de e-mail</Text>
          <View style={styles.boxInput}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            <MaterialIcons
              name="email"
              size={20}
              color={themes.colors.gray}
            />
          </View>
          <Text style={styles.titleInput}>Senha</Text>
          <View style={styles.boxInput}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <MaterialIcons
                name={passwordVisible ? "visibility-off" : "visibility"}
                size={20}
                color={themes.colors.gray}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.boxBotton}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text>Entrar</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.textBotton}>
          Não tem conta ?{" "}
          <Text
            style={{ color: themes.colors.primary }}
            onPress={() => navigation.navigate("CreateAccount")}
          >
            Crie Agora
          </Text>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
