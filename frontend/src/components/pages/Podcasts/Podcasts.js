import React, { Component } from 'react'
import axios from 'axios'

import AudioItem from './AudioItem'

import styles from './Podcasts.module.sass'

export default class Podcasts extends Component {
  state = {
    podcasts: [],
    perPage: 30,
    isLoaded: false,
    looping: true
  }
  getRequest = currentPage => {
    axios
      .get(
        `/wp-json/wp/v2/podcasts/?per_page=${
          this.state.perPage
        }&offset=${currentPage}`
      )
      .then(res => {
        console.log(res.data)
        if (currentPage + this.state.perPage < res.headers['x-wp-total']) {
          let array = this.state.podcasts
          array = [...array, ...res.data]
          this.setState({ podcasts: array })
          this.getRequest(currentPage + this.state.perPage)
        } else {
          let array = this.state.podcasts
          array = [...array, ...res.data]
          console.log('array: ', array)
          this.setState({ podcasts: array, looping: false })
        }
      })
      .catch(err => console.log(err))
  }
  componentDidMount() {
    this.getRequest(0)
  }
  // componentDidMount() {
  //   axios
  //     .get('/wp-json/wp/v2/podcasts')
  //     .then(res =>
  //       this.setState({
  //         podcasts: res.data,
  //         isLoaded: true
  //       })
  //     )
  //     .catch(err => console.log(err))
  // }
  render() {
    const { isLoaded, podcasts, looping } = this.state
    if (!looping) {
      return (
        <div className={styles['podcasts']}>
          <h1>Klara-Cast</h1>
          {!looping &&
            podcasts
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
