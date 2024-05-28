import React, { useState, useEffect } from 'react'
import { Image, Button, TextInput, View, Alert, Text } from 'react-native'
import * as SQLlite from 'expo-sqlite'
import styles from './styles/quiz-styles'; 
const db = SQLlite.openDatabase('quiz.db')

export default function Quiz() {
    const [pergunta, setPergunta] = useState('')
    const [alternativas, setAlternativas] = useState([])
    const [respostaCorreta, setRespostaCorreta] = useState('')

    useEffect(() => {
        carregarPergunta()
    }, [])

    const carregarPergunta = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM perguntas ORDER BY RANDOM() LIMIT 1;',
                [],
                (_, { rows }) => {
                    let pergunta = rows._array[0]
                    setPergunta(pergunta.pergunta)
                    setRespostaCorreta(pergunta.resposta_correta)
                    setAlternativas([
                        pergunta.alternativaA,
                        pergunta.alternativaB,
                        pergunta.alternativaC,
                        pergunta.alternativaD,
                    ])
                }
            )
        })
    }

    const verificarResposta = (resposta) => {
        if (resposta === respostaCorreta) {
            Alert.alert('parabens!', 'voce acertou a resposta!')
            carregarPergunta()
        } else {
            Alert.alert('ops!', 'resposta incorreta!')
        }
    }

    return (
        <View
            style={styles.container}
        >
            <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
            />

            <Text
                style={styles.multiLineInput}
                multiline={true}
            >
                {pergunta}
            </Text>

            {alternativas.map((alternativa, index) => (
                
                <View style={styles.container2}>
                    <Button
                        key={index}
                        title={`${String.fromCharCode(
                            65 + index
                        )}. ${alternativa}`}
                        onPress={() =>
                            verificarResposta(String.fromCharCode(65 + index))
                        }
                    />
                </View>
            ))}

            <View style={styles.container2}>
                <Button title="Próxima pergunta" onPress={carregarPergunta} />
            </View>
        </View>
    )
}