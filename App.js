import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './redux/store'
import HomeScreen from './screens/HomeScreen';
import { MyStatusBar } from './Components/MyStatusBar';
import { RootSiblingParent } from 'react-native-root-siblings';
import News from './screens/News';
const Stack = createStackNavigator()

export default function App() {

  return (
    <Provider store={store}>
   <NavigationContainer>
    <MyStatusBar />
           <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="News" component={News} />
      </Stack.Navigator>
   </NavigationContainer>
   </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
});
