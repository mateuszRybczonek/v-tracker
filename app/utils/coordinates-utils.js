function decimalToDMS(decimal, latitude = true, degrees = 0, minutes = 0, seconds = 0, direction = 'X') {
  if(latitude && decimal < 0) {
    direction = 'S';
  }
  else if(!latitude && decimal < 0) {
    direction = 'W';
  }
  else if(!latitude) {
    direction = 'E';
  } else {
    direction = 'N';
  }

  const d = Math.abs(decimal);
  degrees = Math.floor(d);

  seconds = (d - degrees) * 3600;

  minutes = (Math.round(seconds / 60 * 10) / 10).toFixed(1);

  let formattedDegree = null;

  if (latitude) {
    formattedDegree = `${('0' + degrees).slice(-2)}${String.fromCharCode(176)}`;
  } else {
    formattedDegree = `${('00' + degrees).slice(-3)}${String.fromCharCode(176)}`;
  }

  const formattedMinutes = `${('0' + minutes).slice(-4)}'`;

  return `${formattedDegree} ${formattedMinutes} ${direction}`;
}

function distanceBetweenPoints(depLat, depLng, arrLat, arrLng) {
  const R = 6371e3;
  const φ1 = depLat.toRadians();
  const φ2 = arrLat.toRadians();
  const Δφ = (arrLat-depLat).toRadians();
  const Δλ = (arrLng-depLng).toRadians();

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ/2) * Math.sin(Δλ/2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}

export { decimalToDMS, distanceBetweenPoints };
