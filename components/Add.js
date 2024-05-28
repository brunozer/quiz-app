import React, { useState } from 'react';
import { Image, Button, TextInput, View, Alert } from 'react-native';
import * as SQLlite from 'expo-sqlite';
import styles from './styles/add-styles'; 
 
const db = SQLlite.openDatabase('quiz.db');
 
export default function Add() {
    const [pergunta, setPergunta] = useState('');
    const [alternativaA, setAlternativaA] = useState('');
    const [alternativaB, setAlternativaB] = useState('');
    const [alternativaC, setAlternativaC] = useState('');
    const [alternativaD, setAlternativaD] = useState('');
    const [respostaCorreta, setRespostaCorreta] = useState('');
 
    db.transaction((tx) => {
        tx.executeSql(
            'create table if not exists perguntas (id integer primary key autoincrement, pergunta text, alternativaA text, alternativaB text, alternativaC text, alternativaD text, resposta_correta text);'
        );
    });
 
    const adicionarPergunta = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO perguntas (pergunta, alternativaA, alternativaB, alternativaC, alternativaD, resposta_correta) VALUES (?, ?, ?, ?, ?, ?)',
                [
                    pergunta,
                    alternativaA,
                    alternativaB,
                    alternativaC,
                    alternativaD,
                    respostaCorreta,
                ],
                (_, { insertId }) => {
                    setPergunta('');
                    setAlternativaA('');
                    setAlternativaB('');
                    setAlternativaC('');
                    setAlternativaD('');
                    setRespostaCorreta('');
                    Alert.alert('Sucesso!', 'Pergunta adicionada com sucesso!');
                }
            );
        });
    };
 
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
            <Button title="Adicionar Pergunta" onPress={adicionarPergunta} style={styles.button} />
        </View>
    );
}