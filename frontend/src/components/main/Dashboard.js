import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Home from '../pages/Home/Home';
import PageContent from '../pages/PageContent/PageContent';
import Videos from '../pages/Videos/Videos';
import Podcasts from '../pages/Podcasts/Podcasts';
import Spinner from '../common/Spinner/Spinner';
import Galleries from '../pages/GalleriesNew/Galleries';
import Events from '../pages/Events/Events';
import Press from '../pages/Press/Press';
import GalleryPage from '../pages/Galleries/GalleryPage';
import CookieConsent from '../common/CookieConsent/CookieConsent';

import cx from 'classnames';
import styles from './Dashboard.module.sass';

export class Dashboard extends Component {
  state = {
    showCookieConsent: true
  };
  componentDidMount() {
    this.setState({
      showCookieConsent: !localStorage.getItem('cookieAccept')
    });
  }

  cookieAccept = () => {
    this.setState({
      showCookieConsent: false
    });
    localStorage.setItem('cookieAccept', true);
  };

  render() {
    const { isIE11 } = this.props;
    return (
      <div className={styles['dashboard']}>
        <Route exact path="/" component={Home} />
        <Switch>
          <Route
            exact
            path="/seite/galerie"
            render={({ location }) => (
              <Galleries isIE11={isIE11} location={location} />
            )}
          />
          <Route
            exact
            path="/seite/galerie/:galleryId"
            render={props => <GalleryPage {...props} isIE11={isIE11} />}
          />
          <Route exact path="/seite/videos" component={Videos} />
          <Route exact path="/seite/veranstaltungen" component={Events} />
          <Route exact path="/seite/podcasts" component={Podcasts} />
          <Route exact path="/seite/:page" component={PageContent} />
        </Switch>
        <Switch>
          <Route exact path="/seite/presse" component={Press} />
          <Route exact path="/seite/:toppage/:page" component={PageContent} />
        </Switch>
        {this.state.showCookieConsent && (
          <CookieConsent handleClick={this.cookieAccept} />
        )}
      </div>
    );
  }
}

export default Dashboard;
