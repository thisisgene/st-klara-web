import React, { Component } from 'react'
import axios from 'axios'

import GalleryItem from './GalleryItem'

import styles from './Galleries.module.sass'

export default class Galleries extends Component {
  state = {
    param: this.props.match.params.galleryId,
    gallery: {},
    isLoaded: false
  }

  componentDidMount() {
    axios
      .get(`/wp-json/wp/v2/galleries/${this.state.param}`)
      .then(res =>
        this.setState({
          gallery: res.data,
          isLoaded: true
        })
      )
      .catch(err => console.log(err))
  }
  render() {
    const { isLoaded, gallery } = this.state

    return (
      <div>
        {isLoaded && (
          <div className={styles['galleries']}>
            <h1>Galerie</h1>
            <br />
            <GalleryItem
              gallery={gallery}
              showContent={true}
              previouslyOpened={true}
            />
          </div>
        )}
      </div>
    )
  }
}
