import {
    StyleSheet, Text, ImageBackground,
    View, TouchableOpacity, TextInput, KeyboardAvoidingView,
    Platform, Keyboard,
    TouchableWithoutFeedback
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useDispatch } from "react-redux";
import { registerUser } from "../../Redux/rnOperations";
import { AppDispatch } from "../../Redux/store";
import { useSelector } from "react-redux";
import { getLoggedIn } from "../../Redux/rnSlice";
const RegistrationScreen = ({ navigation }: any) => {
    const logged = useSelector(getLoggedIn);
    const [button, setButton] = useState(false);
    const [login, setLogin] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [show, SetShow] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const onFocusInput = () => {
        setButton(true)
    }
    const onBlurInput = () => {
        setButton(false);
    }
    const handleLogin = (text: string) => { setLogin(text) };
    const handleMail = (text: string) => { setMail(text) };
    const handlePassword = (text: string) => { setPassword(text) };

    const register = () => {
        const newUser = {
            login,
            mail,
            password
        }

        dispatch(registerUser(newUser));
    }

    const passwShow = () => SetShow(!show);
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.maincontainer}>
                <ImageBackground source={require('../../images/bebr.jpg')} style={styles.backImg} >
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.containerKeyB} >
                        <View style={styles.container}>
                            <View style={styles.pfotoContainer}>
                                <TouchableOpacity style={styles.addbutton} activeOpacity={0.5}>
                                    <ImageBackground source={require('../../images/add.png')} style={{ width: '100%', height: '100%' }}></ImageBackground>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.title}>Регистрация</Text>

                            <TextInput style={styles.inputLogin} placeholder="Логин" inputMode="text" value={login} onChangeText={handleLogin} onFocus={onFocusInput} onBlur={onBlurInput} />
                            <TextInput style={styles.inputMailPassw} placeholder="Адрес электронной почты" inputMode="email" value={mail} onChangeText={handleMail} onFocus={onFocusInput} onBlur={onBlurInput} />
                            <TextInput style={styles.inputMailPassw} placeholder="Пароль" secureTextEntry={!show ? true : false} value={password} onChangeText={handlePassword} onFocus={onFocusInput} onBlur={onBlurInput} />

                            <TouchableOpacity style={styles.passwShow} activeOpacity={0.5} onPress={passwShow}>
                                <Text style={styles.passwShowText}>{!show ? 'Показать' : "Скрыть"}</Text>
                            </TouchableOpacity>
                            {!button && <View>
                                <TouchableOpacity style={styles.registerButton} activeOpacity={0.5} onPress={register}>
                                    <Text style={styles.registerButtonText}>Зарегистрироваться</Text>
                                </TouchableOpacity>


                                <TouchableOpacity style={styles.loginLink} activeOpacity={0.5} >
                                    <Text style={styles.loginLinkText}>Уже есть аккаунт?  <View style={{ borderBottomWidth: 1, borderBottomColor: 'red' }}><TouchableOpacity activeOpacity={0.5}><Text onPress={() => navigation.navigate('Логин')}>Войти</Text></TouchableOpacity></View></Text>
                                </TouchableOpacity>
                            </View>}
                        </View>
                    </KeyboardAvoidingView>
                </ImageBackground>
                <StatusBar style="auto" />
            </View>
        </TouchableWithoutFeedback>);
};
const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        alignItems: 'center',
    },
    backImg: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%'
    },
    container: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        width: '100%',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
    },
    containerKeyB: {
        justifyContent: "flex-end",
    },
    pfotoContainer: {
        marginTop: -60,
        height: 120,
        width: 120,
        backgroundColor: '#F6F6F6',
        borderRadius: 16,
    },

    addbutton: {
        marginTop: '65%',
        left: '90%',
        height: 25,
        width: 25,
        pointerEvents: "auto",
    },
    title: {
        fontWeight: '500',
        fontSize: 30,
        marginTop: 32,
        lineHeight: 35,
    },
    inputLogin: {
        backgroundColor: '#F6F6F6',
        width: 343,
        height: 50,
        borderRadius: 8,
        marginTop: 33,
        padding: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,
    },
    inputMailPassw: {
        backgroundColor: '#F6F6F6',
        width: 343,
        height: 50,
        borderRadius: 8,
        padding: 16,
        marginTop: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 16,
        position: 'relative',
    },
    passwShowText: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,
    },
    passwShow: {
        top: -34,
        left: 130,
    },
    registerButton: {
        backgroundColor: '#FF6C00',
        height: 50,
        width: 343,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        marginTop: 44,
    },
    registerButtonText: {
        color: '#fff',
        fontWeight: '400'
    },
    loginLink: {
        marginTop: 16,
        marginBottom: 66
    },
    loginLinkText: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
});

export default RegistrationScreen;