import React, { Component } from 'react'
import axios from 'axios'

import GalleryItem from '../Galleries/GalleryItem'
import Spinner from '../../common/Spinner/Spinner'

import spinnerStyles from '../../common/Spinner/Spinner.module.sass'
import styles from '../Galleries/Galleries.module.sass'

export default class Press extends Component {
  state = {
    press: [],
    isLoaded: false
  }

  componentDidMount() {
    axios
      .get('/wp-json/wp/v2/press_entries')
      .then(res =>
        this.setState({
          press: res.data,
          isLoaded: true
        })
      )
      .catch(err => console.log(err))
  }
  render() {
    const { isLoaded, press } = this.state

    return (
      <div className={styles['galleries']}>
        <h1>Presse</h1>
        {isLoaded ? (
          press
            .filter(gallery => gallery.acf.parent_dir === false)
            .map((gallery, index) => (
              <GalleryItem key={index} galleries={press} gallery={gallery} />
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
