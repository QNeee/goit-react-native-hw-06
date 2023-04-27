import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import PostScreen from '../Screens/PostScreen';
import CreatePostsScreen from '../Screens/CreatePostsScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import { useSelector } from "react-redux";
import { getLoggedIn } from "../Redux/rnSlice";
import { AppDispatch } from '../Redux/store';
import { useDispatch } from "react-redux";
import { logOut } from '../Redux/rnOperations';
const MainTab = createBottomTabNavigator();
export const MainHelper = () => {
    const dispatch: AppDispatch = useDispatch();
    const logged = useSelector(getLoggedIn);
    return (logged ? <MainTab.Navigator>
        <MainTab.Screen options={{
            tabBarIcon: ({ color, size }) => (
                <AntDesign name='home' size={size} color={color} />
            ),
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitle: 'Публикации',
            headerTitleStyle: {
                fontWeight: '500',
                fontSize: 17,
                lineHeight: 22,
                color: '#212121',
            },
            headerRight: () => (
                <MaterialIcons
                    onPress={() => dispatch(logOut())}
                    name='logout'
                    size={30}
                    color='#BDBDBD'
                    style={{ marginRight: 16, backgroundColor: 'red' }}
                />
            ),
        }} name="Публикации" component={PostScreen} />
        <MainTab.Screen options={{
            tabBarIcon: ({ color, size }) => (
                <AntDesign name='pluscircleo' size={size} color={color} />
            ),
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitle: 'Создать публикацию',
            headerTitleStyle: {
                fontWeight: '500',
                fontSize: 17,
                lineHeight: 22,
                color: '#212121',
            }
        }} name="Создать Публицацию" component={CreatePostsScreen} />
        <MainTab.Screen options={{
            tabBarIcon: ({ color, size }) => (
                <AntDesign name='user' size={size} color={color} />
            ),
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitle: 'Профиль',
            headerTitleStyle: {
                fontWeight: '500',
                fontSize: 17,
                lineHeight: 22,
                color: '#212121',
            }
        }} name="Профиль" component={ProfileScreen} />
    </MainTab.Navigator> : null)
}