import React from 'react'

import { Srt } from '../components/srt'

export default {
  title: 'Srt',
  component: Srt,
}

const SRT = `1
00:00:00,800 --> 00:00:02,260
Come on, you guys.

2
00:00:02,280 --> 00:00:03,840
There it is, right there in front of you

3
00:00:03,870 --> 00:00:07,180
the whole time you're
dereferencing a null pointer.

4
00:00:07,200 --> 00:00:07,880
Open your eyes.
`

export const Default = <Srt srt={SRT} />
