import React, { Component } from 'react'

import axios from 'axios'

import cx from 'classnames'
import styles from './CoverImage.module.sass'

export default class CoverImage extends Component {
  state = {
    pages: [],
    isLoaded: false,
    makeImageFixed: false
  }

  componentDidMount() {
    axios
      .get('/wp-json/wp/v2/pages')
      .then(res =>
        this.setState({
          pages: res.data,
          isLoaded: true
        })
      )
      .catch(err => console.log(err))
  }

  getImgFromPage = html => {
    let parser = new DOMParser()
    let htmlDoc = parser.parseFromString(html, 'text/html')
    let newHtml = document.createElement('div')
    newHtml.className = 'gallery-container'

    let htmlCollection = htmlDoc.querySelectorAll('img')
    let htmlArray = Array.from(htmlCollection)
    // console.log(htmlArray)
    return htmlArray
  }

  render() {
    const { isLoaded, pages } = this.state
    let img = pages
      .filter(page => page.title.rendered === 'Titelbild')
      .map((page, index) => {
        if (index === 0) return this.getImgFromPage(page.content.rendered)
      })
    // console.log(img[0])
    return (
      <div
        className={cx(styles['cover-image-container'], {
          [styles['loading']]: !isLoaded
        })}
      >
        {img &&
          img.map((i, index) => (
            <div>
              {index === 0 && (
                <div
                  className={styles['cover-image--image']}
                  // style={{ backgroundImage: `url('${i[0].src}')` }}
                >
                  <img src={i[0].src} alt="" />
                </div>
              )}
            </div>
          ))}
      </div>
    )
  }
}
