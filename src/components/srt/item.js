import '../../../scss/main.scss'

import React from 'react'
import { Form, Panel } from 'react-bulma-components'
import PropTypes from 'prop-types'

export class Item extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      checked: this.props.checked,
    }
  }

  onClick = (id) => {
    this.setState({ checked: !this.state.checked })
    this.props.onItemSelect(id)
  }

  render() {
    return (
      <Panel.Block key={this.props.id}>
        <Form.Control fullwidth>
          <Form.Checkbox
            onChange={() => this.onClick(this.props.id)}
            checked={this.state.checked}
          >
            {this.props.text}
          </Form.Checkbox>
        </Form.Control>
      </Panel.Block>
    )
  }
}

Item.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func.isRequired,
  checked: PropTypes.bool,
}

Item.defaultProps = {
  checked: false,
}
