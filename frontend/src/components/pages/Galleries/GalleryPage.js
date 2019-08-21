import React, { Component, Fragment } from 'react'
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

  componentDidUpdate(prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.setState(
        {
          param: this.props.match.params.galleryId,
          isLoaded: false
        },
        () => {
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
      )
    }
  }

  render() {
    const { isLoaded, gallery } = this.state

    return (
      <Fragment>
        {isLoaded && (
          <div className={styles['galleries']}>
            <h1>Galerie</h1>
            <br />
            <GalleryItem
              gallery={gallery}
              showContent={true}
              previouslyOpened={true}
              noTitleImage={true}
              isIE11={this.props.isIE11}
            />
          </div>
        )}
      </Fragment>
    )
  }
}
