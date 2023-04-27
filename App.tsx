import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import * as GestureHandler from 'react-native-gesture-handler';
import { Provider } from "react-redux";
import { store } from './Redux/store'
import { AuthHelper } from "./helper/AuthHelper";

export default function App() {
  return <Provider store={store}><NavigationContainer>
    <AuthHelper />
  </NavigationContainer></Provider>
}
