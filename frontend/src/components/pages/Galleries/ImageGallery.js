import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import ReactSwipe from 'react-swipe'

import arrow from '../../common/assets/arrow_right.png'

import cx from 'classnames'
import styles from './Galleries.module.sass'

export default class ImageGallery extends Component {
  state = {
    current: this.props.current,
    currentSlide: 0,
  }

  componentDidMount() {
    this.props.images.map((img, index) => {
      if (img.id === this.state.current) this.setState({ currentSlide: index })
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        current: this.props.current,
      })
    }
  }

  swipeCallback = (index, e) => {
    console.log(this.props.images.length, index)
    this.setState({
      currentSlide: index,
    })
  }

  render() {
    const { images, updateGallery, closeGallery } = this.props
    const { current } = this.state
    let reactSwipeEl
    let currentImage

    return (
      <div className={styles['image-gallery']}>
        <div className={styles['close-button']} onClick={closeGallery}>
          <i className={'fas fa-times'} />
        </div>

        <div className={styles['image-gallery--wrapper']}>
          <div className={cx(styles['image-arrow'], styles['left'])}>
            {this.state.currentSlide > 0 && (
              <div onClick={() => reactSwipeEl.prev()}>
                <img src={arrow} alt="" />
              </div>
            )}
          </div>
          <ReactSwipe
            className={styles['swipe-container']}
            swipeOptions={{
              continuous: false,
              startSlide: this.state.currentSlide,
              callback: (index, e) => this.swipeCallback(index, e),
            }}
            ref={el => (reactSwipeEl = el)}
            wrapper={{ display: 'flex', alignItems: 'center' }}
            key={images.length}
          >
            {images.map((img, index) => (
              <div
                className={cx(styles['image-gallery--wrapper__image'], {
                  [styles['visible']]: index === this.state.currentSlide,
                })}
              >
                {/* <a href={img.guid.rendered} target="blank">
                  Bild extern öffnen
                </a> */}
                <img
                  className={styles['gallery-image']}
                  src={img.guid.rendered}
                  alt=""
                />
              </div>
            ))}
          </ReactSwipe>

          <div className={styles['image-arrow']}>
            {this.state.currentSlide < images.length - 1 && (
              <div onClick={() => reactSwipeEl.next()}>
                <img src={arrow} alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
