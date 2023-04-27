
import {
    StyleSheet, Text, ImageBackground,
    View, TouchableOpacity, TextInput, KeyboardAvoidingView,
    Platform, TouchableWithoutFeedback, Keyboard
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }: any) => {
    return <View style={{ flex: 1 }}>
        <MapView
            style={{ flex: 1 }}
            initialRegion={{
                longitude: route.params?.longitude,
                latitude: route.params?.latitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.006
            }}
        >
            <Marker coordinate={{ latitude: route.params?.latitude, longitude: route.params?.longitude }} />
        </MapView>
    </View>
}

const styles = StyleSheet.create({

})

export default MapScreen