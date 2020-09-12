import React from 'react';
import "./style.css";

function Item(props) {
    return(
        <div className="Item" onClick={props.delete}>
            <h2>{props.text}</h2>
        </div>
    )
}

export default Item;