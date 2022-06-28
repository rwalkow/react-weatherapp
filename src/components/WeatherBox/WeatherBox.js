import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useCallback, useState } from 'react';


const WeatherBox = () => {
  const API_KEY = '3203300edb2a02afca5d5974c6f3e016';
  const [weather, setWeather] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback(city => {

    setPending(true);
    setError(false);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
   .then(res => {
     if(res.status === 200){

      return res.json()
      .then(data => {

       const weatherData = {
         city: data.name,
         temp: data.main.temp,
         icon: data.weather[0].icon,
         description: data.weather[0].main
       };

        setWeather(weatherData);
        setPending(false);
      });
     } else {
       setError(true);
     }
    })
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      {(weather && !pending && !error) && <WeatherSummary {...weather}/>}
      {(pending && !error) && <Loader />}
      {error && <ErrorBox />}
    </section>
  )
};

export default WeatherBox;
