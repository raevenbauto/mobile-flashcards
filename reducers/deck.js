import {ADD_DECK, ADD_QUESTION, INITIALIZE_DECK, READ_DECKS, REMOVE_DECK} from "../actions/deck";

export function decks (state = null, action){
    switch (action.type){
        case INITIALIZE_DECK:
            return action.decks;

        case READ_DECKS:
            return state;

        case ADD_DECK:
            return {
                ...state,
                [action.title]: {
                    title: action.title,
                    questions: []
                }
            };

        case REMOVE_DECK: {
            delete state[action.title];
            return {
                ...state
            }
        }

        case ADD_QUESTION: {
            return {
                ...state,
                [action.question.title]: {
                    ...state[action.question.title],
                    questions: state[action.question.title].questions.concat([{
                        question: action.question.question,
                        answer: action.question.answer
                    }])
                }
            }
        }

        default:
            return state;
    }
}
