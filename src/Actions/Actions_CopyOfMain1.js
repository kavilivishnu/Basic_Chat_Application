export const ME_ARRAY = "ME_ARRAY";
export const PERSON_ARRAY = "PERSON_ARRAY";
export const COPY_OF_ME_ARRAY = "COPY_OF_ME_ARRAY";
export const COPY_OF_PERSON_ARRAY = "COPY_OF_PERSON_ARRAY";
export const MY_CHAT_COUNT = "MY_CHAT_COUNT";
export const MY_FRIEND_CHAT_COUNT = "MY_FRIEND_CHAT_COUNT";
export const DELETE_PERSON1_MESSAGE = "DELETE_PERSON1_MESSAGE,"
export const DELETE_PERSON2_MESSAGE = "DELETE_PERSON2_MESSAGE,"
export const DELETE_PERSON1_COPY_MESSAGE = "DELETE_PERSON1_COPY_MESSAGE"
export const DELETE_PERSON2_COPY_MESSAGE = "DELETE_PERSON2_COPY_MESSAGE"
export const DISPLAY_TYPING = "DISPLAY_TYPING";
export const DISPLAY_NO_TYPING = "DISPLAY_NO_TYPING";
export const DISPLAY_TYPING1 = "DISPLAY_TYPING1";
export const DISPLAY_NO_TYPING1 = "DISPLAY_NO_TYPING1";
export const DELETE_PERSON1_ID = "DELETE_PERSON1_ID"
export const DELETE_PERSON2_ID = "DELETE_PERSON2_ID"



export function meArray(word, monthDayYear, timeStamp, seen, dots, firstPerson) {
    return {
        word,
        monthDayYear,
        timeStamp,
        seen,
        dots,
        firstPerson,
        type: ME_ARRAY,
    }
}

export function copyOfMeArray(word, monthDayYear, timeStamp) {
    return {
        word,
        monthDayYear,
        timeStamp,
        type: COPY_OF_ME_ARRAY,
    }
}

export function personArray(text, monthDayYear, timeStamp, seen, dots, secondPerson) {
    return {
        text,
        monthDayYear,
        timeStamp,
        seen,
        dots,
        secondPerson,
        type: PERSON_ARRAY,
    }
}

export function copyOfPersonArray(text, monthDayYear, timeStamp) {
    return {
        text,
        monthDayYear,
        timeStamp,
        type: COPY_OF_PERSON_ARRAY,
    }
}

export function myChatCount() {
    return {
        type: MY_CHAT_COUNT
    }
}

export function myFriendChatCount() {
    return {
        type: MY_FRIEND_CHAT_COUNT
    }
}

export function deletePerson1Message(id) {
    return {
        type: DELETE_PERSON1_MESSAGE,
        id,
    }
}

export function deletePerson2Message(id) {
    return {
        type: DELETE_PERSON2_MESSAGE,
        id
    }
}

export function deletePerson1CopyMessage(id) {
    return {
        type: DELETE_PERSON1_COPY_MESSAGE,
        id,
    }
}

export function deletePerson2CopyMessage(id) {
    return {
        type: DELETE_PERSON2_COPY_MESSAGE,
        id
    }
}

export function displayTyping() {
    return {
        type: DISPLAY_TYPING
    }
}

export function displayNoTyping() {
    return {
        type: DISPLAY_NO_TYPING
    }
}

export function displayTyping1() {
    return {
        type: DISPLAY_TYPING1
    }
}

export function displayNoTyping1() {
    return {
        type: DISPLAY_NO_TYPING1
    }
}

export function deletePersonID(ID) {
    return {
        type: DELETE_PERSON1_ID,
        ID
    }
}

export function deletePerson2ID(ID) {
    return {
        type: DELETE_PERSON2_ID,
        ID
    }
}



