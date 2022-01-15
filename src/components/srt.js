import '../../scss/main.scss'

import React from 'react'
import srtParser2 from 'srt-parser-2'
import { Panel } from 'react-bulma-components'
import PropTypes from 'prop-types'

export class Srt extends React.Component {
  constructor(props) {
    super(props)

    const parser = new srtParser2()
    let subtitles = parser.fromSrt(this.props.srt)

    console.log(subtitles)

    this.state = {
      subtitles: subtitles,
    }
  }

  render() {
    return (
      <Panel>
        <Panel.Header>Select Subtitles to Generate GIFs</Panel.Header>
        {this.state.subtitles.map((subtitle) => {
          return <Panel.Block key={subtitle.id}>{subtitle.text}</Panel.Block>
        })}
      </Panel>
    )
  }
}

Srt.propTypes = {
  srt: PropTypes.string.isRequired,
}
