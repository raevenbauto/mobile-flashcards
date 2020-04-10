import {AsyncStorage} from "react-native";
import {addDeckToStorage, addQuestionToStorage, DECK_STORAGE_KEY, initialData, removeDeckToStorage} from "../utils/api";

export const READ_DECKS = "READ_DECKS";
export const ADD_DECK = "ADD_DECK";
export const INITIALIZE_DECK = "INITIALIZE_DECK";
export const REMOVE_DECK = "REMOVE_DECK";
export const ADD_QUESTION = "ADD_QUESTION";

function addDeck (title){
    return {
        type: ADD_DECK,
        title
    }
}

function removeDeck (title){
    return {
        type: REMOVE_DECK,
        title
    }
}

function initializeDecks(decks){
    return {
        type: INITIALIZE_DECK,
        decks
    }
}

function addQuestion (question){
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleInitializeDeck () {
    return async (dispatch) => {
        let results = await AsyncStorage.getItem(DECK_STORAGE_KEY);

        if (results === null){
            await AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(initialData()));
            results = initialData();
            dispatch(initializeDecks(results))
        }

        else if (results !== null){
            const data = JSON.parse(results);
            dispatch(initializeDecks(data))
        }
    }
}

export function handleRemoveDeck(title, cb){
    return async (dispatch) => {
        await removeDeckToStorage(title);
        dispatch(removeDeck(title));
        cb();
    }
}

export function handleAddDeck(title, cb){
    return async (dispatch) => {
        await addDeckToStorage(title);
        dispatch(addDeck(title));
        cb();
    }
}

export function handleAddQuestion(question, cb){
    return async (dispatch) => {
        addQuestionToStorage(question);
        dispatch(addQuestion(question));
        cb();
    }
}
