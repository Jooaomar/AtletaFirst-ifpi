/* eslint-disable react/react-in-jsx-scope */
import { View } from "react-native-web";
import {
    LineChart  } from "react-native-chart-kit";
import { useState } from "react";
import { Dimensions } from "react-native";
import { Select, Center, CheckIcon, Text } from "native-base";


export default function Desempenho() {
  // eslint-disable-next-line no-unused-vars
  const [atividades, setAtividades] = useState([
      { id: 1, nome: "Corrida", tempo: 30, percurso: 5, data: "2021-07-01" },
      { id: 2, nome: "Natação", tempo: 60, percurso: 1, data: "2021-07-02" },
      { id: 3, nome: "Caminhada", tempo: 45, percurso: 3 , data: "2021-07-03"},
  ]);

  const [selectedValue, setSelectedValue] = useState("Corrida");
  //const [service, setService] = useState("");

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
            labels: atividades.map((atividade) => atividade.data),
            datasets: [
              {
              data: atividades.map((atividade) => atividade.tempo)
              }
            ]
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
