import {mount} from "@vue/test-utils";
import CityItem from "@/components/CityItem.vue";
import { IWeatherInfo } from "@/interfaces/Weather";

const createWrapper = () => {
  return mount(CityItem,{
    props:{
     weatherInfo: {
        "coord": {
            "lon": 37.6156,
            "lat": 55.7522
        },
        "sys": {
            "country": "RU",
            "timezone": 10800,
            "sunrise": 1671170036,
            "sunset": 1671195375
        },
        "weather": [
            {
                "id": 804,
                "main": "Clouds",
                "description": "nublado",
                "icon": "04d"
            }
        ],
        "main": {
            "temp": -3.85,
            "feels_like": -7.99,
            "temp_min": -4.09,
            "temp_max": -2.9,
            "pressure": 1023,
            "sea_level": 1023,
            "grnd_level": 1004,
            "humidity": 92
        },
        "visibility": 10000,
        "wind": {
            "speed": 2.87,
            "deg": 252
        },
        "clouds": {
            "all": 90
        },
        "dt": 1671188824,
        "id": 524901,
        "name": "Moscow"
    }
    }
  });
};

it("expect all texts to be rendered", () => {
  const wrapper = createWrapper();

  expect(wrapper.html()).toMatchSnapshot();
});

