import React from 'react';
import "./style.css";
import Item from "./Item.jsx";

class TodoInput extends React.Component {
    constructor() {
        super();
        this.state = {
            content: "",
            tasks: [],
            msg: "",
            date: ""
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

    addTask(e) {
        if (this.state.date === "") {
            this.setState({
                date: "No Due Date Set"
            })
        }
        console.log(this.state.date);
        if (this.state.content == "") {
            this.setState({
                msg: "Please input something!"
            })
            return false;
        };

        const taskItem = {
            id: Date.now(),
            text: this.state.content.slice(),
            date: this.state.date
        };

        const tasks = [...this.state.tasks]

        tasks.push(taskItem);

        console.log(tasks);

        this.setState({
            tasks: tasks,
            content: "",
            date: ""
        });

        
        localStorage.setItem("tasks",JSON.stringify(tasks));
        localStorage.setItem("newItem", "")
        
        e.preventDefault();
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
              console.log('Success')
            } catch (e) {
              // handle empty string
              this.setState({ [key]: value });
              console.log('Unsuccessful')
            }
          }
        }
      }
    
    render() { 
        const task = this.state.tasks.map(task => {
            return(
                <div key={task.id}>
                    <Item key={task.id} text={task.text} date={task.date} id={task.id} delete={() => this.deleteTask(task.id)}/>
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
                                name="content"
                                id="input"
                                value={this.state.content}
                                placeholder="Enter Task.."
                                onChange={this.handleChange}
                            />
                            <br/>
                            <br/>
                            <p id="due">Due:</p>
                            <br/>
                            <input 
                                type="date"
                                name="date"
                                id="input"
                                value={this.state.date}
                                onChange={this.handleChange}
                            />
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
