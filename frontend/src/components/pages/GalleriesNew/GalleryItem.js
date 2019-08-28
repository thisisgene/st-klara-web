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
    hash: this.props.hash.substr(1),
    previouslyOpened: false
  }

  componentDidMount() {
    if (
      !this.state.showContent &&
      this.state.hash === this.props.gallery.id.toString()
    ) {
      this.setState({ showContent: true, previouslyOpened: true })
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.hash !== this.props.hash) {
      this.setState(
        {
          hash: this.props.hash.substr(1)
        },
        () => {
          let cleanHash = this.state.hash

          this.setState({
            showContent: cleanHash === this.props.gallery.id.toString()
          })
        }
      )
    }
  }

  toggleContent = hash => {
    console.log('hashhsh: ', hash)
    window.location.hash = hash
    if (!this.state.previouslyOpened) {
      this.setState({ previouslyOpened: true })
    }
  }

  render() {
    const { children, gallery, topLevel, isIE11 } = this.props
    const filteredChildren = children.filter(
      child => child.parent_dir === gallery.id.toString()
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
          onClick={topLevel && this.toggleContent.bind(this, gallery.id)}
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
