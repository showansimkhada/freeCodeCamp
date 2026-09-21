'use strict';
const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let locale = req.body.locale;
      let text = req.body.text;
      
      if (text === '') {
        res.json({
          "error": "No text to translate"
        })
      }
      if (!text || !locale){
        res.json({
          'error': 'Required field(s) missing'
        })
      }
      else {
        // translate to british
        var result;
        if (locale === 'american-to-british') {
          result = translator.traTBr(text);
        } else if (locale === 'british-to-american'){
            result = translator.traTAm(text);
        } else {
          return res.json({
            'error': 'Invalid value for locale field'
          })
        }
        if (result === text) {
          return res.json({
            text: text,
            translation: "Everything looks good to me!"
          })
        } else {
          return res.json({
            text: text,
            translation: result
          })
        }
      }
    });
};