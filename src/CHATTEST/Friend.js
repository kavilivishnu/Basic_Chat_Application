import React, { useState, useRef } from "react";
import {
  myFriendChatCount,
  displayTyping1,
  displayNoTyping1,
  displayNoTyping,
  meArray,
  deletePerson1Message,
  checkingForPerson1,
  checkingForPerson2,
  clearPersonChat
} from "../Actions/Actions";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// some() mehtod. Check it once.

toast.configure();
function Friend() {
  const state2 = useSelector((state) => state);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const monthDayYear = new Date().toLocaleDateString("default", {
    month: "long",
    day: "2-digit",
    year: "numeric"
  });
  const timeStamp = new Date().toLocaleTimeString("default", {
    hour: "numeric",
    minute: "numeric"
  });

  const seen = "👀";
  const dots = "•••";
  const secondPerson = "2ˢᵗPERSON:";
  const status = true;
  const status2 = false;

  const [word, setWord] = useState("");
  const [showFriend, setShowFriend] = useState(false);
  const [moreOptions2, setMoreOptions2] = useState(false);
  const [index, setIndex] = useState("");

  const handleSend = (
    word,
    monthDayYear,
    timeStamp,
    seen,
    dots,
    secondPerson
  ) => {
    dispatch(meArray(word, monthDayYear, timeStamp, seen, dots, secondPerson));
    dispatch(myFriendChatCount());
    setWord("");
    dispatch(displayNoTyping1());
    dispatch(displayNoTyping());
    toast.info("You received a message from PERSON 2", {
      autoClose: 4000,
      position: "top-left"
    });
  };

  const handleReply = (reply) => {
    inputRef.current.focus();
    setWord(reply + "\n" + "↪" + " ");
  };

  const handleChange = (e) => {
    setWord(e.target.value);
    if (e.target.value) {
      dispatch(displayTyping1());
    } else {
      dispatch(displayNoTyping1());
    }
  };

  const handleOptions1 = (val) => {
    setIndex(val);
    setMoreOptions2(!moreOptions2);
  };

  const handleFunctionality = () => {
    setShowFriend(true);
    dispatch(meArray(seen, monthDayYear));
  };

  const handleDeleteForMe = (id) => {
    dispatch(checkingForPerson1(status2));
    const clicked = window.confirm(
      "You're deleting this message for YOU. Click on OK to proceed"
    );
    if (clicked === true) {
      // dispatch(checkingForPerson1(status));
      dispatch(deletePerson1Message(id));
    }
    if (clicked === false) {
      dispatch(checkingForPerson1(status));
    }
  };

  const handleDeleteForEveryone = (id) => {
    dispatch(checkingForPerson1(status));
    const clicked = window.confirm(
      "You're deleting this message for EVERYONE. Click on OK to proceed"
    );
    if (clicked === true) {
      dispatch(deletePerson1Message(id));
    }
    if (clicked === false) {
      dispatch(checkingForPerson1(status2));
    }
  };

  // const handleClearChat = () => {
  //   dispatch(clearPersonChat());
  //   dispatch(checkingForPerson1(status2))
  //   dispatch(checkingForPerson2(status2))
  // }

  return (
    <div style={{ marginLeft: "80%" }}>
      <button onClick={(e) => handleFunctionality(e)}>Show Chat</button>
      <button onClick={() => setShowFriend(false)}>Close Chat</button>
      {/* <button onClick={(e) => handleClearChat(e) }>Clear Chat</button> */}
      {showFriend ? (
        <div>
          <h1>PERSON 2</h1>
          <p> {state2.person1typing} </p>
          <textarea
            ref={inputRef}
            value={word}
            onChange={handleChange}
            rows="3"
          />
          <button
            onClick={() =>
              handleSend(
                word,
                monthDayYear,
                timeStamp,
                seen,
                dots,
                secondPerson
              )
            }
          >
            Send
          </button>
          <h4>{state2.date}</h4>
          {state2.statusforperson2 ? (
            <div>
              {state2.person1.map((items, id) => (
                <>
                  <div key={id}>
                    <p>
                      <b>{items.firstperson}</b> {items.word}
                    </p>
                    <p>
                      <span
                        style={{
                          marginTop: "-5%",
                          marginLeft: "40px",
                          marginRight: "16px"
                        }}
                      >
                        {items.timestamp}
                      </span>
                    </p>
                    <p>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => handleOptions1(items.id)}
                      >
                        {items.dots}
                      </span>
                    </p>
                    {moreOptions2 ? (
                      <div>
                        {items.id === index ? (
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <button onClick={() => handleReply(items.word)}>
                              Reply
                            </button>
                            <br />
                            <button
                              onClick={() =>
                                dispatch(deletePerson1Message(items.id))
                              }
                            >
                              Delete For Me
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              ))}
            </div>
          ) : (
            <div>
              {state2.person1.map((items, id) => (
                <div key={id}>
                  <p>
                    <b>{items.secondperson}</b> {items.word1}
                  </p>
                  <span style={{ marginTop: "-5%", marginLeft: "40px" }}>
                    {items.timestamp1}
                  </span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleOptions1(items.id)}
                  >
                    {items.dots1}
                  </span>
                  {moreOptions2 ? (
                    <div>
                      {items.id === index ? (
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <button onClick={() => handleReply(items.word1)}>
                            Reply
                          </button>
                          <button onClick={() => handleDeleteForMe(items.id)}>
                            Delete For Me
                          </button>
                          <button
                            onClick={() => handleDeleteForEveryone(items.id)}
                          >
                            Delete For Everyone
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <h3>Person 2's Chat: HIDDEN</h3>
      )}
    </div>
  );
}

export default Friend;
