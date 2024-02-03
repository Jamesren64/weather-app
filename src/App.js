import { Button, TextField, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { useEffect } from 'react';
function App() {
  const [weatherData, setweatherData] = useState(undefined);
  const [location, setlocation] = useState('Dallas');
  const [textVal, setTextVal] = useState("");
  useEffect(() => {
    axios.get(`https://api.weatherapi.com/v1/forecast.json?key=4093378de8d94e129a425650240302&q=${location}&aqi=no&days=7`)
      .then(res => {
          setweatherData(res.data);
      })
  }, [location])
  
  if (!weatherData) {
    return <CircularProgress></CircularProgress>
  }
  function updateCurText(event) {
    setTextVal(event.target.value)
  }
  function handleClick() {
    setlocation(textVal)
  }
  return (
    <Stack alignItems={'center'}>
      <Stack marginTop={2} justifyContent={'center'} flexDirection={'row'}>
          <Typography variant="h3">My Weather App</Typography>
      </Stack>
      <Stack>
          <TodaysWeather forecastday={weatherData.forecast.forecastday[0].day} location={location} />
          <Stack flexDirection={'row'} gap={1} alignSelf={'center'} marginTop={2}>
            {weatherData.forecast.forecastday.slice(1).map((day) => <ForecastBlock forecastday={day} />)}
          </Stack>
      </Stack>
      <Stack width={250} gap={1} marginTop={2} flexDirection={'row'}>
        <TextField id="outlined-basic" label="Your Location" variant="outlined" onChange={updateCurText} value={textVal}/>
        <Button variant="contained" onClick={handleClick}>Save</Button>
      </Stack>
    </Stack>
  );
}

// TodaysWeather(forecastday) -> forcastday = {forecastday: {temp: ...}}
function TodaysWeather(props) {
  const forecastday = props.forecastday
  const location = props.location
  if (!forecastday) {
    return <CircularProgress></CircularProgress>
  }
  const day = forecastday
  return (
    <>
    <Stack marginTop={2} width={350} height={150} padding={1} sx={{flexDirection: 'row', border: '1px solid gray', borderRadius: 2, alignSelf: 'center', justifyContent: 'space-evenly'}}>
          <Stack sx={{flexDirection: 'collum'}}>
            <Typography variant="h6">Today</Typography>
            <Typography variant="h7">{day.condition.text}</Typography>
            <Typography variant="h6">{day.avgtemp_f}°F</Typography>
            <img src={day.condition.icon} width={60}/>
          </Stack>
          <Stack marginTop={2} sx={{flexDirection: 'collum', alignItems:'center'}}>
          <Typography variant="h6">{location}</Typography>
            <Typography variant="h7">Humidity: {day.avghumidity}%</Typography>
            <Typography variant="h7">Precipitation: {day.totalprecip_in}%</Typography>
            <Typography variant="h7">Wind: {day.maxwind_mph} mph</Typography>
          </Stack>
    </Stack>
    </>
  )
}
function ForecastBlock(forecastday) {
  if (!forecastday?.forecastday?.day) {
    return <CircularProgress></CircularProgress>
  }
  const day = forecastday.forecastday.day
  return (
    <>
    <Stack width={150} padding={1} sx={{border: '1px solid gray', borderRadius: 2}}>
      <Typography>
        {forecastday.forecastday.date}
      </Typography>
      <Typography>
        {day.condition.text}
      </Typography>
      <Typography>
        {day.avgtemp_f}°F
      </Typography>
      <img src={day.condition.icon} width={50}/>
    </Stack>
    </>
  )
}

export default App;
