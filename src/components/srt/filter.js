import '../../../scss/main.scss'

import React from 'react'
import { Form, Panel } from 'react-bulma-components'
import PropTypes from 'prop-types'

const Filter = ({ onChange }) => {
  return (
    <Panel.Block>
      <Form.Input onChange={onChange} type="text" placeholder="Filter..." />
    </Panel.Block>
  )
}

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default Filter
