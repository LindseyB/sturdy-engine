import '../scss/main.scss'

import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  Container,
  Content,
  Columns,
  Heading,
  Image,
} from 'react-bulma-components'
import { Menu } from './components/menu'
import { Srt } from './components/srt'
import AppState from './app_states'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      appState: AppState.MAIN,
      srt: '',
      gifs: [],
    }
  }

  onStateChange = (state) => {
    this.setState({ appState: state })
  }

  onSrtRead = (srt) => {
    this.setState({ srt: srt, appState: AppState.SRT })
  }

  onFinishedProcessingSRT = (gifs) => {
    console.log(gifs)
    this.setState({ appState: AppState.MAIN, gifs: gifs.split(','), srt: '' })
  }

  render() {
    return (
      <Container m={3}>
        <Heading key="heading">Surdy Engine</Heading>
        <Columns key="columns">
          <Columns.Column key="column">
            <Menu
              appState={this.state.appState}
              onStateChange={this.onStateChange}
              onSrtRead={this.onSrtRead}
              key="menu"
            />
            {this.state.appState === AppState.MAIN && (
              <>
                <Content>Welcome to Sturdy Engine the GIF processor.</Content>
                <Content>Recently generated GIFs...</Content>
                <div style={{ display: 'flex', flexFlow: 'wrap' }}>
                  {this.state.gifs.length > 0 &&
                    this.state.gifs.map((gif) => (
                      <Image
                        key={gif}
                        src={gif}
                        p={1}
                        style={{ width: '50%' }}
                      />
                    ))}
                </div>
              </>
            )}
            {this.state.appState === AppState.SRT && (
              <Srt
                srt={this.state.srt}
                onFinished={this.onFinishedProcessingSRT}
              />
            )}
          </Columns.Column>
        </Columns>
      </Container>
    )
  }
}

const container = document.querySelector('#react-root')
const root = createRoot(container)
root.render(<App />)
