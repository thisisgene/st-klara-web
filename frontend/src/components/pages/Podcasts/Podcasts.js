import React, { Component } from 'react'
import axios from 'axios'

import AudioItem from './AudioItem'

import styles from './Podcasts.module.sass'

export default class Podcasts extends Component {
  state = {
    podcasts: [],
    isLoaded: false
  }

  componentDidMount() {
    axios
      .get('/wp-json/wp/v2/podcasts')
      .then(res =>
        this.setState({
          podcasts: res.data,
          isLoaded: true
        })
      )
      .catch(err => console.log(err))
  }
  render() {
    const { isLoaded, podcasts } = this.state
    if (isLoaded) {
      return (
        <div className={styles['podcasts']}>
          <h1>Klara-Cast</h1>
          {podcasts
            // .filter(podcast => podcast.acf.category === 'bibel')
            .map((podcast, index) => (
              <AudioItem key={index} podcast={podcast} />
            ))}
        </div>
      )
    }
    return <div>Loading ...</div>
  }
}
