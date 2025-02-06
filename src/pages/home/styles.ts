import { Dimensions, StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    },
    text: {
      fontSize: 18,
      fontWeight: "bold",
      marginVertical: 10,
    },
    genreItem: {
      padding: 10,
      marginHorizontal: 5,
      borderRadius: 5,
      backgroundColor: "#ddd",
    },
    selectedGenre: {
      backgroundColor: "#3498db",
    },
    genreText: {
      fontSize: 16,
    },
    picker: {
      height: 50,
      width: 150,
      marginVertical: 10,
    },
    button: {
      backgroundColor: "#3498db",
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    movieItem: {
      fontSize: 16,
      padding: 10,
      marginVertical: 5,
      backgroundColor: "#f0f0f0",
      borderRadius: 5,
    },
  });