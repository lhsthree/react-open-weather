import React from 'react';
import "../index.css"

const Weather = (props) => {
	return(
		<div className="container">
			<div className="cards">
				<h1>{props.city}</h1>
				<h5 className='py-4'>
					<i className={`wi ${props.weatherIcon} display-1`}></i>
				</h5>

				{props.temp ? (<h1 className="py-2">{props.temp}&deg;</h1>) : null}
				
			
				{minmaxTemp(props.minTemp, props.maxTemp)}
			
				<h4 className="py-3">{props.description.toUpperCase()}</h4>
			</div>
		</div>
	)
}

export default Weather;

function minmaxTemp(min, max) {
	if(min, max){
		return(
		<h3>
			<span className="px-4">
				{min}&deg;
			</span>
			<span className="px-4">
				{max}&deg;
			</span>
		</h3>
		)
	}	
}

