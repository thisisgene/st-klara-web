import React, { Component } from 'react'
import axios from 'axios'

export default class Galleries extends Component {
  state = {
    galleries: [],
    isLoaded: false
  }

  componentDidMount() {
    axios
      .get('/wp-json/wp/v2/galleries')
      .then(res =>
        this.setState({
          galleries: res.data,
          isLoaded: true
        })
      )
      .catch(err => console.log(err))
  }
  render() {
    const { isLoaded, galleries } = this.state

    return (
      <div>
        {galleries
          .filter(gallery => gallery.acf.parent_dir === false)
          .map((gallery, index) => (
            <div key={index}>
              <div>{gallery.title.rendered}</div>
              {galleries
                .filter(
                  subGallery => subGallery.acf.parent_dir.ID === gallery.id
                )
                .map((subGallery, sIndex) => (
                  <div key={sIndex} style={{ marginLeft: '10px' }}>
                    {subGallery.title.rendered}
                  </div>
                ))}
            </div>
          ))}
      </div>
    )
  }
}
