import React from 'react';
import { useSelector } from 'react-redux';

function Nav() {

    const fetchState = useSelector((state) => state);

    return (
        <div style={{ textAlign: "center" }} >
            <h1>Chat Application</h1><br />
            <h2>My Messages ( {fetchState.myfriendchatcount} ) | Friend Messages ( {fetchState.mychatcount} ) </h2>
            <br /><br />
        </div>
    )
}

export default Nav
