
import React from 'react'
import Weather from './components/Weather'
import Form from './components/Form'
import 'weather-icons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const APIKey = 'ed57143d6c011af89f826215b51c68c1'


class App extends React.Component {
  constructor(){
    super()
    this.state ={
      city: undefined,
      country: undefined,
      icon: undefined,
      temp: undefined,
      minTemp: undefined,
      maxTemp: undefined,
      description: "",
      error: false
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    }
  }

  getWeatherIcon(icons, rangeID) {
    switch(true){
      case rangeID >= 200 && rangeID <= 232:
        this.setState({icon: this.weatherIcon.Thunderstorm});
        break;
      case rangeID >= 300 && rangeID <= 321:
        this.setState({icon: this.weatherIcon.Drizzle});
        break;
      case rangeID >= 500 && rangeID <= 531:
        this.setState({icon: this.weatherIcon.Rain});
        break;
      case rangeID >= 600 && rangeID <= 622:
        this.setState({icon: this.weatherIcon.Snow});
        break;
      case rangeID >= 701 && rangeID <= 781:
        this.setState({icon: this.weatherIcon.Atmosphere});
        break;
      case rangeID === 800:
        this.setState({icon: this.weatherIcon.Clear});
        break;
      case rangeID >= 801 && rangeID <= 804:
        this.setState({icon: this.weatherIcon.Clouds});
        break;
      default:
        this.setState({icon: this.weatherIcon.Clouds})
    }
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15)
    return cell;
  }

  getWeather = async (e) => {

    e.preventDefault();

    const city = e.target.elements.city.value
    const country = e.target.elements.country.value
    if(city && country){
    const APICall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APIKey}`)
  
    const response = await APICall.json();

    console.log(response)

    this.setState({
      city: `${response.name},${response.sys.country}`,
      country: response.sys.country,
      temp: this.calCelsius(response.main.temp),
      minTemp: this.calCelsius(response.main.temp_min),
      maxTemp: this.calCelsius(response.main.temp_max),
      description: response.weather[0].description,
    })

    this.getWeatherIcon(this.weatherIcon,response.weather[0].id)
  }else{
    this.setState({error:true})
  }
}
  render() {
    return (
    <div className="container">
    <Form 
      loadWeather={this.getWeather}
      error={this.state.error}
    />
    <Weather 
      description={this.state.description}
      maxTemp={this.state.maxTemp}
      minTemp={this.state.minTemp}
      temp={this.state.temp} 
      city={this.state.city} 
      country={this.state.country}
      weatherIcon={this.state.icon}
    />
    </div>
    
    );
  }
}

export default App;

