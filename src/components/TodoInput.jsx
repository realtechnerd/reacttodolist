import React from 'react';
import "./style.css";

class TodoInput extends React.Component {
    render() { 
        return ( 
            <div className='container'>
                <div className="TodoInput">
                    <h1>Add a Task</h1>
                    <form>
                        <input 
                            type="text"
                            name="task"
                            id="task"
                            placeholder="Enter Task.."
                        />
                        </form>
                        <br/>
                    <button className="lgbdanger lgb1 blg scale" type="submit">Add Task</button>
                </div>
            </div>
         );
    }
}
 
export default TodoInput;