import React, { Component } from 'react'
import axios from 'axios'

import GalleryItem from './GalleryItem'

import styles from './Galleries.module.sass'

export default class Galleries extends Component {
  state = {
    perPage: 30,
    currentPage: 0,
    looping: true,
    galleries: [],
    isLoaded: false
  }
  getRequest = currentPage => {
    axios
      .get(
        `/wp-json/wp/v2/galleries/?per_page=${
          this.state.perPage
        }&offset=${currentPage}`
      )
      .then(res => {
        if (currentPage + this.state.perPage < res.headers['x-wp-total']) {
          let array = this.state.galleries
          array = [...array, ...res.data]
          this.setState({ galleries: array })
          this.getRequest(currentPage + this.state.perPage)
        } else {
          let array = this.state.galleries
          array = [...array, ...res.data]
          this.setState({ galleries: array, looping: false })
        }
      })
      .catch(err => console.log(err))
  }
  componentDidMount() {
    this.getRequest(0)
  }
  render() {
    const { looping, galleries } = this.state

    return (
      <div className={styles['galleries']}>
        <h1>Galerie</h1>
        <br />
        {!looping &&
          galleries
            .filter(gallery => gallery.acf.parent_dir === false)
            .map((gallery, index) => (
              <GalleryItem
                key={index}
                galleries={galleries}
                gallery={gallery}
              />
            ))}
      </div>
    )
  }
}
