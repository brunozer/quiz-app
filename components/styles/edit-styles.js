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
         padding: 10,
         borderRadius: 3,
         backgroundColor: 'red'
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
        width: '90%',
    },

    multiLineInput: {
        height: 80,
        borderColor: 'blue',
        borderWidth: 1,
        marginBottom: 5,
        width: '90%',
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