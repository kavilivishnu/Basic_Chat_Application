import {
    ME_ARRAY,
    COPY_OF_ME_ARRAY,
    PERSON_ARRAY,
    COPY_OF_PERSON_ARRAY,
    MY_CHAT_COUNT,
    MY_FRIEND_CHAT_COUNT,
    DELETE_PERSON1_MESSAGE,
    DELETE_PERSON2_MESSAGE,
    DELETE_PERSON1_COPY_MESSAGE,
    DELETE_PERSON2_COPY_MESSAGE,
    DISPLAY_TYPING,
    DISPLAY_NO_TYPING,
    DISPLAY_TYPING1,
    DISPLAY_NO_TYPING1,
    DELETE_PERSON1_ID,
    DELETE_PERSON2_ID,
} from '../Actions/Actions';
import { v4 as uuidv4 } from "uuid";

export const chatArray = {
    person1: [],
    person2: [],
    copyOfPerson1: [],
    copyOfPerson2: [],
    date: "",
    mychatcount: 0,
    myfriendchatcount: 0,
    person1typing: "",
    person2typing: "",
}

export const Reducer = (state = chatArray, action) => {
    switch (action.type) {
        case ME_ARRAY:
            const presentDate = action.monthDayYear
            const me = [
                ...state.person1,
                {
                    id: uuidv4(),
                    word: action.word,
                    timestamp: action.timeStamp,
                    date: action.monthDayYear,
                    seen: action.seen,
                    dots: action.dots,
                    firstperson: action.firstPerson
                }
            ]
            return {
                ...state,
                person1: me,
                date: presentDate
            }
        case COPY_OF_ME_ARRAY:
            const presentDateCopy = action.monthDayYear
            const meCopy = [
                ...state.copyOfPerson1,
                {
                    id: uuidv4(),
                    word: action.word,
                    timestamp: action.timeStamp,
                }
            ]
            return {
                ...state,
                copyOfPerson1: meCopy,
                date: presentDateCopy
            }
        case PERSON_ARRAY:
            const currentDate = action.monthDayYear
            const otherPerson = [
                ...state.person2,
                {
                    id: uuidv4(),
                    text: action.text,
                    timestamp: action.timeStamp,
                    seen: action.seen,
                    dots: action.dots,
                    secondPerson: action.secondPerson
                }
            ]
            return {
                ...state,
                person2: otherPerson,
                date: currentDate
            }
        case COPY_OF_PERSON_ARRAY:
            const currentDateCopy = action.monthDayYear
            const otherPersonCopy = [
                ...state.copyOfPerson2,
                {
                    id: uuidv4(),
                    text: action.text,
                    timestamp: action.timeStamp
                }
            ]
            return {
                ...state,
                copyOfPerson2: otherPersonCopy,
                date: currentDateCopy
            }
        case MY_CHAT_COUNT:
            const myCount = state.mychatcount + 1;
            return {
                ...state,
                mychatcount: myCount
            }
        case MY_FRIEND_CHAT_COUNT:
            const friendCount = state.myfriendchatcount + 1;
            return {
                ...state,
                myfriendchatcount: friendCount
            }
        case DELETE_PERSON1_MESSAGE:
            const indexOfPerson1 = action.id;
            const deleteMessageFromPerson1 = state.person1.filter((individualItem) => individualItem.id !== indexOfPerson1);
            return {
                ...state,
                person1: deleteMessageFromPerson1,
            }
        case DELETE_PERSON2_MESSAGE:
            const indexOfPerson2 = action.id;
            const deleteMessageFromPerson2 = state.person2.filter((individualItem) => individualItem.id !== indexOfPerson2);
            return {
                ...state,
                person2: deleteMessageFromPerson2,
            }
        case DELETE_PERSON1_COPY_MESSAGE:
            const indexDelete1 = action.id;
            const deleteMessageFromPerson1Copy = state.copyOfPerson1.filter((individualItem) => individualItem.id !== indexDelete1);
            return {
                ...state,
                copyOfPerson1: deleteMessageFromPerson1Copy,
            }
        case DELETE_PERSON2_COPY_MESSAGE:
            const indexDelete2 = action.id;
            const deleteMessageFromPerson2Copy = state.copyOfPerson2.filter((individualItem) => individualItem.id !== indexDelete2);
            return {
                ...state,
                copyOfPerson2: deleteMessageFromPerson2Copy,
            }
        case DISPLAY_TYPING:
            const indicationOfPerson1 = "Person1 is typing...";
            return {
                ...state,
                person1typing: indicationOfPerson1,
            }
        case DISPLAY_NO_TYPING:
            const indication2 = " ";
            return {
                ...state,
                person1typing: indication2,
            }
        case DISPLAY_TYPING1:
            const indicationOfPerson2 = "Person2 is typing...";
            return {
                ...state,
                person2typing: indicationOfPerson2
            }
        case DISPLAY_NO_TYPING1:
            const indicationFinal = " ";
            return {
                ...state,
                person2typing: indicationFinal
            }
        case DELETE_PERSON1_ID:
            const indexOfPersonID = action.ID;
            const deleteMessageFromPersonID = state.person1.filter((individualItem) => individualItem.id !== indexOfPersonID);
            return {
                ...state,
                person1: deleteMessageFromPersonID,
            }
        case DELETE_PERSON2_ID:
            const indexOfPerson2ID = action.ID;
            const deleteMessageFromPerson2ID = state.person2.filter((individualItem) => individualItem.id !== indexOfPerson2ID);
            return {
                ...state,
                person2: deleteMessageFromPerson2ID,
            }
        default:
            return state;
    }
}

export default Reducer;

