import '../../scss/main.scss'

import React from 'react'
import srtParser2 from 'srt-parser-2'
import { Panel } from 'react-bulma-components'
import PropTypes from 'prop-types'

import { Item } from './srt/item'

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

  toggleItem = (id) => {
    const item = this.state.subtitles.find((subtitle) => subtitle.id === id)

    if (item) {
      item.selected = !item.selected || true
    }
  }

  render() {
    return (
      <Panel>
        <Panel.Header>Select Subtitles to Generate GIFs</Panel.Header>
        <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
          {this.state.subtitles.map((subtitle) => {
            return (
              <Item
                text={subtitle.text}
                id={subtitle.id}
                key={`subtitle-${subtitle.id}`}
                onItemSelect={this.toggleItem}
                checked={subtitle.selected || false}
              />
            )
          })}
        </div>
      </Panel>
    )
  }
}

Srt.propTypes = {
  srt: PropTypes.string.isRequired,
}
