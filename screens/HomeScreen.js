import React, { useEffect, useState,useCallback } from 'react';
import { FlatList, View, Text, StyleSheet,RefreshControl,ActivityIndicator,TouchableOpacity } from 'react-native';
import { fetchArticles } from '../Utils/Utils';
import { Item } from '../Components/Item';
import { PublicWrapper } from '../Layouts/PublicWrapper';
import Toast from 'react-native-root-toast'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Network from 'expo-network';
import { useDispatch } from 'react-redux';
import { setNews } from '../redux/dataSlicer';

const HomeScreen = ({navigation}) => {
    const dispatch = useDispatch()

    const [data,setData] = useState([])
    const [page,setPage] = useState(1)
    const [refreshing, setRefreshing] =useState(false);
    const [hasMore, setHasMore] = useState(true);  
    const [loading, setLoading] = useState(false)
    const [query,setQuery] = useState('')
    
    const [isConnected, setIsConnected] = useState(true)
    const onRefresh = useCallback(() => {
      if (!isConnected) {
        showConnectionError(); 
        return;
      }
      setRefreshing(true);
      setHasMore(true);
       getData(query, 1)
       setRefreshing(false)
    }, [isConnected]);
    useEffect(() => {
      const loadDataFromStorage = async () => {
        if (!isConnected) {
          try {
            const storedData = await AsyncStorage.getItem('articles');
            if (storedData) {
              setData(JSON.parse(storedData));
            } else {
              showConnectionError(); 
            }
          } catch (error) {
            console.error("Failed to load data from storage:", error);
          }
        }
      };        
      loadDataFromStorage();
    }, [isConnected])
    async function getData(query, pageNumber = 1) {
      if (loading || !hasMore || !isConnected) {
        if (!isConnected) {
          showConnectionError();
        }
        return;
      }
  
      setLoading(true);
      try {
        const newData = await fetchArticles(query, pageNumber);
        if (newData.length > 0) {
          const updatedData = pageNumber === 1 ? newData : [...data, ...newData];
          setData(updatedData);
          setPage(pageNumber + 1);
          
          await AsyncStorage.setItem('articles', JSON.stringify(updatedData));
        } else {
          setHasMore(false); 
        }
      } catch (error) {
        Toast.show( error.config.massage, {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        })
      } finally {
        setLoading(false);
      }
    }
    const loadMoreData = ()=>{
      if (!loading && hasMore&&!query) {
        getData('', page);
      }
    }
    useEffect(()=>{
        
        getData()
    },[])
    useEffect(() => {
      const checkNetworkStatus = async () => {
        const networkState = await Network.getNetworkStateAsync();
        setIsConnected(networkState.isConnected);
      };
  
      checkNetworkStatus(); 
  
      const interval = setInterval(checkNetworkStatus, 5000);
  
      return () => clearInterval(interval); 
    }, []);
    const showConnectionError = () => {
      Toast.show('No internet connection available', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
    };
   const onPresItem = (item)=>{
      dispatch(setNews(item))
      navigation.navigate('News')
   }
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onPresItem(item)}>
       <Item item={item} />
       </TouchableOpacity>
  );
  return (
   <PublicWrapper getData={getData} setQuery = {setQuery}>
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      onEndReached={loadMoreData}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading && <ActivityIndicator />}
    />
    </PublicWrapper>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20, 
  },
  item: {
    backgroundColor: 'lightgray',
    padding: 20,
    marginBottom: 20, 
    borderRadius: 10,
  },
});

export default HomeScreen;