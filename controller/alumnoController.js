const fetch = require('node-fetch');
const axios = require('axios');
const ipModule = require('ip');

module.exports.mostrar = (req, res) => {
  const clientIp = ipModule.address(); // Obtén la dirección IP privada del cliente
  res.render('index', { "clientIp": clientIp });
};

exports.enviar = async (req, res) => {
  try {
    // Obtén los valores de los campos del formulario
    const frase = req.body.frase;
    const reaccion = req.body.btnReaccion;
    const colorfondo = req.body.colorFondo;
    const colorLetra = req.body.colorLetra;
    const clientIp = req.body.ip; // Asegúrate de que este campo se llame 'ip' en el formulario
    const sexo = req.body.sexo;

    // Define los datos que deseas enviar a la API
    const datos = {
      frase,
      reaccion,
      colorfondo,
      colorLetra,
      ip: clientIp,
      sexo
    };

    // Realiza una solicitud POST a la API con los datos
    const response = await axios.post('https://apicitaparaemergentes.onrender.com/crear', datos);

    // Maneja la respuesta de la API como desees

    // Responde a la solicitud en tu controlador de aplicación
    if (response.data.mensaje === '¡Registro guardado correctamente!') {
      res.redirect(302, '/');
    } else {
      res.status(200).json({ mensaje: response.data.mensaje });
    }
  } catch (error) {
    console.error('Error al enviar la solicitud POST a la API:', error);
    res.status(500).json({ error: 'Error en la solicitud POST a la API' });
  }
};
