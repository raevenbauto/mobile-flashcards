import React from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import NavigationContainer from "@react-navigation/native/src/NavigationContainer";
import DeckView from "./components/DeckView";
import AddDeck from "./components/AddDeck";
import {StatusBar, View} from "react-native";
import Constants from 'expo-constants';
import {bluegreen} from "./utils/colors";
import { createStackNavigator } from '@react-navigation/stack';
import {createStore} from "redux";
import {Provider} from 'react-redux'
import reducers from "./reducers"
import middleware from "./middleware"
import DeckPreview from "./components/DeckPreview";
import AddCard from "./components/AddCard";
import PlayCard from "./components/PlayCard";
import {setLocalNotification} from "./utils/notification";



function CustomStatusBar () {
    return (
        <View style={{backgroundColor: bluegreen, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={bluegreen} barStyle={"default"}  />
        </View>
    )
}

function Stacks () {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name={"Home"} component={DeckView}  />
            <Stack.Screen name={"Add Deck"} component={AddDeck}/>
            <Stack.Screen name={"Deck Preview"} component={DeckPreview}/>
            <Stack.Screen name={"Add Card"} component={AddCard}/>
            <Stack.Screen name={"Play"} component={PlayCard}/>
        </Stack.Navigator>
    )
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
        };
    }

    async componentDidMount() { //Needed for Native Base's Font
        setLocalNotification();

        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
        this.setState({ isReady: true });
    }


    render() {
        const store = createStore(reducers, middleware);

        if (!this.state.isReady) {
            return <AppLoading />;
        }

        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <NavigationContainer>
                        <CustomStatusBar/>
                        <Stacks />
                    </NavigationContainer>
                </View>
            </Provider>
        );
    }
}

