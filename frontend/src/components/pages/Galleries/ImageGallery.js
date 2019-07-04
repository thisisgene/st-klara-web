import React, { Component, Fragment } from 'react'
import ReactSwipe from 'react-swipe'

import arrow from '../../common/assets/arrow_right.png'

import cx from 'classnames'
import styles from './Galleries.module.sass'

export default class ImageGallery extends Component {
  state = {
    current: this.props.current
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        current: this.props.current
      })
    }
  }
  render() {
    const { images, updateGallery, closeGallery } = this.props
    let reactSwipeEl
    console.log('current image: ', this.state.current)
    return (
      <div className={styles['image-gallery']}>
        <div className={styles['close-button']} onClick={closeGallery}>
          <i className={'fas fa-times'} />
        </div>
        <div className={styles['image-gallery--wrapper']}>
          <div className={cx(styles['image-arrow'], styles['left'])}>
            <div onClick={() => reactSwipeEl.prev()}>
              <img src={arrow} alt="" />
            </div>
          </div>
          <ReactSwipe
            swipeOptions={{ continuous: false, startSlide: 1 }}
            ref={el => (reactSwipeEl = el)}
            wrapper={{ display: 'flex', alignItems: 'center' }}
            key={images.length}
          >
            {images.map(img => (
              <div className={styles['image-gallery--wrapper__image']}>
                <img src={img.guid.rendered} alt="" />
              </div>
            ))}
          </ReactSwipe>

          <div className={styles['image-arrow']}>
            <div onClick={() => reactSwipeEl.next()}>
              <img src={arrow} alt="" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
