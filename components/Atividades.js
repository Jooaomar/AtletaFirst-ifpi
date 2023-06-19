/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
// Criar aplicativo expo que registra atividades esportivas e que ajude a acompanhar o progresso do usuário e treinos.
// Registra atividades esportivas  

import { useState } from "react";
import { 
  View, 
  StyleSheet,
  Button,
  FlatList,
  Text
} from "react-native";

import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, query, where } from 'firebase/firestore/lite';
import { useEffect } from "react";
import { Input, CheckIcon, Select, TextArea } from "native-base";
import { getFirebaseConfig } from "../config/firebaseconfig";
import {initializeApp} from "firebase/app";
import DatePicker from 'react-native-datepicker';


const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
  
export default function Atividades() {

  const [atividades, setAtividades] = useState([]);
  // carregar atividades do firebase
  useEffect(() => {
    const loadAtividades = async () => {
      const db = getFirestore();
      const atividadesCol = collection(db, 'atividades');
      const atividadesSnapshot = await getDocs(atividadesCol);
      const atividadesList = atividadesSnapshot.docs.map(doc => doc.data());
      setAtividades(atividadesList);
    }
    loadAtividades();
  }, []);

  // adiciona atividade no firebase
  const [nome, setNome] = useState('');
  const [percurso, setPercurso] = useState('');
  const [tempo_min, setTempo_min] = useState('');
  const [intensidade, setIntensidade] = useState('');
  const [calorias, setCalorias] = useState('');

  

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
        data: new Date()
      }
      await addDoc(atividadesCol, payload);
      // atualizar componente
      const atividadesAtualizadas = [...atividades, payload];
      setAtividades(atividadesAtualizadas);
      // limpar campos
      setNome('');
      setPercurso('');
      setTempo_min('');
      setData('');
    }
    catch (err) {
      console.log(err);
    }
  }

  // remover atividade pelo id
  const removerAtividade = async (id) => {
    try {
      const db = getFirestore();
      const atividadesCol = collection(db, 'atividades');
      const q = query(atividadesCol, where("id", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
      // atualizar componente
      const atividadesAtualizadas = atividades.filter(atividade => atividade.id !== id);
      setAtividades(atividadesAtualizadas);
    }
    catch (err) {
      console.log(err);
    }
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

        <TextArea h={20} placeholder="Anotações"  maxW="600" />

        <Button
          style={styles.botao}
          title="Adicionar"
          onPress={adicionarAtividade}
        />
      </View>
    

      <View style={styles.lista}>
        <FlatList
          data={atividades}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>Praticou: {item.nome}</Text>
              <Text style={styles.itemText}>Percurso: {item.percurso} metros</Text>
              <Text style={styles.itemText}>Tempo: {item.tempo_min} minutos</Text>
              <Text style={styles.itemText}>Data: {item.data.toDate().toLocaleDateString()}</Text>
              <Button
                title="Remover"
                onPress={() => removerAtividade(item.id)}
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
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
});