import React from 'react';

const WeatherInfo = (props) => {
    console.log(props);

    const kelvinToCelsius = kelvin => (Math.round((kelvin - 273.15) * 100) / 100);

    return(
        <p>The weather at this moment is {kelvinToCelsius(280)} &#8451;</p>
    );
}

export default WeatherInfo;