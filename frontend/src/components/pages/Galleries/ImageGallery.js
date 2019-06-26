import React, { Component, Fragment } from 'react'

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
    const { images, updateGallery } = this.props
    console.log('current image: ', this.state.current)
    return (
      <div className={styles['image-gallery']}>
        <div className={styles['image-gallery--wrapper']}>
          {images
            // .filter(img => img.id === this.state.current)
            .map((img, index, array) => (
              <div key={index}>
                {img.id === this.state.current && (
                  <Fragment>
                    {array[index - 1] && (
                      <div
                        onClick={updateGallery.bind(this, array[index - 1].id)}
                      >
                        prev
                      </div>
                    )}
                    <div className={styles['image-gallery--wrapper__image']}>
                      <img src={img.guid.rendered} alt="" />
                    </div>
                    {array[index + 1] && (
                      <div
                        onClick={updateGallery.bind(this, array[index + 1].id)}
                      >
                        next
                      </div>
                    )}
                  </Fragment>
                )}
              </div>
            ))}
        </div>
      </div>
    )
  }
}
