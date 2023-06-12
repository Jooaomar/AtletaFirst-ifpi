import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Atividades from './components/Atividades';
import Desempenho from './components/Desempenho';
import { NativeBaseProvider } from 'native-base';
import { useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { useEffect } from 'react';
import { View } from 'native-base';
import Auth from './components/Auth'
import Account from './components/Account'
import { supabase } from './lib/supabase';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <NativeBaseProvider>
      <Drawer.Navigator useLegacyImplementation>
        <Drawer.Screen name="Atividades" component={Atividades} />
        <Drawer.Screen name="Desempenho" component={Desempenho} />
      </Drawer.Navigator>
    </NativeBaseProvider>
  );
}

export default function App() {

  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <NavigationContainer>
      {/* <MyDrawer /> */}
      {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
      
      {/* <View>
        {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
      </View> */}
    </NavigationContainer>
  );
}
