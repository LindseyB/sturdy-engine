import '../../../scss/main.scss'

import React from 'react'
import { Form, Panel } from 'react-bulma-components'
import PropTypes from 'prop-types'

export class FileInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fileName: null,
    }
  }

  onChange = (e) => {
    const fileName = e.target.files ? e.target.files[0].path : ''
    this.setState({ fileName: fileName })
    this.props.onFileSelect(fileName)
  }

  renderFileName = () => {
    return <div className="mx-3">{this.state.fileName}</div>
  }

  renderInput = () => {
    return (
      <Form.InputFile
        color="primary"
        onChange={this.onChange}
        label="Select Video File"
        inputProps={{ accept: 'video/*' }}
      />
    )
  }

  render() {
    return (
      <Panel.Block>
        <div>{this.renderInput()}</div>
        {this.state.fileName && this.renderFileName()}
      </Panel.Block>
    )
  }
}

FileInput.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
}
