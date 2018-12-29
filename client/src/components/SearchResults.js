import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import '../styles/SearchResults.css';

class SearchResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productsFound: null

    }
    console.log('this is the props content: ' + props.results)
    console.log('this is the productsFound content: ' + this.state.productsFound)
  }

  render(){
    return(
      // <div><p>{this.props.product.name}</p></div>
        <div className="product">
          <div id="thumbnail">
            <img src={this.props.product.thumbnailURL} alt={this.props.product.name} />
          </div>
          <div className="product-detail">
            <p id="product-name">{this.props.product.name}</p>
            <p id="product-info">Merchant: {this.props.product.merchantName}</p>
            <p id="product-info">Price(USD): {this.props.product.priceAsString}</p>
            <a href={this.props.product.url} id="product-info">Buy it with Bitcoin!</a>
          </div>
        </div>
    )
  }
}

export default SearchResults;

{/* <div className="search-results">
  <div>
    <Navigation></Navigation>
  </div>
  <div className="results-wrapper"></div>
  <div>
    <Footer></Footer>
  </div>
</div> */}
