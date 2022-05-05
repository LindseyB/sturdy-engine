const pathToFfmpeg = require('ffmpeg-static')
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

class Gifs {
  constructor(videoFile, subtitles) {
    this.videoFile = videoFile
    this.subtitles = subtitles
    this.FONTFILE = path.join(`${process.cwd()}`, 'OpenSans.ttf')
  }

  kebabCase = (str) =>
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z0-9]*|\b)|[A-Z]?[a-z0-9]*|[A-Z]|[0-9]+/g)
      .filter(Boolean)
      .map((x) => x.toLowerCase())
      .join('-')

  removeHtml = (str) => str.replace(/<[^>]*>?/gm, '')
  padIndex = (idx) => idx.toString().padStart(5, '0')

  getDurationString = (startTime, endTime) => {
    let startDate = new Date(`September 18, 1990 ${startTime}`)
    let endDate = new Date(`September 18, 1990 ${endTime}`)
    let diffMillis = new Date(endDate - startDate)

    return this.msToTime(diffMillis)
  }

  msToTime = (duration) => {
    var milliseconds = Math.floor(duration % 1000),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    return hours + ':' + minutes + ':' + seconds + '.' + milliseconds
  }

  generate = () => {
    const gifDir = 'gifs'
    const ffmpeg = pathToFfmpeg
    let gifs = []

    if (!fs.existsSync(gifDir)) {
      fs.mkdir(gifDir, (err) => {
        if (err) {
          console.log(err)
        }
      })
    }

    for (const sub of this.subtitles) {
      let startTime = sub.startTime.replace(',', '.')
      let endTime = sub.endTime.replace(',', '.')
      let durationTime = this.getDurationString(startTime, endTime)

      let fileName = `${gifDir}/${this.padIndex(sub.id)}-${this.kebabCase(
        this.removeHtml(sub.text)
      )}`
      console.log(`generating ${fileName}`)
      this.generatePalette(ffmpeg, startTime, durationTime, this.videoFile)
      this.generateGif(
        ffmpeg,
        startTime,
        durationTime,
        this.videoFile,
        fileName,
        sub.text
      )

      gifs += `${fileName}.gif`
    }

    return gifs
  }

  generatePalette = (ffmpeg, startTime, durationTime, videoFile) => {
    execSync(
      `${ffmpeg} -y -ss ${startTime} -t ${durationTime} -i "${videoFile}" -filter_complex "[0:v] palettegen" palette.png`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`)
          return
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`)
          return
        }
        console.log(`stdout: ${stdout}`)
      }
    )
  }

  generateGif = (
    ffmpeg,
    startTime,
    durationTime,
    videoFile,
    fileName,
    text
  ) => {
    text = text.replace("'", '’') // replace the apostrophe with the unicode apostrophe
    text = text.replace('\n', '\f') // remove newlines

    execSync(
      `${ffmpeg} -y -ss ${startTime} -t ${durationTime} -i "${videoFile}" -i palette.png -filter_complex "scale=480:-1[v];[v]drawtext=text='${text}':x=(w-text_w)/2:y=(h-text_h)-10:fontsize=16:fontcolor=white:bordercolor=black:borderw=2:fontfile=${this.FONTFILE}[x];[x][1:v] paletteuse" ${fileName}.gif`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`)
          return
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`)
          return
        }
        console.log(`stdout: ${stdout}`)
      }
    )
  }
}

module.exports = Gifs
