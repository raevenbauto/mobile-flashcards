import React, {Component} from "react"
import {Container, Text, DeckSwiper, View} from "native-base"
import {connect} from "react-redux";
import {StyleSheet} from "react-native";
import {gray} from "../utils/colors";
import CardDisplay from "./CardDisplay";
import {GameFinished} from "./GameFinished";
import { StackActions } from '@react-navigation/native';

class PlayCard extends Component{
    state = {
        correct: 0,
        incorrect: 0,
        loopAgain: false
    };

    render(){
        const {questions, navigation, title} = this.props;
        const {correct, incorrect, loopAgain} = this.state;

        return (
            <Container style={styles.container}>
                <Text>{title}</Text>

                <View>
                    <DeckSwiper
                        ref={(c) => this._deckSwiper = c}
                        looping={loopAgain}
                        dataSource={questions}
                        renderEmpty={() => {
                            return (
                                <GameFinished
                                    correct={correct}
                                    incorrect={incorrect}
                                    goHome={() => navigation.navigate("Home")}
                                    playAgain={() => {
                                        navigation.dispatch(StackActions.replace('Play', {title: title}))
                                    }}
                                />
                            )
                        }}
                        renderItem={(item) => {
                            let index = questions.findIndex(f => f.question === item.question);

                            return (
                                <CardDisplay
                                    item={item}
                                    index={index}
                                    totalQuestions={questions.length}
                                    correctSwipe={() => {
                                        this.setState(prevState => ({
                                            correct: prevState.correct + 1
                                        }));
                                        this._deckSwiper._root.swipeRight()
                                    }}
                                    wrongSwipe={() => {
                                        this.setState(prevState => ({
                                            incorrect: prevState.incorrect + 1
                                        }));
                                        this._deckSwiper._root.swipeLeft()
                                    }} />
                            )
                        }}
                    />
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
        fontSize: 50,
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
        position: "absolute",
        bottom: 150,
        left: 0,
        right: 0,
        justifyContent: 'space-around',
        padding: 15
    },

    buttonContainer2: {
        flexDirection: "row",
        flex: 1,
        position: "absolute",
        bottom: 100,
        left: 0,
        right: 0,
        justifyContent: 'space-around',
    }
});

function mapStateToProps(state, ownProps){
    const title = ownProps.route.params.title;

    return {
        questions: state.decks[title].questions,
        title
    }
}


export default connect(mapStateToProps)(PlayCard)
