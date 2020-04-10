import React, {Component} from "react";
import {Container, Text, View, Card, Button, Icon} from "native-base"
import {StyleSheet} from "react-native";
import {bluegreen} from "../utils/colors";

class CardDisplay extends Component{
    state = {
        showAnswer: false
    };

    showAnswerPress = () => {
        this.setState((prevState) => ({
            showAnswer: !prevState.showAnswer
        }))
    };

    render(){
        const {item, wrongSwipe, correctSwipe, totalQuestions, index} = this.props;
        const {showAnswer} = this.state;

        return (
            <Container>
                <View>
                    <Card>
                        <View style={[{height: 200}]}>
                            <View>
                                <Text style={{alignSelf: "flex-end", margin: 10}}>
                                    Question: {index + 1}/{totalQuestions}
                                </Text>
                            </View>

                            <View style={[styles.center]}>
                                <Text style={styles.label}>{item.question}</Text>
                            </View>

                            {
                                showAnswer
                                ?   <View style={[styles.center]}>
                                        <Text>{item.answer}</Text>
                                    </View>
                                :   null
                            }
                        </View>
                    </Card>
                </View>

                <View style={styles.buttonContainer}>
                    <Button danger iconLeft onPress={() => wrongSwipe()}>
                        <Icon name="close-circle-outline"/>
                        <Text>Wrong</Text>
                    </Button>

                    <Button success iconLeft onPress={() => correctSwipe()}>
                        <Icon name="checkmark-circle-outline"/>
                        <Text>Correct</Text>
                    </Button>
                </View>

                <View style={styles.buttonContainer2}>
                    <Button danger style={[{backgroundColor: bluegreen}]} iconLeft onPress={() => this.showAnswerPress()}>
                        {
                            showAnswer
                            ?   <Icon name="eye-off"/>
                            :   <Icon name="eye"/>
                        }

                        {
                            showAnswer
                                ?   <Text>Hide Answer</Text>
                                :   <Text>Show Answer</Text>
                        }
                    </Button>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
    },

    center: {
        justifyContent: "center",
        alignItems: "center",
        margin: 10
    },

    label: {
        flexDirection: "row",
        fontSize: 20,
    },

    textInput: {
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4
    },

    buttonContainer: {
        flexDirection: "row",
        flex: 1,
        // position: "absolute",
        // bottom: 510,
        left: 0,
        right: 0,
        justifyContent: 'space-around',
        padding: 15
    },

    buttonContainer2: {
        flexDirection: "row",
        flex: 1,
        // position: "absolute",
        // bottom: 450,
        left: 0,
        right: 0,
        justifyContent: 'space-around',
        padding: 15
    }
});


export default CardDisplay
