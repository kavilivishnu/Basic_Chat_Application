import React, { useState, useRef } from 'react';
import {
    meArray,
    copyOfMeArray,
    myChatCount,
    deletePerson1Message,
    deletePerson2CopyMessage,
    displayTyping,
    displayNoTyping1,
    displayNoTyping,
    deletePerson1CopyMessage,
    deletePersonID,
    personArray,
} from '../Actions/Actions';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// BACKGROUND COLOR FOR THIS APP "#dab98b"

toast.configure()
function Me() {

    const fetching = useSelector((state) => state);
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    const [word, setWord] = useState("");
    const [showMe, setShowMe] = useState(false);
    const [moreOptions, setMoreOptions] = useState(false);
    const [moreOptions2, setMoreOptions2] = useState(false);
    const [index, setIndex] = useState("");
    const monthDayYear = new Date().toLocaleDateString('default', { month: 'long', day: "2-digit", year: "numeric" });
    const timeStamp = new Date().toLocaleTimeString('default', { hour: "numeric", minute: "numeric" })
    const seen = "👀";
    const dots = "•••"
    const firstPerson = "1ˢᵗPERSON:"

    const handleSend = (word, monthDayYear, timeStamp, delivered, seen, dots, firstPerson) => {
        dispatch(meArray(word, monthDayYear, timeStamp, delivered, seen, dots, firstPerson));
        dispatch(copyOfMeArray(word, monthDayYear, timeStamp));
        dispatch(myChatCount());
        setWord("");
        dispatch(displayNoTyping())
        dispatch(displayNoTyping1())
        toast.info("You received a message from PERSON 1", { autoClose: 4000, position: "top-right" });
    }

    const handleReply = (reply) => {
        inputRef.current.focus();
        setWord(reply + "\n" + "↪" + " ");
        setMoreOptions(false);
        setMoreOptions2(false);
    }

    const handleChange = (e) => {
        setWord(e.target.value)
        if (e.target.value) {
            dispatch(displayTyping())
        }
        else {
            dispatch(displayNoTyping())
        }
    }

    const handleDelete = (ID) => {
        setMoreOptions(false);
        dispatch(deletePersonID(ID));
        const id = fetching.copyOfPerson1[0].id;
        if (id !== ID) {
            dispatch(deletePerson1CopyMessage(id));
        }
    }

    const handleOptions1 = (val) => {
        setIndex(val);
        setMoreOptions(!moreOptions);
        setMoreOptions2(!moreOptions2)
    }

    const handleFunctionality = () => {
        dispatch(personArray(seen, monthDayYear))
        setShowMe(true);
    }

    return (
        <div style={{ float: "left", marginLeft: "5%" }} >
            <button onClick={(e) => handleFunctionality(e)} >Show My Chat</button>
            <button onClick={() => setShowMe(false)} >Close My Chat</button>
            {showMe ?
                <div style={{ marginLeft: "5%" }} >
                    <h1>PERSON 1</h1>
                    <p> {fetching.person2typing} </p>
                    <textarea ref={inputRef} value={word} onChange={handleChange} rows="3" />
                    <button onClick={() => handleSend(word, monthDayYear, timeStamp, seen, dots, firstPerson)}>Send</button><br /><br />
                    <h4>{fetching.date}</h4>
                    {fetching.person1.map((items, id) => (
                        <>
                            <div key={id} >
                                {items.word.includes("↪") ? <p style={{ whiteSpace: "pre-line", marginRight: "16px" }} ><br /><b>{items.firstperson}</b> {items.word}</p> : <p><b>{items.firstperson}</b> {items.word}</p>}
                                <p><span style={{ marginTop: "-5%", marginLeft: "40px", marginRight: "16px" }} >{items.timestamp}</span></p>
                                <p><span style={{ cursor: "pointer" }} onClick={() => handleOptions1(items.id)} >{items.dots}</span></p>
                                {
                                    moreOptions ?
                                        <div>
                                            {items.id === index ?
                                                <div style={{ display: "flex", flexDirection: "column" }} >
                                                    <button onClick={() => handleReply(items.word)} >Reply</button><br />
                                                    <button onClick={() => dispatch(deletePerson1Message(items.id))} >Delete For Me</button><br />
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
                        </>
                    ))}
                    {fetching.copyOfPerson2.map((items, id) => (
                        <div key={id} >
                            <p style={{ whiteSpace: "pre-line" }} ><b>2ⁿᵈPERSON:</b><br /> {items.text}</p>
                            <span style={{ marginTop: "-5%", marginLeft: "40px", marginRight: "16px" }} >{items.timestamp}</span>
                            <span style={{ cursor: "pointer" }} onClick={() => handleOptions1(items.id)} >{dots}</span>
                            { moreOptions2 ?
                                <div >
                                    {items.id === index ?
                                        <div style={{ display: "flex", flexDirection: "column" }} >
                                            <button onClick={() => handleReply(items.text)} >Reply</button><br />
                                            <button onClick={() => dispatch(deletePerson2CopyMessage(items.id))} >Delete For Me</button>
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
                <h3>Person 1's Chat: HIDDEN</h3>
            }
        </div >
    )
}

export default Me;

