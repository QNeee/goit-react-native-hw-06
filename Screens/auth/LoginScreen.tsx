import {
    StyleSheet, Text, ImageBackground,
    View, TouchableOpacity, TextInput, KeyboardAvoidingView,
    Platform, TouchableWithoutFeedback, Keyboard
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/store";
import { loginUser } from "../../Redux/rnOperations";


const LoginScreen = ({ navigation }: any) => {
    const dispatch: AppDispatch = useDispatch();
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [button, setButton] = useState(false);
    const [show, SetShow] = useState(false);
    const handleMail = (text: string) => setMail(text.toString());
    const handlePassword = (text: string) => setPassword(text.toString());
    const login = () => {
        const user = {
            mail,
            password
        }
        // if (!mail || !password) { alert("Enter all data pleace!!!"); return }
        // console.log(`Email: ${mail}, Password: ${password}`)
        dispatch(loginUser(user));
    }
    const onFocusInput = () => {
        setButton(true)
    }
    const onBlurInput = () => {
        setButton(false);
    }
    const passwShow = () => SetShow(!show);
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.maincontainer}>
                <ImageBackground source={require('../../images/bebr.jpg')} style={styles.backImg} >
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.containerKeyB} >
                        <View style={styles.container}>

                            <Text style={styles.title}>Войти</Text>
                            <View style={styles.inputContainer}>
                                <TextInput style={styles.inputMailPassw} placeholder="Email address" inputMode="email" value={mail} onChangeText={handleMail} onFocus={onFocusInput} onBlur={onBlurInput} />
                                <TextInput style={styles.inputMailPassw} placeholder="Password" secureTextEntry={!show ? true : false} value={password} onChangeText={handlePassword} onFocus={onFocusInput} onBlur={onBlurInput} />
                            </View>
                            <TouchableOpacity style={styles.passwShow} activeOpacity={0.5} onPress={passwShow}>
                                <Text style={styles.passwShowText}>{!show ? 'Показать' : "Скрыть"}</Text>
                            </TouchableOpacity>
                            {!button && <View style={styles.btnContainer}>
                                <TouchableOpacity style={styles.registerButton} activeOpacity={0.5} onPress={login}>
                                    <Text style={styles.registerButtonText}>Войти</Text>
                                </TouchableOpacity>
                                <Text style={styles.loginLinkText}>Нет аккаунта?  <View style={{ borderBottomWidth: 1, borderBottomColor: 'red' }}><TouchableOpacity activeOpacity={0.5}><Text onPress={() => navigation.navigate('Регистрация')}>Зарегистрироваться</Text></TouchableOpacity></View></Text>
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
        maxHeight: 489
    },
    inputContainer: {
        marginTop: 33
    },
    containerKeyB: {
        justifyContent: "flex-end",
        alignItems: 'center'
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
    btnContainer: {
        marginBottom: 144,
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
        fontWeight: '400',
    },
    loginLinkText: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 16,
        marginBottom: 66
    },
});

export default LoginScreen;