import '../scss/main.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Container, Content, Columns, Heading } from 'react-bulma-components'
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
      <Container m={3}>
        <Heading>Surdy Engine</Heading>
        <Columns>
          <Columns.Column>
            <Menu
              appState={this.state.appState}
              onStateChange={this.onStateChange}
            />
            <Content>Welcome to Sturdy Engine the GIF processor.</Content>
          </Columns.Column>
        </Columns>
      </Container>
    )
  }
}

const domContainer = document.querySelector('#react-root')
ReactDOM.render(<App />, domContainer)
