import React, { Component } from 'react'
import axios from 'axios'

import GalleryItem from './GalleryItem'

import styles from './Galleries.module.sass'

export default class Galleries extends Component {
  state = {
    galleries: [],
    isLoaded: false
  }

  componentDidMount() {
    axios
      .get('/wp-json/wp/v2/galleries')
      .then(res =>
        this.setState({
          galleries: res.data,
          isLoaded: true
        })
      )
      .catch(err => console.log(err))
  }
  render() {
    const { isLoaded, galleries } = this.state

    return (
      <div className={styles['galleries']}>
        {galleries
          .filter(gallery => gallery.acf.parent_dir === false)
          .map((gallery, index) => (
            <GalleryItem key={index} galleries={galleries} gallery={gallery} />
          ))}
      </div>
    )
  }
}
