import React, { Component } from 'react'
import axios from 'axios'

import GalleryItem from '../Galleries/GalleryItem'

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
        {press
          .filter(gallery => gallery.acf.parent_dir === false)
          .map((gallery, index) => (
            <GalleryItem key={index} galleries={press} gallery={gallery} />
          ))}
      </div>
    )
  }
}
