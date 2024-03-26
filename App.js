import { DefaultTheme, NavigationContainer, DarkTheme } from '@react-navigation/native';
import MyTabs from './src/navegation/MyTabs';

import React, {useState, useEffect} from "react";
import { EventRegister } from 'react-native-event-listeners';
import theme from './src/theme/theme';
import themeContext from './src/theme/themeContext';

export default function App() {
  
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const listener = EventRegister.addEventListener('ChangeTheme', (data) =>{
      setDarkMode(data)
      console.log(data) //para ver si es true o false
    })
    return () => {
      EventRegister.removeAllListeners(listener)
    }
  }, [darkMode])

  return (
    <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
      <NavigationContainer 
      theme={darkMode === true ? DarkTheme: DefaultTheme} >
        <MyTabs />
      </NavigationContainer>
    </themeContext.Provider>

  );
}

