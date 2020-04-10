import React, {Component} from "react";
import {Button, Container, Text} from "native-base"
import {StyleSheet, TextInput, View} from "react-native";
import {bluegreen, gray} from "../utils/colors";
import {connect} from "react-redux";
import {handleAddQuestion} from "../actions/deck";

class AddCard extends Component {
    state = {
        question: "",
        answer: "",
        isAddDisabled: true
    };

    onAddPress = () => {
        const {navigation, dispatch, currDeck} = this.props;
        const {question, answer} = this.state;
        dispatch(handleAddQuestion(
            {question,
            answer,
            title: currDeck.title},
            () => navigation.goBack()))
    };

    addCardVerify = () => {
        console.log("verify");
        const {question, answer} = this.state;
        console.log("VERIFY: " + question + " " + answer);

        if (question && answer){
           this.setState({ isAddDisabled: false });
        }

        else{
            this.setState({ isAddDisabled: true });
        }
    };

    onQuestionChange = newText => {
        this.setState({ question: newText });
        const {answer} = this.state;
        if (newText && answer){
            this.setState({ isAddDisabled: false });
        }

        else{
            this.setState({ isAddDisabled: true });
        }
    };

    onAnswerChange = newText => {
        this.setState({ answer: newText });
        const {question} = this.state;
        if (newText && question){
            this.setState({ isAddDisabled: false });
        }

        else{
            this.setState({ isAddDisabled: true });
        }
    };



    render(){
        const {isAddDisabled} = this.state;

        return (
            <Container style={styles.container}>
                <View style={styles.center}>
                    <Text style={styles.label}>
                       Question
                    </Text>
                </View>

                <View>
                    <TextInput
                        style={styles.textInput}
                        autoFocus
                        onChangeText={(text) => this.onQuestionChange(text)}
                        value={this.state.question}
                    />
                </View>

                <View style={styles.center}>
                    <Text style={styles.label}>
                        Answer
                    </Text>
                </View>

                <View>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this.onAnswerChange(text)}
                        value={this.state.answer}
                    />
                </View>

                <View style={styles.center}>
                    <Button style={{backgroundColor: isAddDisabled ? gray : bluegreen}} onPress={this.onAddPress} disabled={this.state.isAddDisabled}>
                        <Text>
                            Add Card
                        </Text>
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
        fontSize: 20
    },

    textInput: {
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4
    }
});

function mapStateToProps(state, ownProps){
    const title = ownProps.route.params.title;

    if (state.decks[title])
        return{
            currDeck: state.decks[title]
        };

    return {
        currDeck: null
    }
}

export default connect(mapStateToProps)(AddCard)
