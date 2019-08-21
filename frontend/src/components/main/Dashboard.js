import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../pages/Home/Home'
import PageContent from '../pages/PageContent/PageContent'
import Podcasts from '../pages/Podcasts/Podcasts'
import Galleries from '../pages/Galleries/Galleries'
import Events from '../pages/Events/Events'
import Press from '../pages/Press/Press'
import GalleryPage from '../pages/Galleries/GalleryPage'

import styles from './Dashboard.module.sass'

function Dashboard() {
  return (
    <div className={styles['dashboard']}>
      <Route exact path="/" component={Home} />
      <Switch>
        <Route exact path="/seite/galerie" component={Galleries} />
        <Route exact path="/seite/galerie/:galleryId" component={GalleryPage} />
        <Route exact path="/seite/veranstaltungen" component={Events} />
        <Route exact path="/seite/podcasts" component={Podcasts} />
        <Route exact path="/seite/:page" component={PageContent} />
      </Switch>
      <Switch>
        <Route exact path="/seite/presse" component={Press} />
        <Route exact path="/seite/:toppage/:page" component={PageContent} />
      </Switch>
    </div>
  )
}

export default Dashboard
