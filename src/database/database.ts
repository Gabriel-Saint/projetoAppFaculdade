import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync("app_database.db");

export async function initializeDatabase() {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
      );
    `);
    console.log("Tabela 'users' criada com sucesso!");
  } catch (error) {
    console.error("Erro ao criar tabela:", error);
  }
}

export default db;
