import React from 'react'

import { FileInput } from '../../components/srt/file_input'

export default {
  title: 'SRT/Video File Input',
  component: FileInput,
}

const Template = (args) => <FileInput {...args} />

export const Default = Template.bind({})
Default.args = {
  onFileSelect: () => {},
}
