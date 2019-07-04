import React, { Component } from 'react'

import axios from 'axios'

import Spinner from '../../common/Spinner/Spinner'

import spinnerStyles from '../../common/Spinner/Spinner.module.sass'
import styles from './PageContent.module.sass'

export default class PageContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      param: props.match.params.page,
      pages: [],
      isLoading: false
    }
  }

  getPage = () => {
    axios
      .get(`/wp-json/wp/v2/pages?slug=${this.state.param}`)
      .then(res =>
        this.setState({
          pages: res.data,
          isLoaded: true
        })
      )
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getPage()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.setState(
        {
          param: this.props.match.params.page
        },
        () => this.getPage()
      )
    }
  }

  render() {
    const { isLoaded, pages } = this.state
    if (isLoaded) {
      return (
        <div className={styles['page-content']}>
          {pages.map((page, index) => (
            <div key={index} className={styles['page-content--inner']}>
              <div
                className={styles['page-content--inner__content']}
                dangerouslySetInnerHTML={{ __html: page.content.rendered }}
              />
            </div>
          ))}
        </div>
      )
    }
    return (
      <div className={spinnerStyles['spinner-container']}>
        <div className={spinnerStyles['spinner-container--wrapper']}>
          <Spinner />
        </div>
      </div>
    )
  }
}
