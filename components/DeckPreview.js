import React, {Component} from "react";
import {connect} from "react-redux";
import {StyleSheet, View} from "react-native";
import { Container, Button, Text, Icon} from 'native-base';
import {bluegreen} from "../utils/colors";
import {handleRemoveDeck} from "../actions/deck";
import {numOfQuestionsFormatter} from "../utils/helper";

class DeckPreview extends Component{
    onAddCardPress = () => {
        const {navigation, currDeck} = this.props;
        navigation.navigate("Add Card", {title: currDeck.title})
    };

    onPlayCardPress = () => {
        const {navigation, currDeck} = this.props;
        navigation.navigate("Play", {title: currDeck.title})
    };

    onRemovePress = () => {
        const {currDeck, dispatch, navigation} = this.props;
        dispatch(handleRemoveDeck(currDeck.title, () => navigation.goBack()));
    };

    render(){
        const {currDeck} = this.props;
        return (
            <Container style={styles.container}>
                <View style={{alignItems: "center"}}>
                    <Text style={{fontSize: 50}}>
                        {
                            currDeck ? currDeck.title : null
                        }
                    </Text>

                    {
                        currDeck
                        ?   <Text>
                                {numOfQuestionsFormatter(currDeck.questions.length)}
                            </Text>
                        : null
                    }
                </View>

                <View style={[styles.center, styles.buttonMargin]}>
                    <Button iconLeft block style={{backgroundColor: bluegreen}} onPress={this.onPlayCardPress}>
                        <Icon name='play' />
                        <Text>
                            Start Quiz
                        </Text>
                    </Button>
                </View>

                <View style={[styles.center, styles.buttonMargin]}>
                    <Button iconLeft block style={{backgroundColor: bluegreen}} onPress={this.onAddCardPress}>
                        <Icon name='add' />
                        <Text>
                            Add Cards
                        </Text>
                    </Button>
                </View>

                <View style={[styles.center, styles.buttonMargin]}>
                    <Button iconLeft block danger onPress={this.onRemovePress}>
                        <Icon name='trash' />
                        <Text>
                            Remove Deck
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
        paddingTop: 120,
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
export default connect(mapStateToProps)(DeckPreview);
