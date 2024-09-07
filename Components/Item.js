import React from "react";
import { View,Text,StyleSheet,Image} from "react-native";
export const Item = ({item}) =>{
    function showDate (date){
        return `${new Date(date)?.getFullYear()}-${new Date(date)?.getMonth()}-${new Date(date)?.getDate()}`
    }
   return(
   <View style={styles.item} >
    <View style={styles.headlineContainer}>
    <Image source={{uri:item?.fields?.thumbnail}} style={styles.image} resizeMode="contain"/>
    <Text style={styles.headline}>{item?.webTitle}</Text>
    </View>
    <View style={styles.bodyContainer} >
        <Text numberOfLines={3} ellipsizeMode="tail">{item?.fields?.bodyText}</Text>
        <View style={styles.infoContainer} >
        <Text style={styles.info}>{item?.sectionName}</Text> 
        <Text style={styles.info}>{showDate(item?.webPublicationDate)}</Text>
        </View>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({

    item: {
        backgroundColor: 'lightgray',
        padding: 20,
        marginBottom: 20, 
        borderRadius: 10,
        gap:10,
        alignItems:'center',
         width:"100%"
      },
      headlineContainer:{
        gap:20,
        alignItems:'center',
        width:"100%"
      },
      image: {
        flex:1,
        width:'100%',
        height:200
      },
      headline :{
        flexWrap:'wrap',
        flex:1,
        fontSize:18,
        fontWeight:"700"
      },
      bodyContainer:{
        gap:10
      },
      infoContainer:{
        flexDirection:'row',
        gap:10,
        justifyContent:'space-between'
      },
      info:{
        fontSize:10,
        fontWeight:'200'
      }
  });