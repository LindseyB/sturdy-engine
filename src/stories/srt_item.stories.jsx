import React from 'react'

import { SrtItem } from '../components/srt_item'

export default {
  title: 'SRT Item',
  component: SrtItem,
}

const Template = (args) => <SrtItem {...args} />

export const Default = Template.bind({})
Default.args = {
  text: "you're dereferencing a null pointer.",
  id: 0,
  onItemSelect: () => {},
}
