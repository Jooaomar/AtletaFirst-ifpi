import { View } from "react-native";
import { LineChart  } from "react-native-chart-kit";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { Select, Center, CheckIcon, Text } from "native-base";
import { getFirestore, collection, getDocs, query, where, limit } from 'firebase/firestore/lite';


export default function Desempenho() {
  
  const [atividades, setAtividades] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [totalTempo, setTotalTempo] = useState(0);
  const [percurso, setPercurso] = useState(0);

  useEffect(() => {
    const loadAtividades = async () => {
      const db = getFirestore();
      const atividadesCol = collection(db, 'atividades');
      
      const q = query(atividadesCol, where("nome", "==", selectedValue), limit(7));

      const atividadesSnapshot = await getDocs(q);

      const atividadesList = atividadesSnapshot.docs.map(doc => doc.data());
      setAtividades(atividadesList)
      totalTempoGasto();
    }
    loadAtividades();
  }, [selectedValue]); 

  useEffect(() => {
    totalTempoGasto();
    totalPercurso();
  }, [atividades]); 

  
  function formatDate(date) {
    const d = new Date(date.seconds * 1000);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function totalTempoGasto() {
    let total = 0;
    atividades.forEach((atividade) => {
      total += atividade.tempo_min;
    });
    setTotalTempo(total);
  }

  
  function totalPercurso() {
    let total = 0;
    atividades.forEach((atividade) => {
      total += atividade.percurso;
    });
    setPercurso(total);
  }

  return (
    <View>
      <Select selectedValue={selectedValue} minWidth="200" accessibilityLabel="Visualizar modalidade" placeholder="Visualizar modalidade" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="3" />
      }} mt={1} onValueChange={itemValue => setSelectedValue(itemValue)}>
          <Select.Item label="Caminhada" value="Caminhada" />
          <Select.Item label="Corrida" value="Corrida" />
          <Select.Item label="Natação" value="Natação" />
          <Select.Item label="Futebol" value="Futebol" />
      </Select>

      <Center>
        <Text>Tempo Gasto (minutos)</Text>
        <Text>Total {totalTempo}</Text>
        <LineChart
          data={{
            
            labels: atividades.map((atividade) => formatDate(atividade.data)),

            datasets: [
              {
                data: atividades.map((atividade) => atividade.tempo_min),
                
              },
            ],

            }}
            width={Dimensions.get("window").width} 
            height={220}
            
            yAxisSuffix=" min"
            yAxisInterval={1} 
            chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0, 
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

        <Text>Percurso (metros)</Text>
        <Text>Total {percurso}</Text>
        <LineChart
          data={{
            
            labels: atividades.map((atividade) => formatDate(atividade.data)),

            datasets: [
              {
                data: atividades.map((atividade) => atividade.percurso),
                
              },
            ],

            }}
            width={Dimensions.get("window").width} 
            height={220}
            
            yAxisSuffix=" m"
            yAxisInterval={1} 
            chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0, 
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
