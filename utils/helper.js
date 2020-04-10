export function numOfQuestionsFormatter (length){
    if (length > 1)
        return `${length} cards`;

    return `${length} card`;
}
