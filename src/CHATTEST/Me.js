import React, { useState, useRef } from "react";
import {
  meArray,
  myChatCount,
  deletePerson1Message,
  displayTyping,
  displayNoTyping1,
  displayNoTyping,
  checkingForPerson2,
  checkingForPerson1,
  clearPersonChat
} from "../Actions/Actions";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// BACKGROUND COLOR FOR THIS APP "#dab98b" 

toast.configure();
function Me() {
  const fetching = useSelector((state) => state);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [word, setWord] = useState("");
  const [showMe, setShowMe] = useState(false);
  const [moreOptions, setMoreOptions] = useState(false);
  const [moreOptions2, setMoreOptions2] = useState(false);
  const [index, setIndex] = useState("");
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
  const firstPerson = "1ˢᵗPERSON:";
  const status = true;
  const status2 = false;

  const handleSend = (
    word,
    monthDayYear,
    timeStamp,
    seen,
    dots,
    firstPerson
  ) => {
    dispatch(meArray(word, monthDayYear, timeStamp, seen, dots, firstPerson));
    dispatch(myChatCount());
    setWord("");
    dispatch(displayNoTyping());
    dispatch(displayNoTyping1());
    toast.info("You received a message from PERSON 1", {
      autoClose: 4000,
      position: "top-right"
    });
  };

  const handleReply = (reply) => {
    inputRef.current.focus();
    setWord(reply + "\n" + "↪" + " ");
    setMoreOptions(false);
    setMoreOptions2(false);
  };

  const handleChange = (e) => {
    setWord(e.target.value);
    if (e.target.value) {
      dispatch(displayTyping());
    } else {
      dispatch(displayNoTyping());
    }
  };

  const handleOptions1 = (val) => {
    setIndex(val);
    setMoreOptions(!moreOptions);
    setMoreOptions2(!moreOptions2);
  };

  const handleFunctionality = () => {
    setShowMe(true);
    // dispatch(meArray(null, null, null, seen));
    dispatch(meArray(seen, monthDayYear));
  };

  const handleDeleteForMe = (id) => {
    dispatch(checkingForPerson2(status2));
    const clicked = window.confirm(
      "You're deleting this message for YOU. Click on OK to proceed"
    );
    if (clicked === true) {
      // dispatch(checkingForPerson1(status));
      dispatch(deletePerson1Message(id));
    }
    if (clicked === false) {
      dispatch(checkingForPerson2(status));
    }
  };

  const handleDeleteForEveryone = (id) => {
    dispatch(checkingForPerson2(status));
    const clicked = window.confirm(
      "You're deleting this message for EVERYONE. Click on OK to proceed"
    );
    if (clicked === true) {
      dispatch(deletePerson1Message(id));
    }
    if (clicked === false) {
      dispatch(checkingForPerson2(status2));
    }
  };

  // const handleClearChat = () => {
  //   dispatch(clearPersonChat());
  //   dispatch(checkingForPerson1(status2))
  //   dispatch(checkingForPerson2(status2))
  // }

  return (
    <div style={{ float: 'left', marginLeft: "50px" }}>
      <button onClick={(e) => handleFunctionality(e)}>Show My Chat</button>
      <button onClick={() => setShowMe(false)}>Close My Chat</button>
      {/* <button onClick={(e) => handleClearChat(e) }>Clear Chat</button> */}
      {showMe ? (
        <div>
          <h1>PERSON 1</h1>
          <p> {fetching.person2typing} </p>
          <textarea
            ref={inputRef}
            value={word}
            onChange={handleChange}
            rows="3"
          />
          <button
            onClick={() =>
              handleSend(word, monthDayYear, timeStamp, seen, dots, firstPerson)
            }
          >
            Send
          </button>
          <br />
          <br />
          <h4>{fetching.date}</h4>
          {fetching.statusforperson1 ? (
            <div>
              {fetching.person1.map((items, id) => (
                <>
                  <div key={id}>
                    <p>
                      <b>{items.firstperson}</b> {items.word1}
                    </p>
                    <p>
                      <span
                        style={{
                          marginTop: "-5%",
                          marginLeft: "40px",
                          marginRight: "16px"
                        }}
                      >
                        {items.timestamp1}
                      </span>
                    </p>
                    <p>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => handleOptions1(items.id)}
                      >
                        {items.dots1}
                      </span>
                    </p>
                    {moreOptions ? (
                      <div>
                        {items.id === index ? (
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <button onClick={() => handleReply(items.word1)}>
                              Reply
                            </button>
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
              {fetching.person1.map((items, id) => (
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
                    {moreOptions ? (
                      <div>
                        {items.id === index ? (
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <button onClick={() => handleReply(items.word)}>
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
                </>
              ))}
            </div>
          )}
        </div>
      ) : (
        <h3>Person 1's Chat: HIDDEN</h3>
      )}
    </div>
  );
}

export default Me;
