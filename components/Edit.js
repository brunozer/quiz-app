import React, { useState, useEffect } from 'react'
import { Image, Button,Text, TextInput, View, Alert, TouchableOpacity } from 'react-native'
import * as SQLlite from 'expo-sqlite'
import styles from './styles/edit-styles'; 
const db = SQLlite.openDatabase('quiz.db')

export default function Edit() {
    const [id, setId] = useState('')
    const [pergunta, setPergunta] = useState('')
    const [alternativaA, setAlternativaA] = useState('')
    const [alternativaB, setAlternativaB] = useState('')
    const [alternativaC, setAlternativaC] = useState('')
    const [alternativaD, setAlternativaD] = useState('')
    const [respostaCorreta, setRespostaCorreta] = useState('')

    useEffect(() => {
        carregarPergunta()
    }, [])

    const carregarPergunta = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM perguntas ORDER BY id LIMIT 1;',
                [],
                (_, { rows }) => {
                    let pergunta = rows._array[0]
                    setId(pergunta.id)
                    setPergunta(pergunta.pergunta)
                    setAlternativaA(pergunta.alternativaA)
                    setAlternativaB(pergunta.alternativaB)
                    setAlternativaC(pergunta.alternativaC)
                    setAlternativaD(pergunta.alternativaD)
                    setRespostaCorreta(pergunta.resposta_correta)
                }
            )
        })
    }

    const atualizarPergunta = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE perguntas SET pergunta = ?, alternativaA = ?, alternativaB = ?, alternativaC = ?, alternativaD = ?, resposta_correta = ? WHERE id = ?;',
                [
                    pergunta,
                    alternativaA,
                    alternativaB,
                    alternativaC,
                    alternativaD,
                    respostaCorreta,
                    id,
                ],
                () => {
                    Alert.alert('Sucesso!', 'Pergunta atualizada com sucesso!')
                }
            )
        })
    }

    const deletarPergunta = () => {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM perguntas WHERE id = ?;', [id], () => {
                Alert.alert('Sucesso!', 'Pergunta deletada com sucesso!')
                carregarPergunta()
            })
        })
    }

    const proximaPergunta = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM perguntas WHERE id > ? ORDER BY id LIMIT 1;',
                [id],
                (_, { rows }) => {
                    if (rows.length > 0) {
                        let pergunta = rows._array[0]
                        setId(pergunta.id)
                        setPergunta(pergunta.pergunta)
                        setAlternativaA(pergunta.alternativaA)
                        setAlternativaB(pergunta.alternativaB)
                        setAlternativaC(pergunta.alternativaC)
                        setAlternativaD(pergunta.alternativaD)
                        setRespostaCorreta(pergunta.resposta_correta)
                    } else {
                        Alert.alert('Informação', 'Esta é a última pergunta.')
                    }
                }
            )
        })
    }

    const perguntaAnterior = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM perguntas WHERE id < ? ORDER BY id DESC LIMIT 1;',
                [id],
                (_, { rows }) => {
                    if (rows.length > 0) {
                        let pergunta = rows._array[0]
                        setId(pergunta.id)
                        setPergunta(pergunta.pergunta)
                        setAlternativaA(pergunta.alternativaA)
                        setAlternativaB(pergunta.alternativaB)
                        setAlternativaC(pergunta.alternativaC)
                        setAlternativaD(pergunta.alternativaD)
                        setRespostaCorreta(pergunta.resposta_correta)
                    } else {
                        Alert.alert('Informação', 'Esta é a primeira pergunta.')
                    }
                }
            )
        })
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
            />
            <TextInput
                placeholder="Digite a pergunta"
                value={pergunta}
                multiline={true}
                onChangeText={setPergunta}
                numberOfLines={4}
                style={styles.multiLineInput}
            />
            <TextInput
                placeholder="Digite a alternativa A"
                value={alternativaA}
                onChangeText={setAlternativaA}
                style={styles.input}
            />
            <TextInput
                placeholder="Digite a alternativa B"
                value={alternativaB}
                onChangeText={setAlternativaB}
                style={styles.input}
            />
            <TextInput
                placeholder="Digite a alternativa C"
                value={alternativaC}
                onChangeText={setAlternativaC}
                style={styles.input}
            />
            <TextInput
                placeholder="Digite a alternativa D"
                value={alternativaD}
                onChangeText={setAlternativaD}
                style={styles.input}
            />
            <TextInput
                placeholder="Digite a letra da resposta correta"
                value={respostaCorreta}
                onChangeText={setRespostaCorreta}
                style={styles.input}
            />
            <View style={styles.container2}>
                <Button
                    title="Atualizar Pergunta"
                    onPress={atualizarPergunta}
                    style={styles.buttonDefault}
                />
            </View>
            <View style={styles.container2}>
                <TouchableOpacity style= {styles.buttonDefault}>
                    <Text 
                           title="Deletar Pergunta"
                           onPress={deletarPergunta}
                           style = {styles.deletarPergunta}
                           >
                            Deletar pergunta
                    </Text>
                </TouchableOpacity>
            </View>
            <View
                style={styles.container3}
            >
                <Button title="Voltar" onPress={perguntaAnterior} />
                <Button title="Avançar" onPress={proximaPergunta} />
            </View>
        </View>
    )
}