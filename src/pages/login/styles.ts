import { Dimensions, StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
    ,
    boxTop: {
        height: Dimensions.get('window').height / 3,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'

    }
    ,
    boxBotton: {
        height: Dimensions.get('window').height / 4,
        width: '100%',
        justifyContent: "flex-start",
        alignItems: "center"
    }
    ,
    boxMid: {
        height: Dimensions.get('window').height / 3,
        width: '100%',
        paddingHorizontal: 32,
    }
    ,
    text: {
        fontSize: 25,
        fontWeight: 600,
        marginTop: 40
    }
    ,
    titleInput: {
        marginLeft: 5,
        marginTop: 20,
        color: themes.colors.gray,
    }
    ,
    boxInput: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderRadius: 40,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: 'center',
        backgroundColor: themes.colors.lightGray,
        borderColor: themes.colors.gray,
    }
    ,
    input: {
        width: "88%",
        height: "100%",
        borderRadius: 40,
    }
    ,
    button: {
        width: 250,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
        backgroundColor: themes.colors.primary,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.20,
        shadowRadius: 5.62,
        elevation: 7
    }
    ,
    textBotton:{
        fontSize:18,
        color:themes.colors.lightGray
    }


});