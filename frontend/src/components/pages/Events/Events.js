import React, { Component } from 'react'

import Posts from '../../blocks/Posts/Posts'

export default class Events extends Component {
  render() {
    return (
      <div style={{ marginRight: '3rem' }}>
        <Posts
          category={'events'}
          categoryTitle="Veranstaltungen"
          mainLink={'seite/veranstaltungen'}
        />
      </div>
    )
  }
}
