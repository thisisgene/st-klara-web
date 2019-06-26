import React, { Component, Fragment } from 'react'

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
    console.log('current image: ', this.state.current)
    return (
      <div className={styles['image-gallery']}>
        <div className={styles['close-button']} onClick={closeGallery}>
          <i className={'fas fa-times'} />
        </div>
        <div className={styles['image-gallery--wrapper']}>
          {images
            // .filter(img => img.id === this.state.current)
            .map((img, index, array) => (
              <Fragment key={index}>
                {img.id === this.state.current && (
                  <Fragment>
                    <div className={cx(styles['image-arrow'], styles['left'])}>
                      {array[index - 1] && (
                        <div
                          onClick={updateGallery.bind(
                            this,
                            array[index - 1].id
                          )}
                        >
                          <img src={arrow} alt="" />
                        </div>
                      )}
                    </div>
                    <div className={styles['image-gallery--wrapper__image']}>
                      <img src={img.guid.rendered} alt="" />
                    </div>
                    <div className={styles['image-arrow']}>
                      {array[index + 1] && (
                        <div
                          onClick={updateGallery.bind(
                            this,
                            array[index + 1].id
                          )}
                        >
                          <img src={arrow} alt="" />
                        </div>
                      )}
                    </div>
                  </Fragment>
                )}
              </Fragment>
            ))}
        </div>
      </div>
    )
  }
}
