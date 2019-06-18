import React, { Component } from 'react'
import axios from 'axios'

import AudioItem from './AudioItem'

import styles from './Podcasts.module.sass'

export default class Podcasts extends Component {
  state = {
    media: [],
    isLoaded: false
  }

  componentDidMount() {
    axios
      .get('/wp-json/wp/v2/media?mime_type=audio/mpeg')
      .then(res =>
        this.setState({
          media: res.data,
          isLoaded: true
        })
      )
      .catch(err => console.log(err))
  }
  render() {
    const { isLoaded, media } = this.state
    if (isLoaded) {
      return (
        <div className={styles['podcasts']}>
          <h1>Klara-Cast</h1>
          <h2>Bibel</h2>
          {media
            .filter(file => file.media_details.album === 'bibel')
            .map((file, index) => (
              <AudioItem key={index} file={file} />
            ))}
        </div>
      )
    }
    return <div>Loading ...</div>
  }
}
