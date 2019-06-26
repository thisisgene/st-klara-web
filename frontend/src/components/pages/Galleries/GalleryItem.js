import React, { Component, Fragment } from 'react'
import axios from 'axios'

import ImageGallery from './ImageGallery'
import arrow from '../../common/assets/arrow.png'

import cx from 'classnames'
import './Galleries.sass'
import styles from './Galleries.module.sass'

// const dummyHtml =
//   '<ul><li><img src="http://localhost:8000/wp-content/uploads/2019/06/stklara_tuere-1.jpg" /></li><li><img src="http://localhost:8000/wp-content/uploads/2019/06/Screenshot-2019-06-18-at-16.40.30.png" /></li><li><img src="http://localhost:8000/wp-content/uploads/2019/06/979124e4-9d5f-4a7e-81a0-daeac2f6dcd2-1024x768.jpg" /></li><li><img src="http://localhost:8000/wp-content/uploads/images/2019/photo5951550059562774560-1024x768.jpg" /></li><li><img src="http://localhost:8000/wp-content/uploads/2019/06/03-zara-logo-quer-2048x472.png" /></li></ul>'

export class ImageItem extends Component {
  state = {
    image: {},
    isLoaded: false
  }
  componentDidMount() {
    axios
      .get(`/wp-json/wp/v2/media/${this.props.id}`)
      .then(res => {
        this.setState({
          image: res.data,
          isLoaded: true
        })
        this.props.addToList(res.data)
      })
      .catch(err => console.log(err))
  }
  render() {
    const { src, id, onClick } = this.props

    return (
      <Fragment>
        {this.state.image && this.state.isLoaded && (
          <div
            onClick={onClick.bind(this, this.state.image.id)}
            className={styles['gallery-img-wrapper']}
          >
            <img
              src={this.state.image.media_details.sizes.thumbnail.source_url}
              alt=""
            />
          </div>
        )}
      </Fragment>
    )
  }
}

export class ImageWrapper extends Component {
  render() {
    const { images, onClick, addToList } = this.props
    return (
      <div className={styles['gallery-item--images']}>
        {images.map((item, index) => (
          <ImageItem
            key={index}
            src={item.src}
            id={item.dataset.id}
            onClick={onClick}
            addToList={addToList}
          />
        ))}
      </div>
    )
  }
}

export default class GalleryItem extends Component {
  state = {
    showContent: false,
    imageList: [],
    currentImage: null,
    showImageGallery: false
  }

  toggleContent = () => {
    this.setState({
      showContent: !this.state.showContent
    })
  }

  addToList = image => {
    let imgArray = this.state.imageList
    imgArray.push(image)
    this.setState(
      {
        imageList: imgArray
      },
      () => {
        console.log(this.state.imageList)
      }
    )
  }

  updateGallery = id => {
    console.log('update', id)
    this.setState({
      currentImage: id
    })
  }

  onImageClick = id => {
    this.setState({
      currentImage: id,
      showImageGallery: true
    })
  }

  parseHtmlContent = html => {
    let parser = new DOMParser()
    let htmlDoc = parser.parseFromString(html, 'text/html')
    let newHtml = document.createElement('div')
    newHtml.className = 'gallery-container'

    let htmlCollection = htmlDoc.querySelectorAll('img')
    let htmlArray = Array.from(htmlCollection)

    return (
      <ImageWrapper
        images={htmlArray}
        onClick={this.onImageClick}
        addToList={this.addToList}
      />
    )
  }

  render() {
    const { galleries, gallery } = this.props
    const images = this.parseHtmlContent(this.props.gallery.content.rendered)
    return (
      <div className={styles['gallery-item']}>
        {this.state.showImageGallery && (
          <ImageGallery
            images={this.state.imageList}
            current={this.state.currentImage}
            updateGallery={this.updateGallery}
          />
        )}
        <div
          className={styles['gallery-item--body']}
          onClick={this.toggleContent}
        >
          <div className={styles['gallery-item--title']}>
            {gallery.title.rendered}
          </div>

          <div
            className={cx(styles['arrow'], {
              [styles['open']]: this.state.showContent
            })}
          >
            <img src={arrow} alt="" />
          </div>
        </div>
        {this.state.showContent && (
          <div>
            {gallery.content.rendered && (
              <div>{this.parseHtmlContent(gallery.content.rendered)}</div>
            )}

            {galleries.filter(
              subGallery => subGallery.acf.parent_dir.ID === gallery.id
            ).length > 0 &&
              galleries
                .filter(
                  subGallery => subGallery.acf.parent_dir.ID === gallery.id
                )
                .map((subGallery, sIndex) => (
                  <div
                    key={sIndex}
                    className={styles['gallery-item--sub-item']}
                  >
                    <GalleryItem galleries={galleries} gallery={subGallery} />
                  </div>
                ))}
          </div>
        )}
      </div>
    )
  }
}
