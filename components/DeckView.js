import React, {Component} from "react";
import {FlatList} from "react-native";
import { Container, Icon, Fab} from 'native-base';
import {bluegreen} from "../utils/colors";
import {connect} from "react-redux";
import {handleInitializeDeck} from "../actions/deck";
import {DeckItem} from "./DeckItem";

class DeckView extends Component{
    componentDidMount() {
        const {decks, dispatch} = this.props;

        if (!decks){
            dispatch(handleInitializeDeck())
        }
    }

    constructor(props) {
        super(props);
    }

    fabPress = () => {
        const {navigation} = this.props;
        navigation.navigate("Add Deck")
    };

    render() {
        const {decks, navigation} = this.props;

        return (
            <Container>
                <FlatList
                    data={decks ? Object.values(decks) : null}
                    renderItem={({ item }) => <DeckItem title={item.title}
                                                        questionCount={item.questions.length}
                                                        navigation={navigation}
                                                        key={item.title}
                                                        onPress={() => navigation.navigate("Deck Preview", {title: item.title})}/>}
                    keyExtractor={item => item.title}
                />

                <Fab
                    active={false}
                    direction="up"
                    containerStyle={{ }}
                    style={{ backgroundColor: bluegreen }}
                    position="bottomRight"
                    onPress={this.fabPress}>
                    <Icon name="add" />
                </Fab>
            </Container>
        );
    }
}

function mapStateToProps(state){
    return {
        decks: (state.decks) ? state.decks : null
    }
}

export default connect(mapStateToProps)(DeckView);
