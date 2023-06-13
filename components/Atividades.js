/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
// Criar aplicativo expo que registra atividades esportivas e que ajude a acompanhar o progresso do usuário e treinos.
// Registra atividades esportivas  

import { useState } from "react";
import { 
  View, 
  StyleSheet, 
  TextInput, 
  Button,
  FlatList,
  Text
} from "react-native";

import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import database from '../config/firebaseconfig';
import { useEffect } from "react";
import { addDoc } from "firebase/firestore";
  
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
  
  
  // adiciona atividade no firebase e atualiza a lista
  const adicionarAtividade = async () => {
    const db = getFirestore();
    const atividadesCol = collection(db, 'atividades');
    const payload = { nome, percurso, tempo_min };

    const docRef = await addDoc(atividadesCol, payload);
    const newAtividade = { ...payload, id: docRef.id };
    setAtividades([...atividades, newAtividade]);
  }

  // remove atividade do firebase e atualiza a lista
  const removerAtividade = async (id) => {
    const db = getFirestore();
    const atividadesCol = collection(db, 'atividades');
    await atividadesCol.doc(id).delete();
    const newAtividades = atividades.filter(atividade => atividade.id !== id);
    setAtividades(newAtividades);
  }




  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Atividades</Text>
        <Text style={styles.subtitulo}>Registre suas atividades</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome da atividade"
          onChangeText={(text) => setNome(text)}
          value={nome}
        />
        <TextInput
          style={styles.input}
          placeholder="Percurso em minutos"
          keyboardType="numeric"
          onChangeText={(text) => setPercurso(Number(text))}
          value={percurso}
        />
        <TextInput
          style={styles.input}
          placeholder="Tempo em minutos"
          keyboardType="numeric"
          onChangeText={(text) => setTempo_min(Number(text))}
          value={tempo_min}
        />
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
              <Text style={styles.itemText}>{item.nome}</Text>
              <Text style={styles.itemText}>{item.percurso} minutos</Text>
              <Text style={styles.itemText}>{item.tempo_min}</Text>
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