
import React from 'react'
import Weather from './components/Weather'
import 'weather-icons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const APIKey = 'ed57143d6c011af89f826215b51c68c1'


class App extends React.Component {
  constructor(){
    super()
    this.state ={
      city: undefined,
      country: undefined
    };
    this.getWeather()
  }

  getWeather = async () => {
    const APICall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${APIKey}`)
  
    const response = await APICall.json();

    console.log(response)

    this.setState({
      city: response.name,
      country: response.sys.country
    })
  }

  render() {
    return (
    
    <Weather city={this.state.city} country={this.state.country}/>
    
    );
  }
}

export default App;

