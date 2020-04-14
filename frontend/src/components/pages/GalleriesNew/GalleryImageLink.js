import React, { Component, Fragment } from 'react'

import axios from 'axios'
import Spinner from '../../common/Spinner/Spinner'
import ImgPlaceholder from '../../common/assets/img_placeholder.png'

import styles from './Galleries.module.sass'

export class ImageItem extends Component {
  state = {
    image: {},
    isLoaded: false,
    imageNotFound: false,
  }
  componentDidMount() {
    axios
      .get(`/wp-json/wp/v2/media/${this.props.id}`)
      .then(res => {
        const image = res.data
        this.setState({
          imageSrc:
            image.media_details &&
            image.media_details.sizes &&
            image.media_details.sizes.thumbnail
              ? image.media_details.sizes.thumbnail.source_url
              : image.media_details.sizes.full.source_url,
          isLoaded: true,
        })
      })
      .catch(err => {
        if (err) {
          console.log(err)
        }
      })
  }
  render() {
    const { index, src, id, onClick } = this.props
    const { isLoaded, imageSrc } = this.state
    return (
      <Fragment>
        {imageSrc && isLoaded ? (
          <div
            // onClick={onClick.bind(this, image.id)}
            className={styles['gallery-img-wrapper']}
          >
            <img
              src={imageSrc}
              onError={() => this.setState({ imageSrc: ImgPlaceholder })}
              alt=""
            />
          </div>
        ) : (
          <div
            // onClick={onClick.bind(this, image.id)}
            className={styles['gallery-img-wrapper']}
          >
            <div className={styles['image-spinner']}>
              <Spinner />
            </div>
          </div>
        )}
      </Fragment>
    )
  }
}

export default class GalleryImageLink extends Component {
  state = {}

  componentDidMount() {
    axios
      .get(`/wp-json/wp/v2/galleries/${this.props.id}`)
      .then(res => {
        this.setState({
          isLoaded: true,
          gallery: res.data,
        })
      })
      .catch(err => console.log(err))
  }

  getTitleImage = gallery => {
    if (gallery.featured_media !== 0) {
      console.log('YES FEATURE IMG')
      return (
        // <p>hallo</p>
        <ImageItem
          // key={index}
          // index={index}
          // src={item.src}
          id={gallery.featured_media}
          onClick={this.onImageClick}
          addToList={this.addToList}
        />
      )
    } else {
      console.log('NO FEATURE IMG')
      let parser = new DOMParser()
      let htmlDoc = parser.parseFromString(
        gallery.content.rendered,
        'text/html'
      )
      let htmlCollection = htmlDoc.querySelectorAll('img')
      let htmlArray = Array.from(htmlCollection)
      const item = htmlArray[0]
      console.log('item ', item)
      if (htmlArray.length > 0) {
        return (
          // <p>{item.src}</p>
          <ImageItem
            // key={index}
            // index={index}
            src={item.src}
            id={item.dataset.id}
            onClick={this.onImageClick}
            // addToList={addToList}
          />
        )
      } else {
        return null
      }
    }
  }

  render() {
    const { gallery } = this.state
    return (
      <div className={styles['gallery-wrapper']}>
        {gallery && <div>{this.getTitleImage(gallery)}</div>}
      </div>
    )
  }
}
