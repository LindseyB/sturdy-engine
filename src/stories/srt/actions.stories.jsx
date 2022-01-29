import React from 'react'

import Actions from '../../components/srt/actions'

export default {
  title: 'SRT/Actions',
  component: Actions,
}

const Template = (args) => <Actions {...args} />

export const Default = Template.bind({})
Default.args = {
  submitEnabled: false,
  onSubmit: () => {},
  onSelectAll: () => {},
  onDeselectAll: () => {},
}
