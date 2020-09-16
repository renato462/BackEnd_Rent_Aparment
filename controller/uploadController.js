const { v4: uuidv4 } = require("uuid");

exports.uploadFiles = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No files were uploaded.",
    });
  }

  //Procesar Imagenes

  const file = req.files.images;

  const nombreContado = file.name.split(".");

  const extensionArchivo = nombreContado[nombreContado.length - 1];

  const extensionesValidas = ["png", "jpg", "gif", "jpeg"];

  if (!extensionesValidas.includes(extensionArchivo)) {
    return res.status(400).json({
      ok: false,
      msg: "No es una extensión permitida",
    });
  }
  // Generar nombre del archivo
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

  const path = `./uploads/${nombreArchivo}`;

  file.mv(path, (err) => {
    if (err) {
      return res
                .status(500)
                .json({
                  ok: false,
                  msg: "Error al cargar el archivo",
                });
    }
    res
      .status(200)
      .json({ 
          ok: true, 
          msg: "Archivo cargado correctamente", 
          nombreArchivo 
        });
  });
};
