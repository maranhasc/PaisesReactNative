import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { getPaisesAll } from '../services/PaisesAPI';
import Card from '../components/Card';
import { useNavigation } from "@react-navigation/native";
import themeContext from "../theme/themeContext";

const HomeScreen = () => {
  const [paises, setPaises] = useState([]);
  const [currentPais, setCurrentPais] = useState(1);
  const [totalPais, setTotalPais] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const theme = useContext(themeContext);
  const navigation = useNavigation();

  const getPaises = () => {
    getPaisesAll()
      .then(json => {
        // Filtrar los nuevos países para asegurarse de que no haya duplicados
        const nuevosPaises = json.filter(newPais => !paises.some(pais => pais.id === newPais.id));
  
        setPaises(prevPaises => [...prevPaises, ...nuevosPaises]);
        setTotalPais(json.info.count);
      })
      .catch(err => console.log("error", err));
  };

  const handleSearchTermChange = (text) => {
    setSearchTerm(text);
  };

  useEffect(() => {
    getPaises();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.searchContainer}>
        <Image
          source={require('../../img/lupa.png')}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre de país"
          value={searchTerm}
          onChangeText={handleSearchTermChange}
        />
      </View>
     
      <FlatList
        style={styles.list}
        data={paises.filter((pais) =>
          pais.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('HomeDetails', { item: item })}
          >
            <Card key={item.id} item={item} />
          </TouchableOpacity>
        )}
        ListFooterComponent={() => <Text>-- End --</Text>}
        onEndReachedThreshold={0}
        onEndReached={() => {
          if (currentPais < totalPais) {
            getPaises(currentPais + 1);
            setCurrentPais(currentPais + 1);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    width: "100%",
    padding: 10,
    marginTop: 10
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor:"white",
    borderRadius: 5,
    margin: 10,
    padding: 10,
  },
  image: {
    width: 80,
    height: 80
  },
  row: {
    flex: 1,
    flexDirection: "row",
    margin: 10
  },
  column: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  text: {
    fontSize: 18
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  }
});

export default HomeScreen;
