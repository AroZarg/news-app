import React,{useState} from "react";
import { StyleSheet, TextInput, View } from "react-native";


export const PublicWrapper = ({children,getData,setQuery}) => {
    const handleChange = (text) => {
        setQuery(text)
        if(text?.length>2){
            
            getData(text,1)
        }
        if(text.length===0){
            getData('',1)

        }
    }
    return(
        <View style={styles.wrapper}>
            <View style={styles.searchContainer}>
                <TextInput placeholder="Search" style={styles.input} onChangeText={handleChange}/>
                </View>
           
                {children}        
                </View>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1
    },
    searchContainer:{
        backgroundColor:'#FFFFFFFF',
        padding:15,
    },
    input:{
        padding:10,
        borderRadius:4,
        borderWidth: 1,
        borderColor: 'gray',
        borderStyle: 'solid',
    }
})