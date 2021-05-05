export const ME_ARRAY = "ME_ARRAY";
export const MY_CHAT_COUNT = "MY_CHAT_COUNT";
export const MY_FRIEND_CHAT_COUNT = "MY_FRIEND_CHAT_COUNT";
export const DELETE_PERSON1_MESSAGE = "DELETE_PERSON1_MESSAGE,";
export const DELETE_PERSON2_MESSAGE = "DELETE_PERSON2_MESSAGE,";
export const DISPLAY_TYPING = "DISPLAY_TYPING";
export const DISPLAY_NO_TYPING = "DISPLAY_NO_TYPING";
export const DISPLAY_TYPING1 = "DISPLAY_TYPING1";
export const DISPLAY_NO_TYPING1 = "DISPLAY_NO_TYPING1";
export const DELETE_PERSON1_ID = "DELETE_PERSON1_ID";
export const CHECK_AND_DELETE = "CHECK_AND_DELETE";
export const CHECKING_FOR_PERSON1 = "CHECKING_FOR_PERSON1";
export const CHECKING_FOR_PERSON2 = "CHECKING_FOR_PERSON2";
export const CLEAR_PERSON_CHAT = "CLEAR_PERSON_CHAT"

export function meArray(
    word,
    monthDayYear,
    timeStamp,
    seen,
    dots,
    firstPerson,
    secondPerson,
    status
) {
    return {
        word,
        monthDayYear,
        timeStamp,
        seen,
        dots,
        firstPerson,
        secondPerson,
        status,
        type: ME_ARRAY
    };
}

export function myChatCount() {
    return {
        type: MY_CHAT_COUNT
    };
}

export function myFriendChatCount() {
    return {
        type: MY_FRIEND_CHAT_COUNT
    };
}

export function deletePerson1Message(id) {
    return {
        type: DELETE_PERSON1_MESSAGE,
        id
    };
}

export function deletePerson2Message(id) {
    return {
        type: DELETE_PERSON2_MESSAGE,
        id
    };
}

export function displayTyping() {
    return {
        type: DISPLAY_TYPING
    };
}

export function displayNoTyping() {
    return {
        type: DISPLAY_NO_TYPING
    };
}

export function displayTyping1() {
    return {
        type: DISPLAY_TYPING1
    };
}

export function displayNoTyping1() {
    return {
        type: DISPLAY_NO_TYPING1
    };
}

export function checkingForPerson1(status) {
    return {
        type: CHECKING_FOR_PERSON1,
        status
    };
}

export function checkingForPerson2(status) {
    return {
        type: CHECKING_FOR_PERSON2,
        status
    };
}

export function clearPersonChat() {
    return {
        type: CLEAR_PERSON_CHAT
    }
}
