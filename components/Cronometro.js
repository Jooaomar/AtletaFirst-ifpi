// Crie o compomente Cronometro.js que será responsável por gerenciar o tempo gasto em uma atividade física.
// Deve ter o botao iniciar e o botao parar.
// Deve devolver ao componente pai Atividades.js o tempo gasto em minutos quando o botao parar for clicado.
// E deve devolver ao componente pai um booleano indicando fim da atividade quando o botao parar for clicado.

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "native-base";

export default function Cronometro(props) {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [exibeForm, setExibeForm] = useState(true);
    
    function handleStart() {
        setIsActive(true);
        // setExibeForm(!exibeForm); // campo selecionado

    }
    
    function handleStop() {
        setIsActive(false);
        setIsFinished(true);
        setExibeForm(true); // Renicia (true) para inserção de nova atividade
        // setSelecionado(!selecionado); // Renicia para inserção de nova atividade
        // props.setIsFinishedHandled(false); // Renicia para inserção de nova atividade
    }
    
    function handleReset() {
        setIsActive(false);
        setTime(0);
        setExibeForm(false); // Renicia (false) para inserção de nova atividade
        props.setIsFinishedHandled(false); // Renicia para inserção de nova atividade
    }
    
    useEffect(() => {
        let interval = null;
    
        if (isActive) {
        interval = setInterval(() => {
            setTime((time) => time + 1);
        }, 1000);
        } else if (!isActive && time !== 0) {
            clearInterval(interval);
        }
    
        if (isFinished && exibeForm && !props.isFinishedHandled) {
            // props.onStop(time);
            props.setMin(time);
            props.setIsFinishedHandled(true); // Marca isFinished como tratado
            setExibeForm(true); // Renicia (true) para inserção de nova atividade
        }
    
        return () => clearInterval(interval);
    }, [isActive, time, isFinished, props.setMin, props.adicionarAtividade, props.isFinishedHandled]);
    
    return (
        <View style={styles.container}>
        <Text style={styles.timer}>{time}</Text>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
            style={styles.button}
            onPress={handleStart}
            disabled={isActive}
            >
                <Text style={styles.buttonText}>Iniciar</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.button}
            onPress={handleStop}
            disabled={!isActive}
            >
                <Text style={styles.buttonText}>Parar</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.button}
            onPress={handleReset}
            disabled={isActive}
            >
                <Text style={styles.buttonText}>Reiniciar</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingTop: 50,
    },
    timer: {
        fontSize: 50,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: "row",
    },
    button: {
        backgroundColor: "#1E90FF",
        padding: 10,
        borderRadius: 5,
        margin: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
});
