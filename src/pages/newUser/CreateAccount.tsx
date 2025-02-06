import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/routes"; // Adjust the path as necessary
import { useAuth } from "../../viewmodels/AuthViewModel"; 
import { styles } from "./styles";
import { themes } from "../../global/themes";

export default function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { register } = useAuth(); 

  const handleCreateAccount = async () => {
    if (!name || !email || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    const success = await register(name, email, password);
    if (success) {
      alert("Conta criada com sucesso!");
      navigation.navigate("Login"); 
    } else {
      alert("Erro ao criar conta. Tente novamente.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.boxTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={30} color={themes.colors.primary} />
          </TouchableOpacity>
          <Text style={styles.text}>Criar Conta</Text>
        </View>
        <View style={styles.boxMid}>
          <Text style={styles.titleInput}>Nome</Text>
          <View style={styles.boxInput}>
            <TextInput style={styles.input} value={name} onChangeText={setName} />
            <MaterialIcons name="person" size={20} color={themes.colors.gray} />
          </View>
          <Text style={styles.titleInput}>Endereço de e-mail</Text>
          <View style={styles.boxInput}>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} />
            <MaterialIcons name="email" size={20} color={themes.colors.gray} />
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
              <MaterialIcons name={passwordVisible ? "visibility-off" : "visibility"} size={20} color={themes.colors.gray} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.boxBotton}>
          <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
            <Text style={styles.textBotton}>Criar Conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
