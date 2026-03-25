// Interprétation codes WMO 
export const wmoToDescription = (code) => {
  const map = {
    0: "clear sky",
    1: "mainly clear",
    2: "partly cloudy",
    3: "overcast",
    45: "fog",
    48: "icy fog",
    51: "light drizzle",
    53: "drizzle",
    55: "heavy drizzle",
    56: "freezing drizzle",
    57: "heavy freezing drizzle",
    61: "light rain",
    63: "rain",
    65: "heavy rain",
    66: "freezing rain",
    67: "heavy freezing rain",
    71: "light snow",
    73: "snow",
    75: "heavy snow",
    77: "snow grains",
    80: "light showers",
    81: "rain showers",
    82: "heavy rain showers",
    85: "snow showers",
    86: "heavy snow showers",
    95: "thunderstorm",
    96: "thunderstorm with hail",
    99: "thunderstorm with heavy hail",
  };
  return map[code] ?? "unknown";
};

/// Connexion codes aux îcones OWM
export const wmoToIcon = (code, isDay) => {
  const s = isDay ? "d" : "n";
    if (code === 0)                                return `01${s}`; // clear sky
    if (code === 1)                                return `02${s}`; // mainly clear
    if (code === 2)                                return `03${s}`; // partly cloudy
    if (code === 3)                                return `04${s}`; // overcast
    if ([45, 48].includes(code))                   return `50${s}`; // fog, icy fog
    if ([51, 53, 55, 56, 57].includes(code))       return `09${s}`; // light drizzle, drizzle, heavy drizzle, freezing drizzle, heavy freezing drizzle
    if ([61, 63, 65, 66, 67].includes(code))       return `10${s}`; // light rain, rain, heavy rain, freezing rain, heavy freezing rain
    if ([71, 73, 75, 77, 85, 86].includes(code))   return `13${s}`; // light snow, snow, heavy snow, snow grains, snow showers, heavy snow showers
    if ([80, 81, 82].includes(code))               return `09${s}`; // light showers, rain showers, heavy rain showers
    if ([95, 96, 99].includes(code))               return `11${s}`; // thunderstorm, thunderstorm with hail, thunderstorm with heavy hail
    return `01${s}`;
};