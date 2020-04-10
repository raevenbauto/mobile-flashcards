import React, {Component} from "react";
import { Container, Text, Button } from 'native-base';
import {StyleSheet, TextInput, View} from "react-native";
import {bluegreen, gray} from "../utils/colors";
import {addDeck, handleAddDeck} from "../actions/deck";
import {connect} from "react-redux";
import {addDeckToStorage} from "../utils/api";
import { StackActions } from '@react-navigation/native';


class AddDeck extends Component{
    state = {
        newDeckTitle: "",
        isAddDisabled: true
    };

    componentDidMount() {
        const {navigation} = this.props;
        navigation.setOptions({title: "Add Deck"})
    }

    onAddPress = async () => {
        const {navigation, dispatch} = this.props;
        const {newDeckTitle} = this.state;
        await addDeckToStorage(newDeckTitle);
        dispatch(handleAddDeck(newDeckTitle,
            () => {
                navigation.dispatch({
                    ...StackActions.replace("Deck Preview", {title: newDeckTitle}),
                    source: "Add Card",
                });
            }
        ));
    };

    onNewDeckTextChange = newText => {
        this.setState({ newDeckTitle: newText });
        if (newText){
            this.setState({isAddDisabled: false});
        }

        else{
            this.setState({isAddDisabled: true});
        }

    };

    render(){
        const {isAddDisabled} = this.state;
        return (
            <Container style={[styles.container]}>
                <View style={styles.center}>
                    <Text style={{fontSize: 20}}>
                        What is the title of your new deck?
                    </Text>
                </View>

                <View>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 4}}
                        onChangeText={(text) => this.onNewDeckTextChange(text)}
                        value={this.state.newDeckTitle}
                        autoFocus
                    />
                </View>

                <View style={styles.center}>
                    <Button style={{backgroundColor: isAddDisabled ? gray : bluegreen}} onPress={this.onAddPress} disabled={isAddDisabled}>
                        <Text>
                            Add Deck
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
    }
});

export default connect()(AddDeck);
