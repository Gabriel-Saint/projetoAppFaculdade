import React, { useState } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import { Picker } from "@react-native-picker/picker";


const genres = [
  "Ação",
  "Comédia",
  "Drama",
  "Ficção Científica",
  "Terror",
  "Romance",
  "Aventura",
  "Animação",
];

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [movieCount, setMovieCount] = useState(3);
  const [movies, setMovies] = useState<{ id: string; title: string }[]>([]);
  
  const fetchMovies = () => {
    if (!selectedGenre) return;
    
    // Simulação de busca de filmes (substituir por chamada à API no futuro)
    const fakeMovies = Array.from({ length: movieCount }, (_, i) => ({
      id: i.toString(),
      title: `${selectedGenre} Movie ${i + 1}`,
    }));

    setMovies(fakeMovies);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Escolha um gênero</Text>
      <FlatList
        data={genres}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.genreItem, selectedGenre === item && styles.selectedGenre]}
            onPress={() => setSelectedGenre(item)}
          >
            <Text style={styles.genreText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.text}>Quantidade de filmes</Text>
      <Picker
        selectedValue={movieCount}
        onValueChange={(value) => setMovieCount(value)}
        style={styles.picker}
      >
        {[...Array(8)].map((_, i) => (
          <Picker.Item key={i} label={`${i + 3}`} value={i + 3} />
        ))}
      </Picker>
      <TouchableOpacity style={styles.button} onPress={fetchMovies}>
        <Text style={styles.buttonText}>Buscar Filmes</Text>
      </TouchableOpacity>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.movieItem}>{item.title}</Text>}
      />
    </View>
  );
}
