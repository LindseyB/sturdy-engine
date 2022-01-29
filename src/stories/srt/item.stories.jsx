import React from 'react'

import { Item } from '../../components/srt/item'

export default {
  title: 'SRT/Item',
  component: Item,
}

const Template = (args) => <Item {...args} />

export const Default = Template.bind({})
Default.args = {
  text: "you're dereferencing a null pointer.",
  id: '0',
  onItemSelect: () => {},
}
