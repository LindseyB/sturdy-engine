import React from 'react'

import Filter from '../../components/srt/filter'

export default {
  title: 'Subtitle Filter',
  component: Filter,
}

const Template = (args) => <Filter {...args} />

export const Default = Template.bind({})
Default.args = {
  onChange: () => {},
}
