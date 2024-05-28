import React from 'react'
import { Image, Button, View } from 'react-native'
import styles from './styles/home-styles'; 
 
export default function Home({ navigation }) {
    return (
        <View style={styles.container1}>
            <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
            />
            <View style={styles.container2}>
                <Button
                    title="Adicionar Pergunta"
                    onPress={() => navigation.navigate('Add')}
                />
            </View>
            <View style={styles.container2}>
                <Button
                    title="Iniciar Quiz"
                    onPress={() => navigation.navigate('Quiz')}
                    color={'green'}
                />
            </View>
            <Button
                title="Editar Perguntas"
                onPress={() => navigation.navigate('Edit')}
                color={'gold'}
            />
        </View>
    )
}