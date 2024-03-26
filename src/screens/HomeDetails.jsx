import React, {useContext} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, } from 'react-native';
import themeContext from "../theme/themeContext";

export default function HomeDetails({ route }) {

  const theme = useContext(themeContext);
  
  const { item } = route.params; 
  if (!item) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  // bucles para que salga todo lo que tienen dentro 
  const currenciesName = []
  for (const currency in item.currencies) {
    currenciesName.push(`${item.currencies[currency].name} ${item.currencies[currency].symbol}`);
  }

  const languagesName = []
  for (const language in item.languages) {
    languagesName.push(`${item.languages[language]}`);
  }

  //con esto mostramos los datos de la api en la pantalla de details
  return (
    <ScrollView>
    <View style={styles.column}>
      <Image source={{ uri: item.flags.png }} style={styles.image} resizeMode="contain" />
      <View style={[styles.column]}>
        <Text style={[styles.textCommon, {color: theme.color}]}>{item.name.common}</Text>
        <Text style={[styles.textOfficial, {color: theme.color}]}>{item.name.official}</Text>
        <Text style={[styles.text, {color: theme.color}]}>Capital: {item.capital}</Text>
        <Text style={[styles.text, {color: theme.color}]}>Continente: {item.continents}</Text>
        <Text style={[styles.text, {color: theme.color}]}>Población: {item.population} habitantes</Text>
        <Text style={[styles.text, {color: theme.color}]}>Moneda usada:  {currenciesName.join('\n')}</Text> 
        <Text style={[styles.text, {color: theme.color}]}>Idiomas: {languagesName.join()} </Text>
        <Text style={[styles.text, {color: theme.color}]}>Area: {item.area} km cuadrados</Text>
        <Text style={[styles.text, {color: theme.color}]}>GoogleMaps: {item.maps.googleMaps}</Text>
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 360,
    height: 300,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
  },
  column: {
    flex: 1,
    flexDirection: "column",
    margin: 20,
  },
  text: {
    fontSize: 19,
  },
  textCommon: {
    fontWeight: "bold",
    fontSize: 24
  },
  textOfficial: { 
    fontWeight: "bold", 
    fontSize: 22, 
    marginBottom: 10 },
});