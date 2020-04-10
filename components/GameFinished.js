import React from "react";
import {Text, View, Button, Icon,} from "native-base"
import {StyleSheet} from "react-native";
import {bluegreen} from "../utils/colors";

export function GameFinished (props){
    return (
        <View style={styles.center}>
            <Text style={{fontSize: 30}}>
                You finished the game!
            </Text>

            <Text style={{fontSize: 25}}>
                Your score is {((props.correct/(props.correct+props.incorrect)) * 100).toFixed(2)}%.
            </Text>

            <View style={[styles.center, styles.buttonMargin]}>
                <Button iconLeft block style={{backgroundColor: bluegreen}} onPress={() => props.playAgain()}>
                    <Icon name='ios-refresh' />
                    <Text>
                        Play Again
                    </Text>
                </Button>
            </View>

            <View style={[styles.center, styles.buttonMargin]}>
                <Button iconLeft block style={{backgroundColor: bluegreen}} onPress={() => props.goHome()}>
                    <Icon name='ios-home' />
                    <Text>
                        Go Home
                    </Text>
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
    },

    center: {
        justifyContent: "center",
        alignItems: "center",
        margin: 10
    },

    buttonMargin: {
        marginTop: 20
    }
});
