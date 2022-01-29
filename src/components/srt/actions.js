import '../../../scss/main.scss'

import React from 'react'
import PropTypes from 'prop-types'
import { Button, Panel } from 'react-bulma-components'

const Actions = ({ submitEnabled, onSubmit, onSelectAll, onDeselectAll }) => {
  return (
    <Panel.Block>
      <Button.Group style={{ width: '100%' }}>
        <Button onClick={onSelectAll} flexGrow={1}>
          Select All
        </Button>
        <Button onClick={onDeselectAll} flexGrow={1}>
          Deselect All
        </Button>
        <Button onClick={onSubmit} disabled={!submitEnabled} flexGrow={1}>
          Generate GIFs
        </Button>
      </Button.Group>
    </Panel.Block>
  )
}

Actions.propTypes = {
  submitEnabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  onDeselectAll: PropTypes.func.isRequired,
}

export default Actions
