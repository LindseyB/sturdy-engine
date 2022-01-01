import React from 'react'
import PropTypes from 'prop-types'
import AppState from '../app_states'

export class Menu extends React.Component {
  x
  render() {
    // TODO: replace with map
    return (
      <aside className="menu">
        <ul className="menu-list">
          <li>
            <a
              className={
                this.props.appState === AppState.SRT ? 'is-active' : ''
              }
              onClick={() => this.props.onStateChange(AppState.SRT)}
            >
              Process GIFs by SRT
            </a>
          </li>
          <li>
            <a
              className={
                this.props.appState === AppState.MASS ? 'is-active' : ''
              }
              onClick={() => this.props.onStateChange(AppState.MASS)}
            >
              Bulk Process GIFs
            </a>
          </li>
        </ul>
      </aside>
    )
  }
}

Menu.propTypes = {
  appState: PropTypes.number,
  onStateChange: PropTypes.func,
}
