import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// import ImageGallery from './ImageGallery'
import arrow from '../../common/assets/arrow.png'

import GalleryImageLink from './GalleryImageLink'

import cx from 'classnames'
// import './Galleries.sass'
import styles from './Galleries.module.sass'
import Spinner from '../../common/Spinner/Spinner'

export default class GalleryItem extends Component {
  state = {
    showContent: false,
    previouslyOpened: false
  }

  toggleContent = () => {
    this.setState({
      showContent: !this.state.showContent
    })
    if (!this.state.previouslyOpened) {
      this.setState({ previouslyOpened: true })
    }
  }

  render() {
    const { children, gallery, topLevel, isIE11 } = this.props
    const filteredChildren = children.filter(
      child => child.acf.parent_dir.ID === gallery.id
    )
    return (
      <div className={styles['gallery-item']}>
        <div
          className={cx(
            styles['gallery-item--body'],
            {
              [styles['top-level']]: topLevel === true
            }
            // {
            //   [styles['contains-images']]: this.state.imageList.length > 0
            // }
          )}
          onClick={topLevel && this.toggleContent}
        >
          <div
            className={styles['gallery-item--title']}
            dangerouslySetInnerHTML={{ __html: gallery.title }}
          />
          <div
            className={cx(styles['arrow'], {
              [styles['open']]: this.state.showContent
            })}
          >
            <img src={arrow} alt="" />
          </div>
        </div>
        <div
          className={cx(styles['item-content-container'], {
            [styles['ie11']]: isIE11
          })}
        >
          {filteredChildren.map((child, index) => (
            <div
              key={index}
              className={cx(styles['gallery-item--sub-item'], {
                [styles['visible']]: this.state.showContent
              })}
            >
              {this.state.previouslyOpened && (
                <Link
                  to={`/seite/galerie/${child.id}`}
                  className={styles['title-link']}
                >
                  <GalleryImageLink id={child.id}></GalleryImageLink>
                  <div
                    className={styles['gallery-title']}
                    dangerouslySetInnerHTML={{ __html: child.title }}
                  />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
