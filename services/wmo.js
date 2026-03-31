// Interprétation codes WMO 
export const wmoToDescription = (code) => {
  const map = {
    0: "ciel dégagé",
    1: "majoritairement dégagé",
    2: "partiellement nuageux",
    3: "couvert",
    45: "brouillard",
    48: "brouillard givrant",
    51: "crachin léger",
    53: "crachin",
    55: "crachin fort",
    56: "crachin verglaçant",
    57: "crachin verglaçant fort",
    61: "pluie légère",
    63: "pluie",
    65: "pluie forte",
    66: "pluie verglaçante",
    67: "pluie verglaçante forte",
    71: "neige légère",
    73: "neige",
    75: "neige forte",
    77: "grésil",
    80: "averses légères",
    81: "averses",
    82: "averses fortes",
    85: "averses de neige",
    86: "averses de neige fortes",
    95: "orage",
    96: "orage avec grêle",
    99: "orage avec forte grêle",
  };
  return map[code] ?? "unknown";
};

/// Connexion codes aux icônes OWM
export const wmoToIcon = (code, isDay) => {
  const s = isDay ? "d" : "n";
    if (code === 0)                                return `01${s}`;
    if (code === 1)                                return `02${s}`; 
    if (code === 2)                                return `03${s}`; 
    if (code === 3)                                return `04${s}`; 
    if ([45, 48].includes(code))                   return `50${s}`; 
    if ([51, 53, 55, 56, 57].includes(code))       return `09${s}`; 
    if ([61, 63, 65, 66, 67].includes(code))       return `10${s}`;
    if ([71, 73, 75, 77, 85, 86].includes(code))   return `13${s}`; 
    if ([80, 81, 82].includes(code))               return `09${s}`; 
    if ([95, 96, 99].includes(code))               return `11${s}`; 
    return `01${s}`;
};