import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import LoginScreen from '../Screens/auth/LoginScreen';
import RegistrationScreen from '../Screens/auth/RegistrationScreen';
const AuthStack = createNativeStackNavigator();
import { useSelector } from "react-redux";
import { getLoggedIn } from "../Redux/rnSlice";
import { MainHelper } from "./MainHelper";
export const AuthHelper = () => {
    const logged = useSelector(getLoggedIn);
    return (!logged ? <AuthStack.Navigator>
        <AuthStack.Screen options={{
            headerShown: false
        }} name={'Логин'} component={LoginScreen} />
        <AuthStack.Screen options={{
            headerShown: false
        }} name={'Регистрация'} component={RegistrationScreen} />
    </AuthStack.Navigator> : <MainHelper />)
}