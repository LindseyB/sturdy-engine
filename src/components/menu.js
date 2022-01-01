import React from 'react'
import { Button, Level } from 'react-bulma-components'
import PropTypes from 'prop-types'
import AppState from '../app_states'

export class Menu extends React.Component {
  render() {
    return (
      <Level>
        <Level.Side>
          <Level.Item>
            <Button
              renderAs="a"
              color="primary"
              onClick={() => this.props.onStateChange(AppState.SRT)}
            >
              Process GIFs by SRT
            </Button>
          </Level.Item>
          <Level.Item>
            <Button
              renderAs="a"
              color="primary"
              onClick={() => this.props.onStateChange(AppState.MASS)}
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
}
