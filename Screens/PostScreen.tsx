import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostList from "./nested/PostListScreen";
import CommentsScreen from "./nested/CommentsScreen";
import MapScreen from "./nested/MapScreen";
const PostNavigation = createNativeStackNavigator();

const PostScreen = () => {
    return (
        <PostNavigation.Navigator>
            <PostNavigation.Screen options={{ headerShown: false }} name='DefaultScreen' component={PostList} />
            <PostNavigation.Screen name='Коментарии Юзера' component={CommentsScreen} />
            <PostNavigation.Screen name='Карта' component={MapScreen} />
        </PostNavigation.Navigator >
    )
}

export default PostScreen;