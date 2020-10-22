import React from 'react';
import "./style.css";
import v from "../../package.json";

function Header() {
    return(
        <div>
            <div className="Header">
                <h1>TaskBuddy v{v.version}</h1>
            </div>
        </div>
    )
}

export default Header;