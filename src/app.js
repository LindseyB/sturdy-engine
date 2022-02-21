import '../scss/main.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Container, Content, Columns, Heading } from 'react-bulma-components'
import { Menu } from './components/menu'
import { Srt } from './components/srt'
import AppState from './app_states'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      appState: AppState.MAIN,
      srt: '',
    }
  }

  onStateChange = (state) => {
    this.setState({ appState: state })
  }

  onSrtRead = (srt) => {
    this.setState({ srt: srt, appState: AppState.SRT })
  }

  render() {
    return (
      <Container m={3}>
        <Heading>Surdy Engine</Heading>
        <Columns>
          <Columns.Column>
            <Menu
              appState={this.state.appState}
              onStateChange={this.onStateChange}
              onSrtRead={this.onSrtRead}
            />
            {this.state.appState === AppState.MAIN && (
              <Content>Welcome to Sturdy Engine the GIF processor.</Content>
            )}
            {this.state.appState === AppState.SRT && (
              <Srt srt={this.state.srt} />
            )}
          </Columns.Column>
        </Columns>
      </Container>
    )
  }
}

const domContainer = document.querySelector('#react-root')
ReactDOM.render(<App />, domContainer)
