import React, { Component } from 'react'
import axios from 'axios'

import GalleryItem from '../Galleries/GalleryItem'
import PressGalleryItem from './PressGalleryItem'
import Spinner from '../../common/Spinner/Spinner'

import spinnerStyles from '../../common/Spinner/Spinner.module.sass'
import styles from '../Galleries/Galleries.module.sass'

export default class Press extends Component {
  state = {
    perPage: 30,
    looping: true,
    press: []
  }

  getRequest = currentPage => {
    axios
      .get(
        `/wp-json/wp/v2/press_entries/?per_page=${
          this.state.perPage
        }&offset=${currentPage}`
      )
      .then(res => {
        if (currentPage + this.state.perPage < res.headers['x-wp-total']) {
          let array = this.state.press
          array = [...array, ...res.data]
          this.setState({ press: array })
          this.getRequest(currentPage + this.state.perPage)
        } else {
          let array = this.state.press
          array = [...array, ...res.data]
          this.setState({ press: array, looping: false })
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getRequest(0)

    // axios
    //   .get('/wp-json/wp/v2/press_entries')
    //   .then(res =>
    //     this.setState({
    //       press: res.data,
    //       isLoaded: true
    //     })
    //   )
    //   .catch(err => console.log(err))
  }
  render() {
    const { looping, press } = this.state

    return (
      <div className={styles['galleries']}>
        <h1>Presse</h1>
        {!looping ? (
          press
            .filter(gallery => gallery.acf.parent_dir === false)
            .map((gallery, index) => (
              <PressGalleryItem
                key={index}
                galleries={press}
                gallery={gallery}
              />
            ))
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
