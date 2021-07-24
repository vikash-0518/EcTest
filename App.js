import 'react-native-gesture-handler';
import React, { useRef, useState, useEffect } from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { AppState } from "react-native";
import HomeScreen from './pages/HomeScreen';
import VisitorScreen from './pages/VisitorScreen';
import VisitorListScreen from './pages/VisitorListScreen';
import LatestNews from './pages/LatestNews';

const Stack = createStackNavigator();

const App = () => {

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);
  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
      alert("“This app is running in background”")
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log("AppState", appState.current);
    
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'Home', 
            headerStyle: {
              backgroundColor: '#0000CD', 
            },
            headerTintColor: '#fff', 
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        
        <Stack.Screen
          name="VisitorList"
          component={VisitorListScreen}
          options={{
            title: 'VisitorList',
            headerStyle: {
              backgroundColor: '#0000CD',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold', 
            },
          }}
        />
      
        <Stack.Screen
          name="VisitorScreen"
          component={VisitorScreen}
          options={{
            title: 'Visitor Entry', 
            headerStyle: {
              backgroundColor: '#0000CD', 
            },
            headerTintColor: '#fff', 
            headerTitleStyle: {
              fontWeight: 'bold', 
            },
          }}
        />
         <Stack.Screen
          name="LatestNews"
          component={LatestNews}
          options={{
            title: 'Latest News', 
            headerStyle: {
              backgroundColor: '#0000CD', 
            },
            headerTintColor: '#fff', 
            headerTitleStyle: {
              fontWeight: 'bold', 
            },
          }}
        />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
