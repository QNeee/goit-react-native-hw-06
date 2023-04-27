
import { useEffect, useState } from "react";
import {
    StyleSheet, Image,
    View, TextInput,
    Text
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/store";
import { useSelector } from "react-redux";
import { getAllComments, getUserEmail, setImage } from "../../Redux/rnSlice";
import { getComments, postComment } from "../../Redux/rnOperations";
import { FlatList } from "react-native-gesture-handler";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Timestamp } from "firebase/firestore";
export interface IDate {
    seconds: number;
    nanoseconds: number;
}
const CommentsScreen = ({ route }: any) => {
    let count = 0;
    let count1 = 0;
    const dispatch: AppDispatch = useDispatch();
    const userEmail = useSelector(getUserEmail)
    const [comment, setComment] = useState('');
    const comments = useSelector(getAllComments);
    const handleChange = (value: string) => setComment(value);
    const onSendComment = () => {
        if (!comment) return;
        const newComment = {
            id: route.params,
            content: comment,
            from: userEmail,
            date: new Date()
        }
        dispatch(setImage(route.params));
        dispatch(postComment(newComment));
        return setComment('');

    }
    const toDate = (date: IDate | undefined) => {
        if (date) {
            const timestamp = Timestamp.fromDate(new Date(date.seconds * 1000 + date.nanoseconds / 1000000));
            const dateString = timestamp.toDate().toLocaleString();
            return dateString;
        }
    }
    useEffect(() => {
        dispatch(setImage(route.params));
        dispatch(getComments())
    }, [dispatch])
    return <GestureHandlerRootView><View style={styles.container}>
        <Image
            source={{ uri: route.params }}
            style={styles.image}
        />
        <FlatList data={comments} keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item }) => <View style={count++ % 2 === 0 ? { marginBottom: 24, marginLeft: 40, borderRadius: 6, backgroundColor: 'rgba(0, 0, 0, 0.03)', width: 299, height: 103 } : { marginBottom: 24, borderRadius: 6, marginRight: 40, backgroundColor: 'rgba(0, 0, 0, 0.03)', width: 299, height: 103 }}>
                <Text style={styles.content}>{item.content}</Text>
                <Text style={count1++ % 2 === 0 ? styles.dateRight : styles.dateLeft}>{toDate(item.date)}</Text>
            </View>}
        ></FlatList>
        <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: "row", marginVertical: 16 }}>
            <TextInput style={styles.input} placeholder="Коментировать..." inputMode="email" value={comment} onChangeText={handleChange} />
            <FontAwesome name='send' size={30} color="#FF6C00" style={styles.send} onPress={onSendComment} />
        </View>
    </View></GestureHandlerRootView>
}




const styles = StyleSheet.create({
    dateRight: {
        fontWeight: '400',
        fontSize: 10,
        lineHeight: 12,
        textAlign: 'right',
        color: '#BDBDBD'
    },
    dateLeft: {
        fontWeight: '400',
        fontSize: 10,
        lineHeight: 12,
        textAlign: 'left',
        color: '#BDBDBD'
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        marginVertical: 32,
        width: 343,
        height: 240,
    },
    send: {
        position: 'absolute',
        top: 15,
        right: 20
    },
    content: {
        fontWeight: '400',
        fontSize: 13,
        lineHeight: 18,
        color: '#212121',
        paddingLeft: 16,
        paddingTop: 16,
        paddingRight: 16,
        paddingBottom: 32,
        marginBottom: 8,
    },

    input: {
        width: 343,
        height: 50,
        backgroundColor: '#F6F6F6',
        borderRadius: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
    }
})


export default CommentsScreen;