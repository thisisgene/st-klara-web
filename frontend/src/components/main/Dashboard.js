import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'

import Home from '../pages/Home/Home'
import PageContent from '../pages/PageContent/PageContent'
import Podcasts from '../pages/Podcasts/Podcasts'
import Spinner from '../common/Spinner/Spinner'
import Galleries from '../pages/Galleries/Galleries'
import Events from '../pages/Events/Events'

import cx from 'classnames'
import styles from './Dashboard.module.sass'

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
      <div className={styles['dashboard']}>
        <Route exact path="/" component={Home} />
        <Switch>
          <Route exact path="/seite/galerie" component={Galleries} />
          <Route exact path="/seite/veranstaltungen" component={Events} />
          <Route exact path="/seite/podcasts" component={Podcasts} />
          <Route exact path="/seite/:page" component={PageContent} />
        </Switch>
        <Route exact path="/seite/:toppage/:page" component={PageContent} />
      </div>
    )
  }
}

export default Dashboard
