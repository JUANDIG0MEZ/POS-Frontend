
// export function formatearMiles(valor, decimalesDefault=3){
//     const numero = Number(valor);
//     if (!Number.isFinite(numero)) throw new Error('Valor no numerico')


//     // Detectar la cantidad de decimales originales (hasta 3)
//     const partes = String(valor).split('.');
//     const decimalesOriginales = partes[1] ? partes[1].length : 0;
//     const decimales = Math.min(decimalesOriginales, decimalesDefault);

//     // Redondear y separar
//     const [entero, decimal = ''] = numero
//     .toFixed(decimales)
//     .split('.');

//     const enteroFormateado = entero.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

//     return decimales > 0 ? `${enteroFormateado}.${decimal}` : enteroFormateado;

// }


export function formatearMiles(valor, decimales = 2) {
  const numero = Number(valor);

  if (!Number.isFinite(numero)) {
    throw new Error('Valor no numérico');
  }

  const [entero, decimal = ''] = numero.toString().split('.');
    // .toFixed(decimales)

  const enteroFormateado = entero.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return decimales > 0
    ? `${enteroFormateado}.${decimal}`
    : enteroFormateado;
}



console.log(formatearMiles(12341))