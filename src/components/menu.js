import '../../scss/main.scss'

import React from 'react'
import { Button, Form, Level } from 'react-bulma-components'
import PropTypes from 'prop-types'
import AppState from '../app_states'

export class Menu extends React.Component {
  onSrtChange = (e) => {
    const reader = new FileReader()
    for (const file of e.target.files) {
      reader.onload = () => {
        let content = reader.result
        this.props.onSrtRead(content)
      }
      reader.readAsText(file)
    }
  }

  render() {
    return (
      <Level>
        <Level.Side>
          <Level.Item>
            <Form.InputFile
              renderAs="a"
              onChange={this.onSrtChange}
              label="Generate from SRT"
              inputProps={{ accept: '.srt' }}
              className="is-info"
            />
          </Level.Item>
          <Level.Item>
            <Button
              renderAs="a"
              onClick={() => this.props.onStateChange(AppState.MASS)}
              className="is-info"
            >
              Bulk Process GIFs
            </Button>
          </Level.Item>
        </Level.Side>
      </Level>
    )
  }
}

Menu.propTypes = {
  appState: PropTypes.number,
  onStateChange: PropTypes.func,
  onSrtRead: PropTypes.func,
}
