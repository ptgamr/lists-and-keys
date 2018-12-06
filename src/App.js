import React, { Component } from 'react';
import './App.css';

class TodoItem extends Component {
  constructor(props) {
    super(props)
    this.renderCount = 0
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  componentDidMount() {
    this.focusTextInput()
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.todo !== this.props.todo
  }

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
  }

  render() {
    const { todo, index, onChange } = this.props
    this.renderCount ++
    return (
      <div className="Todo-item">
        {index && <span className="Todo-number">{index + 1}.</span>}
        <div className="Input">
          <input
            type="text"
            className="Input-text"
            ref={this.textInput}
            value={todo.name}
            onChange={(e) => onChange(todo, e.target.value)}
          />
        </div>
        <span className="Todo-render">render {this.renderCount} times</span>
      </div>
    )
  }
}

let globalId = 1

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [{ id: globalId, name: 'First task!' }]
    }

    this.onAdd = this.onAdd.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  onAdd() {
    globalId ++;

    this.setState({
      todos: [
        {id: globalId, name: '', done: false},
        ...this.state.todos,
      ]
    })
  }

  handleChange(todo, name) {
    const todos = this.state.todos.map(td => {
      if (td === todo) {
        return {
          ...td,
          name
        }
      }
      return td;
    })

    this.setState({ todos })
  }

  render() {
    const { todos } = this.state

    return (
      <div className="Wrapper">
        <button onClick={this.onAdd}>Add Todo</button>
        <div className="Todo-wrapper">
          <h1 className="Title">Key = index</h1>
          {
            todos.map((todo, idx) => (
              <TodoItem key={todo.id} todo={todo} onChange={this.handleChange}/>
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;
