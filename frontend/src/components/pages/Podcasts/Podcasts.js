import React, { Component } from 'react'
import axios from 'axios'

import AudioItem from './AudioItem'
import FilterBox from './FilterBox'

import Spinner from '../../common/Spinner/Spinner'

import spinnerStyles from '../../common/Spinner/Spinner.module.sass'
import styles from './Podcasts.module.sass'

export default class Podcasts extends Component {
  state = {
    podcasts: [],
    perPage: 30,
    isLoaded: false,
    looping: true,
    activeCategory: null
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

  setActiveCategory = category => {
    this.setState({
      activeCategory: category
    })
  }

  render() {
    const { isLoaded, podcasts, looping } = this.state
    const { activeCategory } = this.state
    return (
      <div className={styles['podcasts']}>
        <h1>Klara-Cast</h1>
        {!looping ? (
          <div>
            <FilterBox
              items={podcasts}
              setActiveCategory={this.setActiveCategory}
              activeCategory={this.state.activeCategory}
            />
            {podcasts
              .filter(
                podcast =>
                  podcast.acf.category === activeCategory ||
                  activeCategory === null
              )
              .map((podcast, index) => (
                <AudioItem key={index} podcast={podcast} />
              ))}
          </div>
        ) : (
          <div className={spinnerStyles['spinner-container']}>
            <div className={spinnerStyles['spinner-container--wrapper']}>
              <Spinner />
            </div>
          </div>
        )}
      </div>
    )
  }
}
