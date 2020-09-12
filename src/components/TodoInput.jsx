import React from 'react';
import "./style.css";
import Item from "./Item.jsx";

class TodoInput extends React.Component {
    constructor() {
        super();
        this.state = {
            input: "",
            tasks: [],
            msg: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    };
    updateInput(key, value) {
        this.setState({
            [key]: value
        })
        localStorage.setItem(key, value)
    }
    handleChange(e) {
        const {name, value} = e.target;
        
        this.setState({
            [name]: value
        })
    };

    addTask() {
        if (this.state.input == "") {
            this.setState({
                msg: "Please input something!"
            })
            return false;
        };

        const taskItem = {
            id: Date.now(),
            text: this.state.input.slice()
        };

        const tasks = [...this.state.tasks]

        tasks.push(taskItem);

        console.log(tasks);

        this.setState({
            tasks: tasks,
            input: ""
        });
        
        localStorage.setItem("tasks",JSON.stringify(tasks));
        localStorage.setItem("newItem", "")
    }
    deleteTask(id) {
        const tasks = [...this.state.tasks];

        const deleted = tasks.filter(task => task.id !== id);
    
        this.setState({ tasks: deleted });
        localStorage.setItem("tasks",JSON.stringify(deleted));
    }

    componentDidMount() {
        this.hydrateStateWithLocalStorage();
    }  
    
    hydrateStateWithLocalStorage() {
        // for all items in state
        for (let key in this.state) {
          // if the key exists in localStorage
          if (localStorage.hasOwnProperty(key)) {
            // get the key's value from localStorage
            let value = localStorage.getItem(key);
            console.log("value = " + value);
            // parse the localStorage string and setState
            try {
              value = JSON.parse(value);
              this.setState({ [key]: value });
              console.log('intry')
            } catch (e) {
              // handle empty string
              this.setState({ [key]: value });
              console.log('incatch')
            }
          }
        }
      }
    render() { 
        const task = this.state.tasks.map(task => {
            return(
                <div>
                    <Item key={task.id} text={task.text} delete={() => this.deleteTask(task.id)}/>
                </div>
            )
        })
        return (
            <div>
                <div className='container'>
                    <div className="TodoInput">
                        <h1>Add a Task</h1>
                        <form id="submit" onSubmit={this.addTask} autoComplete="off" required>
                            <input 
                                type="text"
                                name="input"
                                id="input"
                                value={this.state.input}
                                placeholder="Enter Task.."
                                onChange={this.handleChange}
                            />
                            <br/>
                            <div id="msg">
                                {this.state.msg}
                            </div>
                            </form>
                            <br/>
                        <button 
                            className="lgbdanger blg scale" 
                            onClick={this.addTask} 
                            type="submit"
                            id="submit"
                        >
                        &ensp;Add Task&ensp;
                        </button>
                    </div>
                </div>
                <div className="container">
                    <div className="Items">
                        {task}
                    </div>
                </div>
            </div>
         );
    }
}
 
export default TodoInput;