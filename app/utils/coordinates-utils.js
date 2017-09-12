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

export { decimalToDMS };
