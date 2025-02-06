import React, { createContext, useState, useContext, ReactNode } from "react";
import { addUser, loginUser } from "../services/userServices";
import { User } from "../models/User";

// Tipagem do contexto
interface AuthContextType {
  user: User | null;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
}

// Criando o contexto tipado com valor padrão
const AuthContext = createContext<AuthContextType>({
  user: null,
  register: async () => false,
  login: async () => false,
});

// Provider para o contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Função de registro
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      await addUser(name, email, password);
      return true;
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      return false;
    }
  };

  // Função de login
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const userData = await loginUser(email, password);
      console.log(userData)
      console.log('userData')
      if (userData) {
        setUser(userData);
        return true;
      }
      console.error("Login falhou: Usuário não encontrado ou senha incorreta.");
      return false;
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};