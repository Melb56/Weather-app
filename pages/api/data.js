import { wmoToDescription, wmoToIcon } from "../../services/wmo";
import config from "../../config.json";

export default async function handler(_req, res) {
  const cityInput = config.city; 

try {

// Intérroge API de géocodage pour obtenir les coordonnées GPS (latitude et longitude)
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      cityInput
    )}&count=1&language=en&format=json`
  );
  const geoData = await geoRes.json();

  // Si ville pas trouver renvoie message d'erreur
  if (!geoData.results || geoData.results.length === 0) {
    return res.status(200).json({ message: "city not found" });
  }

  const { latitude, longitude, name, country_code, timezone } =
    geoData.results[0];


// Interroge API météo
  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${latitude}` +
      `&longitude=${longitude}` +
      `&current=temperature_2m,apparent_temperature,relative_humidity_2m,` +
      `wind_speed_10m,wind_direction_10m,weather_code,visibility,is_day` +
      `&daily=sunrise,sunset` +
      `&timezone=${encodeURIComponent(timezone)}` +
      `&wind_speed_unit=ms` //force le retour en m/s pour être compatible avec les données de converters.js (mk/h pas défaut avec Open-Meteo) 
  );
  const weatherData = await weatherRes.json();

  const current = weatherData.current; //données en temps réel 
  const daily = weatherData.daily; //sunrise & sunset
  const utcOffset = weatherData.utc_offset_seconds; //décalage horaire en secondes

  // Convertit le format des dates de Open-Meteo (format ISO local) pour être compatible avec le formas timestamp unix de OWM
  const toUnix = (isoLocal) =>
    new Date(isoLocal + "Z").getTime() / 1000 - utcOffset;

// Normalisation des données pour que le format soit compatible avec celui de OWM
  const normalized = {
    name,
    sys: {
      country: country_code,
      sunrise: toUnix(daily.sunrise[0]),
      sunset:  toUnix(daily.sunset[0]),
    },
    main: {
      temp:       current.temperature_2m,
      feels_like: current.apparent_temperature,
      humidity:   current.relative_humidity_2m,
    },
    wind: {
      speed: current.wind_speed_10m,   
      deg:   current.wind_direction_10m,
    },
    weather: [
      {
        description: wmoToDescription(current.weather_code),
        icon:        wmoToIcon(current.weather_code, current.is_day === 1),
      },
    ],
    dt:         toUnix(current.time),
    timezone:   utcOffset,
    visibility: current.visibility, 
  };

  res.status(200).json(normalized);

  // Si il y a une erreur dans le code, renvois un message d'erreur
  } catch (error) {
      console.error("Erreur fetch Open-Meteo :", error);
      res.status(200).json({ message: "service unavailable" });
    }
  }