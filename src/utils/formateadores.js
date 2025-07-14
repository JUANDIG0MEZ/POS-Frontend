export function formatearMiles(numero) {

  const str = String(numero ?? '');

  // Verifica si termina con un punto (por ejemplo "1.")
  const terminaEnPunto = str.endsWith('.');

  const [entero, decimal] = str.split('.');

  const parteEnteraConComas = entero.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (decimal !== undefined) {
    return `${parteEnteraConComas}.${decimal}`;
  } else if (terminaEnPunto) {
    return `${parteEnteraConComas}.`;
  } else {
    return parteEnteraConComas;
  }
}