import React, { Component } from 'react';
import './App.css';

const TodoItem = ({ todo, index }) => {
  return (
    <div className="Todo-item">
      {typeof index !== 'undefined' && <span className="Todo-number">{index + 1}.</span>}
      <div className="Input">
        <input
          type="text"
          className="Input-text"
          placeholder="Enter name for your task..."
          value={todo.name}
        />
      </div>
    </div>
  )
}

let globalId = 1

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [{ id: globalId, name: 'First task!' }],
      useIdAsKey: false,
    }

    this.onAdd = this.onAdd.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
  }

  onAdd() {
    globalId ++;

    this.setState({
      todos: [
        ...this.state.todos,
        {id: globalId, name: ''},
      ]
    })
  }

  handleCheckbox(event) {
    this.setState({
      useIdAsKey: event.target.checked
    })
  }

  render() {
    const { todos, useIdAsKey } = this.state

    return (
      <div className="Wrapper">
        <button onClick={this.onAdd}>Add Todo</button>
        <label>
          Use id as key
          <input
            type="checkbox"
            checked={useIdAsKey}
            onChange={this.handleCheckbox} />
        </label>
        <div className="Todo-wrapper">
          <h1 className="Title">Key = {useIdAsKey ? 'id' : 'index'}</h1>
          {
            todos.map((todo, idx) => (
              <TodoItem
                key={useIdAsKey ? todo.id : idx}
                index={idx}
                todo={todo}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;

