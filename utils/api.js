import {AsyncStorage} from "react-native";

export const DECK_STORAGE_KEY = "Flashcards:key";

export function addDeckToStorage(title){
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [title]: {
            title,
            questions: []
        }
    }))
}

export function removeDeckToStorage(title){
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results);
            data[title] = undefined;
            delete data[title];
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data));
        })
}

export function addQuestionToStorage (question){
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results);

            data[question.title] = {
                ...data[question.title],
                questions: data[question.title].questions.concat([{
                        question: question.question,
                        answer: question.answer}]),
                };

            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data));
        });
}

export function initialData(){
    return {
        React: {
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                }
            ]
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        }
    }
}
