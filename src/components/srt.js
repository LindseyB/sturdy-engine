import '../../scss/main.scss'

import React from 'react'
import { Panel } from 'react-bulma-components'
import PropTypes from 'prop-types'

export class Srt extends React.Component {
  constructor(props) {
    super(props)

    console.log(this.props.srt)

    this.state = {
      subititles: [],
    }
  }

  useEffect() {
    console.log(this.props.srt)
  }

  render() {
    return (
      <Panel>
        <Panel.Header>Select Subtitles to Generate GIFs</Panel.Header>
      </Panel>
    )
  }
}

Srt.propTypes = {
  srt: PropTypes.string.isRequired,
}
