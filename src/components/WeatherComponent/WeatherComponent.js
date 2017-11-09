import React, { Component } from 'react';
import store from '../../configureStore';
import * as weatherActions from '../../actions/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WeatherInfo from "../WeatherInfo/WeatherInfo";

class WeatherComponent extends Component {

  // componentDidMount() {
  //   this.props.weatherActions.getLocation();
  //   this.props.weatherActions.getWeather();
  // }

  render() {
    return (
      <div>
        <h1>The weather</h1>
        <WeatherInfo weather={this.props.weather} />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    loadingWeather: state.weather.loadingWeather,
    loadingLocation: state.weather.loadingLocation,
    location: state.weather.location,
    weather: state.weather.weather,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    weatherActions: bindActionCreators(weatherActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherComponent);
