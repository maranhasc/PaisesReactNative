import React, {useState, useContext} from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "../theme/themeContext";


export default function SettingsScreen() {
    const theme = useContext(themeContext)
    const [darkMode, setDarkMode] = useState(false);
  

    return(
        <View style={[styles.view, {backgroundColor: theme.backgroundColor}]}>
            <Text style={[styles.text, {color: theme.color}]}>Modo Oscuro</Text>
            <Switch 
                value={darkMode} 
                style={styles.swicth}
                onValueChange={(value) => {
                    setDarkMode(value)
                    EventRegister.emit('ChangeTheme', value)
                    }} />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        
    },
    text: {
        fontSize: 30,
    },
    swicth: {
        marginTop: 10,
        transform: [{scaleX: 1.5}, {scaleY: 1.5}]
    }
  });