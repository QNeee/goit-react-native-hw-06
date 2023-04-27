
import {
    View,
    StyleSheet,
    FlatList,
    Image,
    Text,
    TouchableOpacity
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { getAllComments, getAllPosts, getUserEmail, getUserLogin } from "../../Redux/rnSlice";

export interface IObject extends Object {
    location?: string,
    name: string,
    photo: string,
    mapLocation: object,
    content?: string,
    date?: IDate
}
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/store";
import { useEffect } from "react";
import { getPosts } from "../../Redux/rnOperations";
import { IDate } from "./CommentsScreen";
const avatar = require('../../images/photo.png');
const PostList = ({ navigation }: any) => {
    const posts = useSelector(getAllPosts)
    const dispatch: AppDispatch = useDispatch();
    const userEmail = useSelector(getUserEmail);
    const userNickname = useSelector(getUserLogin);
    const comments = useSelector(getAllComments);
    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])
    const onComments = (photo: string) => {
        navigation.navigate('Коментарии Юзера', photo)
    }
    const onMap = (loc: object) => {
        navigation.navigate('Карта', loc)
    }
    return <View style={styles.container}>
        <View style={styles.avatarContainer}>
            <Image source={avatar} style={styles.avatar} />
            <View style={styles.info}>
                <Text style={{
                    fontWeight: '700',
                    fontSize: 13,
                    lineHeight: 15,
                    color: '#212121'
                }}>{userEmail}</Text>
                <Text style={{
                    fontWeight: '400',
                    fontSize: 11,
                    lineHeight: 13,
                    color: 'rgba(33, 33, 33, 0.8)'
                }}>{userNickname}</Text>
            </View>
        </View>
        <FlatList data={posts} keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item }) => <View style={styles.postContainer}><Image source={{ uri: item.photo }} style={styles.img} />
                <Text style={{
                    marginLeft: 10, marginTop: 8, fontWeight: '500',
                    fontSize: 16,
                    lineHeight: 19,
                    color: "#212121"
                }}>{item.name}</Text>
                <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: "row", marginBottom: 32, marginTop: 11 }}>
                    <TouchableOpacity activeOpacity={0.5} style={{ display: 'flex', flexDirection: "row" }} onPress={() => onComments(item.photo)}>
                        <FontAwesome name='comment' size={24} color="#BDBDBD" style={{ marginLeft: 11 }} />
                        <Text style={{ marginLeft: 9 }}>{comments?.length}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} style={{ display: 'flex', flexDirection: "row" }} onPress={() => onMap(item.mapLocation)}>
                        <FontAwesome name='location-arrow' size={24} color="#BDBDBD" style={{ marginRight: 11 }} />
                        <Text style={{
                            marginRight: 18, fontWeight: '500',
                            fontSize: 16,
                            lineHeight: 19,
                            color: "#212121",
                            textAlign: 'right',
                            textDecorationLine: 'underline'
                        }}>{item.location}</Text>
                    </TouchableOpacity>
                </View>
            </View>}
        ></FlatList>
    </View>
}


const styles = StyleSheet.create({
    info: {
        marginLeft: 8
    },
    avatarContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 'auto',
        marginLeft: 35,
        marginVertical: 32,
    },
    avatar: {
        marginLeft: -25
    },
    postContainer: {
        width: '100%',
    },
    container: {
        marginHorizontal: 32,
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    text: {
        marginTop: 27
    },
    img: {
        borderRadius: 8,
        marginHorizontal: 10,
        height: 240,
    }
})





export default PostList;