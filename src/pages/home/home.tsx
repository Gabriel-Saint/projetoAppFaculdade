import React, { useState } from "react";
import { Text, View, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { styles } from "./styles";

const API_KEY = ""; 

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
}

interface MovieDetails {
  Title: string;
  Year: string;
  imdbRating: string;
  Genre: string;
  Director: string;
  Plot: string;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [movies, setMovies] = useState<Movie[]>([]); 
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);

  // Buscar filmes na API
  const fetchMovies = async () => {
    if (!searchTerm) return;
    setLoading(true);
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`);
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
        setSelectedMovie(null);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
    setLoading(false);
  };

  // Buscar detalhes do filme
  const fetchMovieDetails = async (imdbID: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
      const data = await response.json();
      setSelectedMovie(data);
    } catch (error) {
      console.error("Erro ao buscar detalhes do filme:", error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Busque um filme</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o nome do filme..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={fetchMovies}
      />

      <TouchableOpacity style={styles.button} onPress={fetchMovies}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#3498db" />}

      {selectedMovie ? (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>{selectedMovie.Title}</Text>
          <Text style={styles.detailsText}>📅 Ano: {selectedMovie.Year}</Text>
          <Text style={styles.detailsText}>⭐ IMDb: {selectedMovie.imdbRating}</Text>
          <Text style={styles.detailsText}>🎭 Gênero: {selectedMovie.Genre}</Text>
          <Text style={styles.detailsText}>🎬 Diretor: {selectedMovie.Director}</Text>
          <Text style={styles.detailsText}>📝 Sinopse: {selectedMovie.Plot}</Text>
          <TouchableOpacity style={styles.button} onPress={() => setSelectedMovie(null)}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList<Movie>
          data={movies}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.movieItem} onPress={() => fetchMovieDetails(item.imdbID)}>
              <Text style={styles.movieTitle}>{item.Title} ({item.Year})</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
