import { useState } from "react";
import { getFirestore, collection, addDoc, doc} from 'firebase/firestore/lite';
import { Input, CheckIcon, Select, TextArea } from "native-base";
import { getFirebaseConfig } from "../config/firebaseconfig";
import {initializeApp} from "firebase/app";
import { View, StyleSheet, Button} from "react-native";
import Cronometro from "./Cronometro";


const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
  
export default function Formulario() {

  const [atividades, setAtividades] = useState([]);

  const [nome, setNome] = useState('');
  const [percurso, setPercurso] = useState('');
  const [tempo_min, setTempo_min] = useState(0);
  const [intensidade, setIntensidade] = useState('');
  const [calorias, setCalorias] = useState('');
  const [anotacoes, setAnotacoes] = useState('');

  // receber estado de Cronometro.js se parou ou não
  // se parou, adicionar atividade
  const [parou, setParou] = useState(false);
  
  

  
  const adicionarAtividade = async () => {
    try {
      const db = getFirestore();
      const atividadesCol = collection(db, 'atividades');
      const novoDocumentoRef = doc(atividadesCol); 
      
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
      
      const atividadesAtualizadas = [...atividades, payload];
      setAtividades(atividadesAtualizadas);
      
      
      setPercurso('');
      setTempo_min('');
      setCalorias('');
      
      setAnotacoes('');
      
    }
    catch (err) {
      console.log(err);
    }
  }

  const gerarDataAtual = () => {
    const dataAtual = new Date();
    return dataAtual;
  }

  const handleMinutos = (minutos) => {
    const newMin = minutos
    setTempo_min(newMin);
    console.log(tempo_min)
  }

  const handleStop = () => {
    setParou(!parou);
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