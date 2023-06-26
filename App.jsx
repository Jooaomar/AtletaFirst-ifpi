import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Atividades from './components/Atividades';
import Desempenho from './components/Desempenho';
import Registros from './components/Registros';
import { NativeBaseProvider } from 'native-base';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <NativeBaseProvider>
      <Drawer.Navigator useLegacyImplementation>
        <Drawer.Screen name="Atividade" component={Atividades} />
        <Drawer.Screen name="Registros" component={Registros} />
        <Drawer.Screen name="Desempenho" component={Desempenho} />
      </Drawer.Navigator>
    </NativeBaseProvider>
  );
}

export default function App() {

  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
