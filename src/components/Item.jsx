import React, {useEffect} from 'react';
import "./style.css";
import ReactTooltip from "react-tooltip";

function Item(props) {
    useEffect(() => {
        ReactTooltip.rebuild();
    }, [props.date])
    return(
        <>
        <div className="Item" data-tip={`${props.date}`} onClick={props.delete}>
            <h2>{props.text}</h2>
        </div>
        <ReactTooltip place="left" effect="solid" key={props.id}/> 
        </>
    )
}

export default Item;