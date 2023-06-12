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
} from "react-native-web";
import * as SQLite from 'expo-sqlite';
  


export default function Atividades() {

  // persistir dados no sqlite
  const db = SQLite.openDatabase('database.db');

  const criarTabela = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS atividades (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, tempo INTEGER, data TEXT);',
        [],
        (_, result) => {
          console.log('Tabela criada com sucesso!');
        },
        (_, error) => {
          console.log('Erro ao criar tabela:', error);
        }
      );
    });
  };

  // criar tabela somente se não existir
  if (!db){
    criarTabela();
  }

  // Chame a função criarTabela em algum ponto do seu código para criar a tabela no banco de dados.

  const escreverDados = (atividades) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO atividades (nome, tempo, data) VALUES (?, ?, ?);',
        [atividades.nome, atividades.tempo, atividades.data],
        (_, result) => {
          console.log('Dados salvos com sucesso!');
        },
        (_, error) => {
          console.log('Erro ao salvar dados:', error);
        }
      );
    });
  };

  const lerDados = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM atividades;',
        [],
        (_, { rows: { _array } }) => {
          console.log('Dados lidos com sucesso!');
          return _array;
        },
        (_, error) => {
          console.log('Erro ao ler dados:', error);
          return [];
        }
      );
    });
  };

  // Inicialize as atividades lendo do arquivo JSON
  const [atividades, setAtividades] = useState(lerDados());
  const [nome, setNome] = useState('');
  const [tempo, setTempo] = useState(0);
  const [data, setData] = useState('');

  const adicionarAtividade = () => {
    const novaAtividade = { id: Math.random(), nome, tempo, data };
    const novasAtividades = Array.isArray(atividades) ? [...atividades, novaAtividade] : [novaAtividade];
    setAtividades(novasAtividades);
    escreverDados(novasAtividades); // Grava as atividades no arquivo JSON
  };

  const removerAtividade = (id) => {
    const novasAtividades = Array.isArray(atividades) ? atividades.filter((atividade) => atividade.id !== id) : [];
    setAtividades(novasAtividades);
    escreverDados(novasAtividades); // Grava as atividades no arquivo JSON
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome da atividade"
          onChangeText={(text) => setNome(text)}
          value={nome}
        />
        <TextInput
          style={styles.input}
          placeholder="Tempo (minutos)"
          onChangeText={(text) => setTempo(text)}
          value={tempo}
        />
        <TextInput
          style={styles.input}
          placeholder="Data (dd/mm/aaaa)"
          onChangeText={(text) => setData(text)}
          value={data}
        />
        <View style={styles.botao}>
          <Button title="Adicionar" onPress={adicionarAtividade} />
        </View>
      </View>
      <View style={styles.lista}>
        <FlatList
          data={atividades}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.nome}</Text>
              <Text style={styles.itemText}>{item.tempo} minutos</Text>
              <Text style={styles.itemText}>{item.data}</Text>
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