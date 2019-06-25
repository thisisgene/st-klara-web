import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'

import Home from '../pages/Home/Home'
import PageContent from '../pages/PageContent/PageContent'

import cx from 'classnames'
import styles from './Dashboard.module.sass'
import Podcasts from '../pages/Podcasts/Podcasts'
import Spinner from '../common/Spinner/Spinner'
import Galleries from '../pages/Galleries/Galleries'

export class Dashboard extends Component {
  state = {
    posts: [],
    isLoaded: false
  }

  componentDidMount() {
    axios
      .get('/wp-json/wp/v2/posts')
      .then(res =>
        this.setState({
          posts: res.data,
          isLoaded: true
        })
      )
      .catch(err => console.log(err))
  }

  render() {
    const { isLoaded, posts } = this.state

    return (
      <Fragment>
        <Route exact path="/" component={Home} />
        <Route exact path="/seite/galerie" component={Galleries} />
        <Route exact path="/seite/:page" component={PageContent} />
        <Route exact path="/seite/:toppage/:page" component={PageContent} />
        <Route exact path="/podcasts" component={Podcasts} />
      </Fragment>
    )
  }
}

export default Dashboard
