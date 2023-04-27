
import {
    StyleSheet, Text,
    View, TouchableOpacity, TextInput, Image
} from "react-native";
import { Camera } from "expo-camera";
import { FontAwesome } from '@expo/vector-icons';
import { useState, useEffect } from "react";
import * as Location from 'expo-location'
interface ILocation extends Object {
    latitude: number | null,
    longitude: number | null
}
import axios from 'axios';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { postPost } from "../Redux/rnOperations";
import { useSelector } from "react-redux";
import { getUserEmail } from "../Redux/rnSlice";
const CreatePostsScreen = ({ navigation }: any) => {
    const dispatch: AppDispatch = useDispatch();
    const userEmail = useSelector(getUserEmail);
    const [camera, setCamera] = useState<Camera | null>(null);
    const [photo, setPhoto] = useState<string | undefined>('');
    const [name, setName] = useState('');
    const [customLocation, setcustomLocation] = useState('');
    const [location, setLocation] = useState<ILocation>({ latitude: null, longitude: null });
    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
        })();
    }, []);
    const getStreetAndCityName = async (location: ILocation) => {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.latitude}&lon=${location.longitude}`);

            if (response.status === 200) {
                const address = response.data.address;
                const streetName = address.road || '';
                const cityName = address.city || address.town || '';
                return `${streetName}, ${cityName}`;
            } else {
                throw new Error('Unable to geocode coordinates');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const takePhoto = async () => {
        const picture = await camera?.takePictureAsync();
        const location = await Location.getCurrentPositionAsync();
        setPhoto(picture?.uri)
        setLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude })
    }
    const handleName = (value: string) => setName(value.toString());
    const handleLocation = (value: string) => setcustomLocation(value.toString());
    const handleSubmit = async () => {
        if (!photo && !name) {
            alert('fill all pieces')
            return;
        }
        const postedPost = {
            id: userEmail,
            photo,
            name,
            location: !customLocation ? await getStreetAndCityName(location) : customLocation,
            mapLocation: location,
        }
        dispatch(postPost(postedPost))
        setPhoto('');
        setName('');
        setcustomLocation('');
        setLocation({ latitude: null, longitude: null });
        return navigation.navigate('DefaultScreen');
    }
    const onDelete = () => {
        setPhoto('');
        setName('');
        setcustomLocation('');
    }
    const check = name && location && photo;
    return <View style={styles.container}><View style={styles.postContainer}>
        <Camera style={styles.postImg} ref={setCamera} >
        </Camera>
        <TouchableOpacity style={styles.postImgAdd} activeOpacity={0.5} onPress={takePhoto}>
            <FontAwesome name="camera" size={24} color="white" />
        </TouchableOpacity>
    </View>
        <Text style={styles.postImgText}>Загрузите фото</Text>
        <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Название..." placeholderTextColor={'#BDBDBD'} value={name} onChangeText={handleName} inputMode="text" />
            <TextInput style={styles.input} placeholder="Местность..." placeholderTextColor={'#BDBDBD'} value={customLocation} onChangeText={handleLocation} inputMode="text" />
        </View>
        <TouchableOpacity style={!check ? styles.postButton : styles.postButtonActive} activeOpacity={0.5} onPress={handleSubmit} >
            <Text style={styles.postButtonText}>Опубликовать</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} style={!check ? styles.delete : styles.deleteActive} onPress={onDelete}>
            <FontAwesome name="trash" size={24} color="#DADADA" />
        </TouchableOpacity>
    </View>
}


const styles = StyleSheet.create({
    delete: {
        width: 70,
        height: 40,
        backgroundColor: '#F6F6F6',
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 20
    },
    deleteActive: {
        width: 70,
        height: 40,
        backgroundColor: '#FF6C00',
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 20
    },
    container: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100%',
        backgroundColor: '#fff'
    },
    inputContainer: {
        width: '85%',
        marginTop: 48,
        marginLeft: 25,
        marginRight: 25,
    },
    input: {
        marginBottom: 32,
        borderBottomWidth: 1,
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,
    },
    postContainer: {
        marginTop: 32,
        width: 343,
        height: 240,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    postImg: {
        flex: 3,
        width: '100%',
        height: 600,
        color: '#F6F6F6',
        justifyContent: "center",
        alignItems: "center",
    },
    postImgText: {
        marginTop: 8,
        color: "#BDBDBD",
        marginLeft: 25,
    },
    postImgAdd: {
        position: 'absolute',
        top: 100,
        left: 150,
        width: 50,
        height: 50,
        borderRadius: 50,
        padding: 3,
        borderColor: '#ffffff',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: "center"
    },
    postButtonText: {
        color: '#BDBDBD',
        fontWeight: '400',
    },
    postButton: {
        backgroundColor: '#E8E8E8',
        height: 50,
        width: 343,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        marginTop: 44,
        marginLeft: 25,
    },
    postButtonActive: {
        backgroundColor: '#FF6C00',
        height: 50,
        width: 343,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        marginTop: 44,
        marginLeft: 25,
    },
})





export default CreatePostsScreen;

function setErrorMsg(arg0: string) {
    throw new Error("Function not implemented.");
}
