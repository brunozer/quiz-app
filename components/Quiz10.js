import React, { useState, useEffect } from 'react';
import { Image, Button, Text, View, Alert } from 'react-native';
import * as SQLlite from 'expo-sqlite';
import styles from './styles/quiz-styles';
 
const db = SQLlite.openDatabase('quiz.db');
 
export default function Quiz10() {
    const [perguntas, setPerguntas] = useState([]);
    const [perguntaAtual, setPerguntaAtual] = useState(0);
    const [pontuacao, setPontuacao] = useState(0);
    const [carregado, setCarregado] = useState(false);
 
    useEffect(() => {
        carregarPerguntas();
    }, []);
 
    const carregarPerguntas = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM perguntas ORDER BY RANDOM() LIMIT 10;',
                [],
                (_, { rows }) => {
                    if (rows.length > 0) {
                        setPerguntas(rows._array);
                        setCarregado(true);
                    } else {
                        Alert.alert('Erro', 'Não foram encontradas perguntas.');
                    }
                },
                (tx, error) => {
                    Alert.alert('Erro', 'Falha ao carregar perguntas.');
                    console.log(error);
                }
            );
        });
    };
 
    const verificarResposta = (resposta) => {
        if (resposta === perguntas[perguntaAtual].resposta_correta) {
            setPontuacao(pontuacao + 1);
        }
 
        if (perguntaAtual < 9) {
            setPerguntaAtual(perguntaAtual + 1);
        } else {
            mostrarResultado();
        }
    };
 
    const mostrarResultado = () => {
        let mensagem = '';
        if (pontuacao >= 9) {
            mensagem = 'VOCÊ É UM EXPERT NO ASSUNTO';
        } else if (pontuacao >= 7) {
            mensagem = 'VOCÊ TEM UM BOM CONHECIMENTO DO ASSUNTO';
        } else if (pontuacao >= 5) {
            mensagem = 'VOCÊ TEM UM CERTO CONHECIMENTO DO ASSUNTO';
        } else if (pontuacao >= 3) {
            mensagem = 'SEU CONHECIMENTO É BÁSICO';
        } else {
            mensagem = 'VOCÊ É UM NOOB NESTE ASSUNTO';
        }
 
        Alert.alert('Resultado', `Pontuação: ${pontuacao}\n${mensagem}`);
    };
 
    if (!carregado) {
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        );
    }
 
    if (!perguntas[perguntaAtual]) {
        return (
            <View style={styles.container}>
                <Text>Erro ao carregar pergunta.</Text>
            </View>
        );
    }
 
    const pergunta = perguntas[perguntaAtual];
 
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
            />
 
            <Text style={styles.multiLineInput} multiline={true}>
                {pergunta.pergunta}
            </Text>
 
            {['A', 'B', 'C', 'D'].map((letra, index) => (
                <View style={styles.container2} key={index}>
                    <Button
                        title={`${letra}. ${pergunta[`alternativa${letra}`]}`}
                        onPress={() => verificarResposta(letra)}
                    />
                </View>
            ))}
        </View>
    );
}
