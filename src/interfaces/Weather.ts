export interface IWeatherInfo {
  coord: Coord;
  sys: Sys;
  weather: Weather[];
  main: Main;
  wind: Wind;
  rain: Rain;
  clouds: Clouds;
  dt: number;
  id: number;
  visibility: number;
  name: string;
  cod: number;
}

interface Clouds {
  all: number;
}

interface Rain {
  "3h": number;
}

interface Wind {
  speed: number;
  deg: number;
}

interface Main {
  temp: number;
  humidity: number;
  pressure: number;
  temp_min: number;
  temp_max: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Sys {
  country: string;
  sunrise: number;
  sunset: number;
}

interface Coord {
  lon: number;
  lat: number;
}
