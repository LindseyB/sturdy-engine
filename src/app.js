import '../scss/main.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Menu } from './components/menu'
import AppState from './app_states'
const { ipcRenderer } = require('electron')

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = { appState: AppState.MAIN }
  }

  onStateChange = (state) => {
    console.log(state)
    this.setState({ appState: state })
  }

  render() {
    console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"
    return (
      <div className="container">
        <h1 className="title">Surdy Engine</h1>
        <div className="columns">
          <div className="column is-one-third">
            <Menu
              appState={this.state.appState}
              onStateChange={this.onStateChange}
            />
          </div>
          <div className="column">main</div>
        </div>
      </div>
    )
  }
}

const domContainer = document.querySelector('#react-root')
ReactDOM.render(<App />, domContainer)
