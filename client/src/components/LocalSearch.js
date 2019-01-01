import React from 'react';
import axios from 'axios';
import '../styles/LocalSearch.css';
// import MapContainer from './MapContainer';
import Navigation from './Navigation';
import Footer from './Footer';
import SearchLocalForm from './SearchLocalForm';
import Geocode from 'react-geocode'
import VenuesMap from './VenuesMap';

class LocalSearch extends React.Component {
  constructor(){
    super()
    this.state = {
      venues: [],
      searchValue: '',
      cityLat: 42.3601,
      cityLong: -71.0589
    }
  }

  async componentDidMount() {
    let { data } = await axios.get("http://cors-anywhere.herokuapp.com/coinmap.org/api/v1/venues/")
    this.setState({
      venues: data.venues
    })
    console.log(this.state.venues)
  }

   getLocationFromName =  () => {
     Geocode.setApiKey("AIzaSyDbO74TKJ17IJHpBJ9Q9IQu3BOY4LooR5w");
    let city = this.state.searchValue
    console.log(`city:`+city)
    Geocode.fromAddress(city).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({
          cityLat: lat,
          cityLong: lng
        })
        console.log(`lat:`+this.state.cityLat)
        console.log(`long` +this.state.cityLong)
      },
      error => {
        console.error("city not found");
      }
    );
  }

  handleLocalSubmit = (event) => {
    event.preventDefault();

    console.log(`state.searchValue: ` +this.state.searchValue)
    this.getLocationFromName()
    this.setState({
      searchValue: ''
    })
  }

  handleLocalSearchChange = (event) => {
    event.preventDefault();
    this.setState({
      searchValue: event.target.value

    })
  }


  render(){
    return(
      <div>
        <Navigation />

        <div className="main-local-search">
        <h1>Search Local Retailers</h1>
          <SearchLocalForm onSubmit={this.handleLocalSubmit} localSearchValue={this.state.localSearchValue} handleChange={this.handleLocalSearchChange}/>
          <div className="map-render">
            <VenuesMap
              venues={this.state.venues}
              lat={this.state.cityLat}
              lng={this.state.cityLong}
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDbO74TKJ17IJHpBJ9Q9IQu3BOY4LooR5w&v=3.exp&libraries=geometry,drawing,places`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `80vh`, width: `90vw` }} />}
              mapElement={<div style={{ height: `100%` }} />} />
          </div>
        </div>

        <Footer />
      </div>
    )
  }
}

export default LocalSearch
