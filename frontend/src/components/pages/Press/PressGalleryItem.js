import React, { Component, Fragment } from 'react'
import axios from 'axios'

import arrow from '../../common/assets/arrow.png'
import Spinner from '../../common/Spinner/Spinner'
import ImageGallery from '../Galleries/ImageGallery'

import cx from 'classnames'
import styles from '../Galleries/Galleries.module.sass'

export class FileItem extends Component {
  state = {
    file: {},
    isLoaded: false
  }
  componentDidMount() {
    axios
      .get(`/wp-json/wp/v2/media/${this.props.file.id}`)
      .then(res => {
        this.setState({ file: res.data, isLoaded: true })
        if (res.data.media_type === 'image')
          this.props.addToList(res.data, this.props.index)
      })
      .catch(err => console.log(err))
  }
  render() {
    const { onClick } = this.props
    const { file, isLoaded } = this.state
    console.log(file.media_type)
    return (
      <Fragment>
        {file && isLoaded ? (
          <Fragment>
            {file.media_type === 'image' ? (
              <div
                onClick={onClick.bind(this, file.id)}
                className={styles['gallery-img-wrapper']}
              >
                <img
                  src={
                    file.media_details &&
                    file.media_details.sizes &&
                    file.media_details.sizes.thumbnail
                      ? file.media_details.sizes.thumbnail.source_url
                      : file.media_details.sizes.full.source_url
                  }
                  alt=""
                />
              </div>
            ) : (
              <div
                // onClick={onClick.bind(this, file.id)}
                className={styles['gallery-img-wrapper']}
              >
                <a href={file.guid.rendered} target="_blank">
                  <img
                    src={
                      file.media_details &&
                      file.media_details.sizes &&
                      file.media_details.sizes.medium
                        ? file.media_details.sizes.medium.source_url
                        : file.media_details.sizes.full.source_url
                    }
                    alt=""
                  />
                </a>
              </div>
            )}
          </Fragment>
        ) : (
          <div className={styles['image-spinner']}>
            <Spinner />
          </div>
        )}
      </Fragment>
    )
  }
}

export class GalleryParser extends Component {
  render() {
    const { gallery, addToList, onClick } = this.props
    return (
      <div className={styles['gallery-item--images']}>
        {gallery.map((file, index) => (
          <FileItem
            key={index}
            index={index}
            file={file}
            addToList={addToList}
            onClick={onClick}
          />
        ))}
      </div>
    )
  }
}

export default class PressGalleryItem extends Component {
  state = {
    showContent: this.props.showContent ? this.props.showContent : false,
    imageList: [],
    currentImage: null,
    showImageGallery: false,
    previouslyOpened: this.props.previouslyOpened
      ? this.props.previouslyOpened
      : false
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

  toggleContent = () => {
    this.setState({
      showContent: !this.state.showContent,
      previouslyOpened: true
    })
  }

  onImageClick = id => {
    this.setState({
      currentImage: id,
      showImageGallery: true
    })
  }

  render() {
    const { galleries, gallery } = this.props
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
        {gallery && (
          <div>
            <div
              className={styles['gallery-item--body']}
              onClick={this.toggleContent}
            >
              <div
                className={styles['gallery-item--title']}
                dangerouslySetInnerHTML={{
                  __html: gallery.title && gallery.title.rendered
                }}
              />

              <div
                className={cx(styles['arrow'], {
                  [styles['open']]: this.state.showContent
                })}
              >
                <img src={arrow} alt="" />
              </div>
            </div>
            {
              <div>
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
                      {// this.state.previouslyOpened &&
                      gallery && gallery.acf.media_gallery && (
                        <GalleryParser
                          gallery={gallery.acf.media_gallery}
                          addToList={this.addToList}
                          onClick={this.onImageClick}
                        />
                      )}
                    </div>
                  </Fragment>
                </div>

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
                        <PressGalleryItem
                          galleries={galleries}
                          gallery={subGallery}
                        />
                      </div>
                    ))}
              </div>
            }
          </div>
        )}
      </div>
    )
  }
}
