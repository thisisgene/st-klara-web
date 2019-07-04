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
      .get('/wp-json/wp/v2/galleries/?per_page=100')
      .then(res => {
        console.log(res.data.length)
        this.setState({
          galleries: res.data,
          isLoaded: true
        })
      })
      .catch(err => console.log(err))
  }
  render() {
    const { isLoaded, galleries } = this.state

    return (
      <div className={styles['galleries']}>
        <h1>Galerie</h1>
        <br />
        {galleries
          .filter(gallery => gallery.acf.parent_dir === false)
          .map((gallery, index) => (
            <GalleryItem key={index} galleries={galleries} gallery={gallery} />
          ))}
      </div>
    )
  }
}
