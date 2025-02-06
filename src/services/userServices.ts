import db from "../database/database";
import * as Crypto from "expo-crypto";
import { User } from "../models/User";


async function hashPassword(password: string): Promise<string> {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
}

export async function addUser(name: string, email: string, password: string) {
  try {
    const hashedPassword = await hashPassword(password); // Cria o hash da senha

    await db.runAsync(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?);",
      [name, email, hashedPassword]
    );

    console.log("Usuário cadastrado com sucesso!");
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
  }
}

export async function getUsers() {
  try {
    const result = await db.getAllAsync("SELECT * FROM users;");
    return result;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return [];
  }
}

export async function updateUser(id: number, name: string, email: string) {
  try {
    await db.runAsync(
      "UPDATE users SET name = ?, email = ? WHERE id = ?;",
      [name, email, id]
    );
    console.log("Usuário atualizado!");
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
  }
}

export async function deleteUser(id: number) {
  try {
    await db.runAsync("DELETE FROM users WHERE id = ?;", [id]);
    console.log("Usuário deletado!");
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
  }
}

export async function loginUser(email: string, password: string): Promise<User | null> {
  try {
    // Buscar o usuário pelo email
    const users = db.getAllSync<User>("SELECT * FROM users WHERE email = ?;", [email]);
    console.log(users)
    console.log("use")
    
    if (!users || users.length === 0) {
      console.log("Usuário não encontrado!");
      return null;
    }
    
    const user = users[0]; // Acessa o primeiro usuário
    console.log(user)
    
    // Gerar o hash SHA-256 da senha fornecida
    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
    console.log('Senha fornecida hash:', hashedPassword);

    // Comparar o hash da senha fornecida com o hash armazenado
    if (hashedPassword === user.password) {
      console.log("Login bem-sucedido!");
      return user;
    } else {
      console.log("Senha incorreta!");
      return null;
    }
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    return null;
  }
}