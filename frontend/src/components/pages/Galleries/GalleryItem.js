import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import ImageGallery from './ImageGallery'
import arrow from '../../common/assets/arrow.png'

import cx from 'classnames'
// import './Galleries.sass'
import styles from './Galleries.module.sass'
import Spinner from '../../common/Spinner/Spinner'

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
        this.props.addToList(res.data, this.props.index)
      })
      .catch(err => console.log(err))
  }
  render() {
    const { index, src, id, onClick } = this.props
    const { isLoaded, image } = this.state
    return (
      <Fragment>
        {image && isLoaded ? (
          <div
            onClick={onClick.bind(this, image.id)}
            className={styles['gallery-img-wrapper']}
          >
            <img
              src={
                image.media_details &&
                image.media_details.sizes &&
                image.media_details.sizes.thumbnail
                  ? image.media_details.sizes.thumbnail.source_url
                  : image.media_details.sizes.full.source_url
              }
              alt=""
            />
          </div>
        ) : (
          <div className={styles['image-spinner']}>
            <Spinner />
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
            index={index}
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
    showContent: this.props.showContent ? this.props.showContent : false,
    imageList: [],
    currentImage: null,
    containsImages: false,
    showImageGallery: false,
    previouslyOpened: this.props.previouslyOpened
      ? this.props.previouslyOpened
      : false
  }

  toggleContent = () => {
    this.setState({
      showContent: !this.state.showContent,
      previouslyOpened: true
    })
  }

  addToList = (image, index) => {
    let imgArray = this.state.imageList
    imgArray.splice(index, 0, image)
    // console.log(index, ' + ', image.id)

    this.setState({
      imageList: imgArray
    })
  }

  closeGallery = () => {
    console.log('CLOSE')
    this.setState({
      showImageGallery: false
    })
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

  getTitleImage = gallery => {
    if (gallery.featured_media !== 0) {
      return (
        <ImageItem
          // key={index}
          // index={index}
          // src={item.src}
          id={gallery.featured_media}
          onClick={this.onImageClick}
          // addToList={addToList}
        />
      )
    } else {
      let parser = new DOMParser()
      let htmlDoc = parser.parseFromString(
        gallery.content.rendered,
        'text/html'
      )
      let htmlCollection = htmlDoc.querySelectorAll('img')
      let htmlArray = Array.from(htmlCollection)
      console.log('ARRAY: ', htmlArray[0])
      const item = htmlArray[0]
      if (htmlArray.length > 0) {
        return (
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

  parseHtmlContent = html => {
    let parser = new DOMParser()
    let htmlDoc = parser.parseFromString(html, 'text/html')
    let htmlCollection = htmlDoc.querySelectorAll('img')
    let htmlArray = Array.from(htmlCollection)
    // if (htmlArray.length > 0) {
    //   this.setState({ containsImages: true })
    // }
    return (
      <ImageWrapper
        images={htmlArray}
        onClick={this.onImageClick}
        addToList={this.addToList}
      />
    )
  }

  render() {
    const { galleries, gallery, topLevel, noTitleImage } = this.props
    // const images = this.parseHtmlContent(this.props.gallery.content.rendered)
    return (
      <div className={styles['gallery-item']}>
        {this.state.showImageGallery && (
          <ImageGallery
            images={this.state.imageList}
            current={this.state.currentImage}
            updateGallery={this.updateGallery}
            closeGallery={this.closeGallery}
          />
        )}
        <div
          className={cx(
            styles['gallery-item--body'],
            {
              [styles['top-level']]: topLevel === true
            },
            {
              [styles['contains-images']]: this.state.imageList.length > 0
            }
          )}
          onClick={topLevel && this.toggleContent}
        >
          {topLevel ? (
            <Fragment>
              {/* <div>{this.getTitleImage(gallery)}</div> */}
              <div
                className={styles['gallery-item--title']}
                dangerouslySetInnerHTML={{ __html: gallery.title.rendered }}
              />
            </Fragment>
          ) : (
            <Link
              to={`/seite/galerie/${gallery.id}`}
              className={cx(styles['title-link'], {
                [styles['is-title']]: noTitleImage
              })}
            >
              {!noTitleImage && <div>{this.getTitleImage(gallery)}</div>}
              <div
                className={styles['gallery-title']}
                dangerouslySetInnerHTML={{ __html: gallery.title.rendered }}
              />
            </Link>
          )}

          {topLevel && (
            <div
              className={cx(styles['arrow'], {
                [styles['open']]: this.state.showContent
              })}
            >
              <img src={arrow} alt="" />
            </div>
          )}
        </div>
        {
          <div className={styles['item-content-container']}>
            {gallery.content.rendered && (
              <div
                className={cx(styles['gallery-item--content'], {
                  [styles['visible']]: this.state.showContent
                })}
              >
                <Fragment>
                  <div className={styles['gallery-item--content__inner']}>
                    {gallery.excerpt && gallery.excerpt.rendered && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: gallery.excerpt.rendered
                        }}
                      />
                    )}
                    {this.state.previouslyOpened &&
                      this.parseHtmlContent(gallery.content.rendered)}
                  </div>
                </Fragment>
              </div>
            )}

            {galleries &&
              galleries.filter(
                subGallery => subGallery.acf.parent_dir.ID === gallery.id
              ).length > 0 &&
              galleries
                .filter(
                  subGallery => subGallery.acf.parent_dir.ID === gallery.id
                )
                .map((subGallery, sIndex) => (
                  <div
                    key={sIndex}
                    className={cx(styles['gallery-item--sub-item'], {
                      [styles['visible']]: this.state.showContent
                    })}
                  >
                    {/* <ImageItem
                      index={index}
                      src={item.src}
                      id={item.dataset.id}
                      onClick={onClick}
                      addToList={addToList}
                    />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: subGallery.title.rendered
                      }}
                    /> */}
                    <GalleryItem galleries={galleries} gallery={subGallery} />
                  </div>
                ))}
          </div>
        }
      </div>
    )
  }
}
