import React, { useState, useRef } from 'react';
import {
    personArray,
    copyOfPersonArray,
    myFriendChatCount,
    deletePerson2Message,
    deletePerson1CopyMessage,
    displayTyping1,
    displayNoTyping1,
    displayNoTyping,
    deletePerson2ID,
    deletePerson2CopyMessage,
    meArray,
} from '../Actions/Actions';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
function Friend() {

    const state2 = useSelector((state) => state);
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const seen = "👀";
    const dots = "•••"
    const secondPerson = "2ˢᵗPERSON:"

    const [text, setText] = useState("");
    const [showFriend, setShowFriend] = useState(false);
    const [moreOptions, setMoreOptions] = useState(false);
    const [moreOptions2, setMoreOptions2] = useState(false);
    const [index, setIndex] = useState("");
    const monthDayYear = new Date().toLocaleDateString('default', { month: 'long', day: "2-digit", year: "numeric" });
    const timeStamp = new Date().toLocaleTimeString('default', { hour: "numeric", minute: "numeric" })

    const handleSend = (text, monthDayYear, timeStamp, seen, dots, secondPerson) => {
        dispatch(personArray(text, monthDayYear, timeStamp, seen, dots, secondPerson));
        // dispatch(meArray(text, monthDayYear, timeStamp, seen, dots, secondPerson));
        dispatch(copyOfPersonArray(text, monthDayYear, timeStamp));
        dispatch(myFriendChatCount());
        setText("");
        dispatch(displayNoTyping1())
        dispatch(displayNoTyping())
        toast.info("You received a message from PERSON 2", { autoClose: 4000, position: "top-left" });
    }

    const handleReply = (reply) => {
        inputRef.current.focus();
        setText(reply + "\n" + "↪" + " ");
    }

    const handleChange = (e) => {
        setText(e.target.value);
        if (e.target.value) {
            dispatch(displayTyping1())
        }
        else {
            dispatch(displayNoTyping1())
        }
    }

    const handleDelete = (ID) => {
        dispatch(deletePerson2ID(ID));
        const id = state2.copyOfPerson2[0].id;
        if (id !== ID) {
            dispatch(deletePerson2CopyMessage(id));
        }
    }

    const handleOptions1 = (val) => {
        setIndex(val);
        setMoreOptions(!moreOptions);
        setMoreOptions2(!moreOptions2)
    }

    const handleFunctionality = () => {
        setShowFriend(true);
        dispatch(meArray(seen, monthDayYear));
    }


    return (
        <div style={{ marginLeft: "80%" }} >
            <button onClick={(e) => handleFunctionality(e)} >Show Chat</button>
            <button onClick={() => setShowFriend(false)} >Close Chat</button>
            {showFriend ?
                <div>
                    <h1>PERSON 2</h1>
                    <p> {state2.person1typing} </p>
                    <textarea ref={inputRef} value={text} onChange={handleChange} rows="3" />
                    <button onClick={() => handleSend(text, monthDayYear, timeStamp, seen, dots, secondPerson)} >Send</button>
                    <h4>{state2.date}</h4>
                    {state2.copyOfPerson1.map((items, id) => (
                        <div key={id} style={{ marginRight: "7%" }} >
                            <p style={{ whiteSpace: "pre-line" }} ><b>1ˢᵗPERSON:</b><br /> {items.word}</p>
                            <span style={{ marginTop: "-5%", marginLeft: "40px" }} >{items.timestamp}</span>
                            <span style={{ cursor: "pointer" }} onClick={() => handleOptions1(items.id)} >{dots}</span>
                            { moreOptions ?
                                <div>
                                    {items.id === index ?
                                        <div style={{ display: "flex", flexDirection: "column" }} >
                                            <button onClick={() => handleReply(items.word)} >Reply</button><br />
                                            <button onClick={() => dispatch(deletePerson1CopyMessage(items.id))} >Delete For Me</button>
                                        </div>
                                        :
                                        ""
                                    }
                                </div>
                                :
                                ""
                            }
                        </div>
                    ))}
                    {state2.person2.map((items, id) => (
                        <div key={id} >
                            {items.text.includes("↪") ? <p style={{ whiteSpace: "pre-line" }} ><b>{items.secondPerson}</b><br /> {items.text}</p> : <p><b>{items.secondPerson}</b> {items.text}</p>}
                            <span style={{ marginTop: "-5%", marginLeft: "40px" }} >{items.timestamp}</span>
                            <span style={{ cursor: "pointer" }} onClick={() => handleOptions1(items.id)} >{items.dots}</span>
                            {moreOptions2 ?
                                <div>
                                    {items.id === index ?
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <button onClick={() => handleReply(items.text)} >Reply</button>
                                            <button onClick={() => dispatch(deletePerson2Message(items.id))} >Delete For Me</button>
                                            <button onClick={() => handleDelete(items.id)} >Delete For Everyone</button>
                                        </div>
                                        :
                                        ""
                                    }
                                </div>
                                :
                                ""
                            }
                        </div>
                    ))}
                </div>

                :
                <h3>Person 2's Chat: HIDDEN</h3>}
        </div>
    )
}

export default Friend;
