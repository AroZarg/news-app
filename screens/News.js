import react from "react";
import { View ,Text,ScrollView,StyleSheet,Image} from "react-native";
import { useSelector } from 'react-redux';
export default function News ()  {
    const news = useSelector(state => state.news.data)
    
     return (
        <View style={styles.container}>
        <ScrollView >
            <Text style={styles.headline}>{news?.webTitle}</Text>
            <Image style={styles.image} source={{uri:news?.fields?.thumbnail}}  resizeMode="contain"/>
            <Text>{news?.fields?.bodyText}</Text>
        </ScrollView>
        </View>
     )
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
      flex:1
    },
    headline :{
        flexWrap:'wrap',
        flex:1,
        fontSize:18,
        fontWeight:"700",
        marginBottom:10
      },
      image: {
        flex:1,
        width:'100%',
        height:300,
        marginBottom : 10
      },
  });