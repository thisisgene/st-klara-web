import React, { Component } from 'react'
import axios from 'axios'

import GalleryItem from './GalleryItem'
import Spinner from '../../common/Spinner/Spinner'

import spinnerStyles from '../../common/Spinner/Spinner.module.sass'
import styles from './Galleries.module.sass'

export default class Galleries extends Component {
  state = {
    perPage: 30,
    looping: true,
    galleries: [],
    isLoaded: false,
    isIE11: this.props.isIE11
  }
  getRequest = currentPage => {
    axios
      .get(
        `/wp-json/custom-routes/v1/gallerie-basic?amount=${this.state.perPage}&offset=${currentPage}`
      )
      .then(res => {
        if (res.data.length > 0) {
          console.log(currentPage)
          let array = this.state.galleries
          array = [...array, ...res.data]
          this.setState({ galleries: array })
          this.getRequest(currentPage + this.state.perPage)
        } else {
          console.log(currentPage)
          let array = this.state.galleries
          array = [...array, ...res.data]
          this.setState({ galleries: array, looping: false })
          console.log('array: ', array)
        }
      })
      .catch(err => console.log(err))
  }
  componentDidMount() {
    this.getRequest(0)
  }
  render() {
    const { looping, galleries, isIE11 } = this.state

    return (
      <div className={styles['galleries']}>
        <h1>Galerie</h1>
        <br />
        {!looping ? (
          galleries
            .filter(gallery => gallery.parent_dir === '')
            .map((gallery, index) => (
              <GalleryItem
                key={index}
                children={galleries}
                gallery={gallery}
                topLevel={true}
                isIE11={isIE11}
                hash={this.props.location.hash}
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
