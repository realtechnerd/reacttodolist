import React from 'react';
import "./style.css";
import TodoInput from "./TodoInput.jsx";
import Items from "./Items";

class MainContent extends React.Component {
    render() { 
        return ( 
            <div className="MainContent">
                <TodoInput/>
                <Items text={this.props.text}/>
            </div>
         );
    }
}
 
export default MainContent;