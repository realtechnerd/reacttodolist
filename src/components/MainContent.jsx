import React from 'react';
import "./style.css";
import TodoInput from "./TodoInput.jsx";

class MainContent extends React.Component {
    render() { 
        return ( 
            <div className="MainContent">
                <TodoInput/>
            </div>
         );
    }
}
 
export default MainContent;