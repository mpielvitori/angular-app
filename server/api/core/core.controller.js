'use strict';

var _ = require('lodash');
var request = require('request');
var nodemailer = require('nodemailer');
var config = require('../../config/environment');
var directTransport = require('nodemailer-direct-transport');
var transporter = nodemailer.createTransport(directTransport({name:"sistemaglobal.com.ar",debug:false}));
var PDFDocument = require('pdfkit');
var winston = require('winston');
var LoggerError = winston.loggers.get('error');
var LoggerInfo = winston.loggers.get('info');

//ruta para mandar formulario de contacto por mail
exports.sendMail = function(req, res) {
  var contact = req.body;

  var response = res;

  //console.log('Key: '+process.env.RECAPTCHA_PRIVATE_KEY);

  //send request to recaptcha verification server
  request.post('http://www.google.com/recaptcha/api/verify', {
      form: {privatekey: config.RECAPTCHA_PRIVATE_KEY,
        //need requestors ip address
        remoteip: req.connection.remoteAddress,
        challenge: contact.captcha.challenge,
        response: contact.captcha.response}
    },
    function (err, res, body) {
      //if the request to googles verification service returns a body which has false within it means server failed
      //validation, if it doesnt verification passed
      if (body.match(/false/) === null) {

        //Sending mail
        transporter.sendMail({
          from: 'martinpiellvitori@gmail.com',
          to: 'martinpiellvitori@gmail.com',
          subject: 'Contacto',
          generateTextFromHTML: true,
          html: 'Nombre y apellido: <b>'+contact.nomYApe+'</b><br>' +
          'País: <b>'+contact.pais+'</b><br>' +
          'Empresa: <b>'+contact.empresa+'</b><br>' +
          'e-mail: <b>'+contact.mail+'</b><br>' +
          'Teléfono: <b>'+contact.telefono+'</b><br>' +
          'Mensaje: <b>'+contact.mensaje+'</b>'
        });
        LoggerInfo.info('Enviando mail de contacto');
        response.send(200,'Ok');
      } else {
        LoggerError.error('Error al completar captcha - '+err);
        response.send(500, {message: "Código verificador inválido.", err: err})
      }

    }
  );
};

function handleError(res, err) {
  return res.send(500, err);
}
