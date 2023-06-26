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



const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
  
export default function Registros() {

  const [atividades, setAtividades] = useState([]);
  const [paginacao, setPaginacao] = useState(2);

  useEffect(() => {
    const loadAtividades = async () => {
      const db = getFirestore();
      const atividadesCol = collection(db, 'atividades');
      const atividadesSnapshot = await getDocs(query(atividadesCol, limit(paginacao)));
      const atividadesList = atividadesSnapshot.docs.map(doc => doc.data());
      setAtividades(atividadesList);
    }
    loadAtividades();
  }, [paginacao]);
  
  const handleLoadMore = () => {
    setPaginacao(prevPaginacao => prevPaginacao + 2);
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
    

      <View style={styles.lista}>
        <FlatList
          data={atividades}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>Praticou: {item.nome}</Text>
              <Text style={styles.itemText}>Percurso: {item.percurso} metros</Text>
              <Text style={styles.itemText}>Tempo: {item.tempo_min} minutos</Text>
              <Text style={styles.itemText}>Intensidade: {item.intensidade}</Text>
              <Text style={styles.itemText}>Calorias: {item.calorias}</Text>
              <Text style={styles.itemText} isTruncated maxW="300" w="80%">
                Anotações: {item.anotacoes}</Text>
              <Button
                title="Remover"
                onPress={() => removerAtividade(item.id)}
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
        <Button onPress={handleLoadMore} title="Ver mais" />

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