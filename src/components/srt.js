import '../../scss/main.scss'

import React from 'react'
import srtParser2 from 'srt-parser-2'
import { Panel } from 'react-bulma-components'
import PropTypes from 'prop-types'
const { ipcRenderer } = require('electron')

import { Item } from './srt/item'
import { FileInput } from './srt/file_input'
import Filter from './srt/filter'
import Actions from './srt/actions'

export class Srt extends React.Component {
  constructor(props) {
    super(props)

    const parser = new srtParser2()
    let subtitles = parser.fromSrt(this.props.srt)

    this.state = {
      subtitles: subtitles,
      fileName: null,
      filter: '',
    }
  }

  toggleItem = (id) => {
    const itemIdx = this.state.subtitles.findIndex(
      (subtitle) => subtitle.id === id
    )

    if (itemIdx != -1) {
      const item = this.state.subtitles[itemIdx]
      item.selected = !item.selected ?? true
    }

    this.setState({ subtitles: this.state.subtitles })
  }

  setFileName = (fileName) => {
    this.setState({ fileName: fileName })
  }

  onFilter = (e) => {
    const filter = e.target.value
    this.setState({ filter: filter.toLowerCase() })
  }

  onSelectAll = () => {
    const subtitles = this.state.subtitles.map((subtitle) => {
      subtitle.selected = true
      return subtitle
    })

    this.setState({ subtitles: subtitles })
  }

  onDeselectAll = () => {
    const subtitles = this.state.subtitles.map((subtitle) => {
      subtitle.selected = false
      return subtitle
    })

    this.setState({ subtitles: subtitles })
  }

  onSubmit = (e) => {
    e.target.classList.add('is-loading')
    console.log(
      ipcRenderer.sendSync('make-gifs', {
        fileName: this.state.fileName,
        subtitles: this.state.subtitles.filter((subtitle) => subtitle.selected),
      })
    )
  }

  render() {
    return (
      <Panel>
        <Panel.Header>Select Subtitles to Generate GIFs</Panel.Header>
        <FileInput onFileSelect={this.setFileName} />
        <Filter onChange={this.onFilter} />
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {this.state.subtitles.map((subtitle) => {
            return subtitle.selected ||
              subtitle.text.toLowerCase().includes(this.state.filter) ? (
              <Item
                text={subtitle.text}
                id={subtitle.id}
                key={`subtitle-${subtitle.id}`}
                onItemSelect={this.toggleItem}
                checked={subtitle.selected ?? false}
              />
            ) : null
          })}
        </div>
        <Actions
          submitEnabled={!!this.state.fileName}
          onSelectAll={this.onSelectAll}
          onDeselectAll={this.onDeselectAll}
          onSubmit={this.onSubmit}
        />
      </Panel>
    )
  }
}

Srt.propTypes = {
  srt: PropTypes.string.isRequired,
}
