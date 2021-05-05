import React, { useState } from 'react';
import { meArray, myChatCount } from '../Actions/Actions';
import { useSelector, useDispatch } from 'react-redux';

function Me() {

    const fetching = useSelector((state) => state);
    const dispatch = useDispatch();

    const [word, setWord] = useState("");
    const [showMe, setShowMe] = useState(false);
    const monthDayYear = new Date().toLocaleDateString('default', { month: 'long', day: "2-digit", year: "numeric" });
    const timeStamp = new Date().toLocaleTimeString('default', { hour: "numeric", minute: "numeric" })

    const handleSend = (word, monthDayYear, timeStamp) => {
        dispatch(meArray(word, monthDayYear, timeStamp));
        dispatch(myChatCount());
        setWord("");
    }

    const handleReply = (reply) => {
        setWord(reply + "\n" + "⤷");
    }

    return (
        <div style={{ float: "left", marginLeft: "7%" }} >
            <button onClick={() => setShowMe(!showMe)} >{showMe ? "Hide My chat" : "Show My Chat"}</button>
            {showMe ?
                <div>
                    <h1>PERSON 1</h1>
                    <textarea value={word} onChange={(e) => setWord(e.target.value)} />
                    <button onClick={() => handleSend(word, monthDayYear, timeStamp)}>Send</button><br /><br />
                    <h4>{fetching.date}</h4>
                    {fetching.person1.map((items, index) => (
                        <div key={index} >
                            {/* <p>ME: {items.word}</p> */}
                            {/* <p>ME: {items.word}</p> style={{ wordSpacing: "9999px" }} */}
                            {items.word.includes("⤷") ? <p style={{ wordSpacing: "9999px" }} ><b>1ˢᵗPERSON:</b> {items.word}</p> : <p><b>1ˢᵗPERSON:</b> {items.word}</p>}
                            <span style={{ marginTop: "-5%", marginLeft: "40px" }} >{items.timestamp}</span>
                            <button onClick={() => handleReply(items.word)} >Reply</button>
                        </div>
                    ))}
                    {fetching.person2.map((items, id) => (
                        <div key={id} >
                            {/* <p>Friend: {items.text}</p> */}
                            {items.text.includes("⤷") ? <p style={{ wordSpacing: "9999px" }} ><b>2ⁿᵈPERSON:</b> {items.text}</p> : <p><b>2ⁿᵈPERSON:</b> {items.text}</p>}
                            <span style={{ marginTop: "-5%", marginLeft: "40px" }} >{items.timestamp}</span>
                            <button onClick={() => handleReply(items.text)} >Reply</button>
                        </div>
                    ))}
                </div>
                :
                <h3>Person 1's Chat: HIDDEN</h3>
            }
        </div>
    )
}

export default Me;

