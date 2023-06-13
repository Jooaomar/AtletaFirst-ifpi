/* eslint-disable react/react-in-jsx-scope */
import { View } from "react-native-web";
import {
    LineChart  } from "react-native-chart-kit";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { Select, Center, CheckIcon, Text } from "native-base";
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore/lite';


export default function Desempenho() {
  // eslint-disable-next-line no-unused-vars
  const [atividades, setAtividades] = useState([]);

  const [selectedValue, setSelectedValue] = useState("Corrida");
  
  // buscar dados no firebase com base em selectedValue 

  useEffect(() => {
    const loadAtividades = async () => {
      const db = getFirestore();
      const atividadesCol = collection(db, 'atividades');
      const q = query(atividadesCol, where("nome", "==", selectedValue));
      const atividadesSnapshot = await getDocs(q);
      const atividadesList = atividadesSnapshot.docs.map(doc => doc.data());
      setAtividades(atividadesList);
    }
    loadAtividades();
  }, [selectedValue]);

  return (
    <View>

      <Select selectedValue={selectedValue} minWidth="200" accessibilityLabel="Visualizar modalidade" placeholder="Visualizar modalidade" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="3" />
      }} mt={1} onValueChange={itemValue => setSelectedValue(itemValue)}>
          <Select.Item label="Corrida" value="corrida" />
          <Select.Item label="Natação" value="natação" />
          <Select.Item label="Futebol" value="futebol" />
      </Select>

      <Center>
        <Text>Tempo Gasto</Text>
        <LineChart
          data={{
            // condigurar dados do gráfico
            labels: atividades.map((atividade) => atividade.id),

            datasets: [
              {
                data: atividades.map((atividade) => atividade.tempo_min),
              },
            ],

            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            // yAxisLabel="$"
            yAxisSuffix="mn"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
            }}
            bezier
            style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </Center>
    </View>
  );
}
