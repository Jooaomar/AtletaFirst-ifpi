import { useState } from "react";
import { 
  View, 
  StyleSheet,
  Button,
  FlatList,
} from "react-native";

import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, query, where, limit } from 'firebase/firestore/lite';
import { useEffect } from "react";
import { Input, CheckIcon, Select, TextArea, Text } from "native-base";
import { getFirebaseConfig } from "../config/firebaseconfig";
import {initializeApp} from "firebase/app";
import { Cronometro } from "./Cronometro";
import { set } from "react-native-reanimated";

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
  
export default function Atividades() {

  const [atividades, setAtividades] = useState([]);

  // Teste

  // End Test

  // adiciona atividade no firebase
  const [nome, setNome] = useState('');
  const [percurso, setPercurso] = useState('');
  const [tempo_min, setTempo_min] = useState('');
  const [intensidade, setIntensidade] = useState('');
  const [calorias, setCalorias] = useState('');
  const [anotacoes, setAnotacoes] = useState('');
  const [data, setData] = useState(new Date());

  // adiciona atividade no firebase e atualiza a lista
  const adicionarAtividade = async () => {
    try {
      const db = getFirestore();
      const atividadesCol = collection(db, 'atividades');
      const novoDocumentoRef = doc(atividadesCol); // Cria uma referência a um novo documento
      // formatar type de dados para envio ao firebase
      const payload = {
        id: novoDocumentoRef.id,
        nome: nome,
        percurso: Number(percurso),
        tempo_min: Number(tempo_min),
        data: gerarDataAtual(),
        calorias: Number(calorias),
        intensidade: Number(intensidade),
        anotacoes: anotacoes
      }
      await addDoc(atividadesCol, payload);
      // atualizar componente
      const atividadesAtualizadas = [...atividades, payload];
      setAtividades(atividadesAtualizadas);
      // limpar campos
      setNome('');
      setPercurso('');
      setTempo_min('');
      setCalorias('');
      setIntensidade('');
      setAnotacoes('');
    }
    catch (err) {
      console.log(err);
    }
  }

  // Iniciar atividades com cronômetro e geolocalização
  const [fire, setFire] = useState(false);

  // const iniciarAtividade = () => {
  //   // TODO
  //   setFire(true);
  // }

  // parar atividade
  const pararAtividade = () => {
    // TODO

  }

  // pausar atividade
  const pausarAtividade = () => {
    // TODO
  }

  // retomar atividade
  const retomarAtividade = () => {
    // TODO
  }

  

  // gerar data atual
  const gerarDataAtual = () => {
    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth() + 1;
    const ano = dataAtual.getFullYear();
    setData(`${dia}/${mes}/${ano}`); 
    return data;
  }




  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Select minWidth="200" accessibilityLabel="Tipo de modalidade" placeholder="Tipo de modalidade" _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="3" />   
        }} mt={1} onValueChange={nome => setNome(nome)}>
            <Select.Item label="Caminhada" value="Caminhada" />
            <Select.Item label="Corrida" value="Corrida" />
            <Select.Item label="Natação" value="Natação" />
            <Select.Item label="Futebol" value="Futebol" />
        </Select>
        <Input
          placeholder="Percurso em metros"
          onChangeText={setPercurso}
          value={percurso}
        />
        <Input
          placeholder="Tempo em minutos"
          onChangeText={setTempo_min}
          value={tempo_min}
        />

        <Input
          placeholder="Intensidade de 1 a 5"
          onChangeText={setIntensidade}
          value={intensidade}
        />

        <Input
          placeholder="Calorias"
          onChangeText={setCalorias}
          value={calorias}
        />

        <TextArea h={20} placeholder="Anotações" onChangeText={setAnotacoes} value={anotacoes}  maxW="600" />
        
        <Button
          style={styles.botao}
          title="Iniciar"
          onPress={() => setFire(true)}
        />

        <Cronometro isRunning={fire} />

        <Button
          style={styles.botao}
          title="Parar"
          onPress={adicionarAtividade}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  header: {
    padding: 20,
    backgroundColor: "#1E90FF",
    alignItems: "center",
  },
  titulo: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  subtitulo: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  form: {
    padding: 20,
  },
  input: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
  },
  botao: {
    marginBottom: 10,
  },
  lista: {
    padding: 20,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#ccc",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  relogio: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});