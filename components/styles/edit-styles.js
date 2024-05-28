import { StyleSheet } from 'react-native';
 
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    container2: {
        marginTop: 20,
        marginBottom: 15 
    },
    container3: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
    },
    buttonDefault: {
         marginBottom: 5 ,
         padding: 8,
         borderRadius: 3,
         backgroundColor: 'red'
    },
    numeroDePerguntas: {
        fontSize: 20,
        backgroundColor: 'green',
        padding: 7,
        borderRadius: 10,
        color: '#fff',
        marginBottom: 30
    },
    deletarPergunta: {
         color: '#ffff'
    },
    logo: {
        width: '90%',
        height: 150,
        marginBottom: 45,
    },
    input: {
        borderColor: 'blue',
        borderWidth: 1,
        marginBottom: 5,
        padding: 5,
        width: '90%',
    },

    multiLineInput: {
        height: 60,
        borderColor: 'blue',
        borderWidth: 1,
        padding: 8,
        fontWeight: '700',
        borderRadius: 10,
        marginBottom: 30,
        width: '90%',
        color: '#ffff',
        backgroundColor: '#000'
    },

    height: 80,
    borderColor: 'blue',
    borderWidth: 1,
    marginBottom: 5,
    width: '90%',
    button: {
        marginBottom: 20,
    },
});
 
export default styles;