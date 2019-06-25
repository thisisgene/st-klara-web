import React, { Component } from 'react'

import arrow from '../../common/assets/arrow.png'

import cx from 'classnames'
import './Galleries.sass'
import styles from './Galleries.module.sass'

const dummyHtml =
  '<ul><li><img src="http://localhost:8000/wp-content/uploads/2019/06/stklara_tuere-1.jpg" /></li><li><img src="http://localhost:8000/wp-content/uploads/2019/06/Screenshot-2019-06-18-at-16.40.30.png" /></li><li><img src="http://localhost:8000/wp-content/uploads/2019/06/979124e4-9d5f-4a7e-81a0-daeac2f6dcd2-1024x768.jpg" /></li><li><img src="http://localhost:8000/wp-content/uploads/images/2019/photo5951550059562774560-1024x768.jpg" /></li><li><img src="http://localhost:8000/wp-content/uploads/2019/06/03-zara-logo-quer-2048x472.png" /></li></ul>'

export class ImageItem extends Component {
  render() {
    const { src, onClick } = this.props
    return (
      <div
        onClick={onClick.bind(this, src)}
        className={styles['gallery-img-wrapper']}
      >
        <img src={src} alt="" />
      </div>
    )
  }
}

export class ImageWrapper extends Component {
  // let imgArray = [...images]
  render() {
    console.log(this.props.images)
    let array = [{ name: 'hallo' }, { name: 'bubu' }]
    console.log(array)
    // images.map(img => console.log('IMAGEN: ', img))
    const { images, onClick } = this.props
    return (
      <div className={styles['gallery-item--images']}>
        {images.map(item => (
          <ImageItem src={item.src} onClick={onClick} />
        ))}
      </div>
    )
  }
}

export default class GalleryItem extends Component {
  state = {
    showContent: false
  }

  toggleContent = () => {
    this.setState({
      showContent: !this.state.showContent
    })
  }

  onImageClick = src => {
    console.log('image CLICK!: ', src)
  }

  parseHtmlContent = html => {
    let parser = new DOMParser()
    let htmlDoc = parser.parseFromString(dummyHtml, 'text/html')
    let newHtml = document.createElement('div')
    newHtml.className = 'gallery-container'

    // let htmlElement = document.createElement('div')
    // htmlElement.innerHTML = html
    let htmlCollection = htmlDoc.querySelectorAll('img')
    let htmlArray = Array.from(htmlCollection)
    // let htmlCollection = []
    // for (let img of htmlArray) {
    //   htmlCollection.push({ name: img.name })
    // }
    console.log('before: ', htmlArray)
    return <ImageWrapper images={htmlArray} onClick={this.onImageClick} />
    // console.log(newHtml.outerHTML)
    return newHtml.outerHTML
  }

  render() {
    const { galleries, gallery } = this.props
    const images = this.parseHtmlContent(this.props.gallery.content.rendered)
    return (
      <div className={styles['gallery-item']}>
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
              <div

              // dangerouslySetInnerHTML={{
              //   __html: this.parseHtmlContent(gallery.content.rendered)
              // }}
              >
                {this.parseHtmlContent(gallery.content.rendered)}
                {/* {images && images.map(img => <div>{img}</div>)} */}
              </div>
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
