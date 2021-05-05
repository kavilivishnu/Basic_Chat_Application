import {
    ME_ARRAY,
    MY_CHAT_COUNT,
    MY_FRIEND_CHAT_COUNT,
    DELETE_PERSON1_MESSAGE,
    DISPLAY_TYPING,
    DISPLAY_NO_TYPING,
    DISPLAY_TYPING1,
    DISPLAY_NO_TYPING1,
    CHECKING_FOR_PERSON1,
    CHECKING_FOR_PERSON2,
    CLEAR_PERSON_CHAT
} from "../Actions/Actions";
import { v4 as uuidv4 } from "uuid";

export const chatArray = {
    person1: [],
    date: "",
    mychatcount: 0,
    myfriendchatcount: 0,
    person1typing: "",
    person2typing: "",
    statusforperson1: false,
    statusforperson2: false
};

export const Reducer = (state = chatArray, action) => {
    switch (action.type) {
        case ME_ARRAY:
            const presentDate = action.monthDayYear;
            const me = [
                ...state.person1,
                {
                    id: uuidv4(),
                    word: action.word,
                    timestamp: action.timeStamp,
                    date: action.monthDayYear,
                    seen: action.seen,
                    dots: action.dots,
                    firstperson: action.firstPerson,
                    secondperson: action.secondPerson
                },
                {
                    id: uuidv4(),
                    word1: action.word,
                    timestamp1: action.timeStamp,
                    date1: action.monthDayYear,
                    seen1: action.seen,
                    dots1: action.dots
                }
            ];
            return {
                ...state,
                person1: me,
                date: presentDate
            };
        case MY_CHAT_COUNT:
            const myCount = state.mychatcount + 1;
            return {
                ...state,
                mychatcount: myCount
            };
        case MY_FRIEND_CHAT_COUNT:
            const friendCount = state.myfriendchatcount + 1;
            return {
                ...state,
                myfriendchatcount: friendCount
            };
        case DELETE_PERSON1_MESSAGE:
            const indexOfPerson1 = action.id;
            const deleteMessageFromPerson1 = state.person1.filter(
                (individualItem) => individualItem.id !== indexOfPerson1
            );
            return {
                ...state,
                person1: deleteMessageFromPerson1
            };
        case DISPLAY_TYPING:
            const indicationOfPerson1 = "Person1 is typing...";
            return {
                ...state,
                person1typing: indicationOfPerson1
            };
        case DISPLAY_NO_TYPING:
            const indication2 = " ";
            return {
                ...state,
                person1typing: indication2
            };
        case DISPLAY_TYPING1:
            const indicationOfPerson2 = "Person2 is typing...";
            return {
                ...state,
                person2typing: indicationOfPerson2
            };
        case DISPLAY_NO_TYPING1:
            const indicationFinal = " ";
            return {
                ...state,
                person2typing: indicationFinal
            };
        case CHECKING_FOR_PERSON1:
            const Status = action.status;
            return {
                ...state,
                statusforperson1: Status
            };
        case CHECKING_FOR_PERSON2:
            const StatusPerson2 = action.status;
            return {
                ...state,
                statusforperson2: StatusPerson2
            };
        case CLEAR_PERSON_CHAT:
            const clear = []
            return {
                ...state,
                person1: clear
            }
        default:
            return state;
    }
};

export default Reducer;
