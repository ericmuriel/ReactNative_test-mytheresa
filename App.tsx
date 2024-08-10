import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { registerRootComponent } from 'expo';
import { View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import FilmList from './components/FilmList/FilmList';
import FilmDetail from './components/FilmDetail/FilmDetail';
import Wishlist from './components/WishList/WishList';
import { ThemeProvider } from './constants/ThemeContext';
import GenericContextProvider, { GenericContext } from './context/GenericContext';
import FetchMoviesComponent from './services/fetchService';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="FilmList" 
        component={FilmList} 
        options={{ title: 'Home' }} 
      />
      <Stack.Screen name="Details" component={FilmDetail} />
    </Stack.Navigator>
  );
};

const App: React.FC = () => {
  const { loading } = useContext(GenericContext);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadResources = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          'Comedy': require('./assets/fonts/ComedyStyleDemoRegular.ttf'),
          'Crime': require('./assets/fonts/Crimes.ttf'),
        });

        setFontLoaded(true);
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    loadResources();
  }, []);

  if (loading || !fontLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <GenericContextProvider>
      <FetchMoviesComponent />
      <ThemeProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="HomeTab"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName: keyof typeof Ionicons.glyphMap = 'home';
                if (route.name === "WishlistTab") {
                  iconName = 'heart';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen 
              name="HomeTab" 
              component={HomeStack} 
              options={{ headerShown: false }} 
            />
            <Tab.Screen 
              name="WishlistTab" 
              component={Wishlist} 
              options={{ title: 'Wishlist' }} 
            />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </GenericContextProvider>
  );
};

registerRootComponent(App);
