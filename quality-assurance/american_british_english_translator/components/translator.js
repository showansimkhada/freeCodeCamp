const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js');
    
class Translator {
    traTAm(str) {
        let sentence = str;
        var keys = Object.keys(britishOnly);
        for (let i = 0; i < keys.length; i++) {
            // use `` to get the value from variables and treat them as string //b for words
            let regex = new RegExp(`(${keys[i]}\\b)`, "gi");
            if (sentence.match(regex)) {
                let trans = sentence.replace(regex, '<span class="highlight">' + britishOnly[keys[i]] + '</span>');
                sentence = trans;
            }
        }
        keys = Object.keys(americanToBritishSpelling);
        for (let i = 0; i < keys.length; i++) {
            let regex = new RegExp(`(${americanToBritishSpelling[keys[i]]}\\b)`, "gi");
            if (sentence.match(regex)) {
                let trans = sentence.replace(regex, '<span class="highlight">' + keys[i] + '</span>');
                sentence = trans;
            }
        }
        keys = Object.keys(americanToBritishTitles);
        for (let i = 0; i < keys.length; i++) {
            let regex = new RegExp(`(${americanToBritishTitles[keys[i]]})`, 'gi')
            if (sentence.match(regex)){
                let replace = this.camelCase(keys[i]);
                let trans = sentence.replace(regex, '<span class="highlight">'+ replace +'</span>');
                sentence = trans;
            }
        }
         // change the time pattern
         // Using group capture to replace time
         let regex = new RegExp(/(\d+)(.|:)(\d+)/)
         if (sentence.match(regex)) {
            // replacing only 2 and 4 which represents the time from capture group
            let replace = '$1:$3';
            let trans = sentence.replace(regex, '<span class="highlight">' + replace + '</span>');
            sentence = trans;
         }
        return sentence;
    }

    traTBr(str) {
        let sentence = str;
        var keys = Object.keys(americanOnly);
        for (let i = 0; i < keys.length; i++) {
            // use `` to get the value from variables and treat them as string //b for words
            let regex = new RegExp(`(${keys[i]}\\b)`, "gi");
            if (sentence.match(regex)) {
                let trans = sentence.replace(regex, '<span class="highlight">' + americanOnly[keys[i]] + '</span>');
                sentence = trans;
            }
        }
        keys = Object.keys(americanToBritishSpelling);
        for (let i = 0; i < keys.length; i++) {
            let regex = new RegExp(`(${keys[i]}\\b)`, "gi");
            if (sentence.match(regex)) {
                let trans = sentence.replace(regex, '<span class="highlight">' + americanToBritishSpelling[keys[i]] + '</span>');
                sentence = trans;
            }
        }
        keys = Object.keys(americanToBritishTitles);
        for (let i = 0; i < keys.length; i++) {
            let regex = new RegExp(`(${keys[i]})`, 'gi')
            if (sentence.match(regex)){
                let replace = this.camelCase(americanToBritishTitles[keys[i]]);
                let trans = sentence.replace(regex, '<span class="highlight">'+ replace +'</span>');
                sentence = trans;
            }
        }
        // change the time pattern
        let regex = new RegExp(/(\d+)(.|:)(\d+)/)
        if (sentence.match(regex)) {
            // replacing only 2 and 4 which represents the time from capture group
            let replace = '$1.$3';
            let trans = sentence.replace(regex, '<span class="highlight">' + replace + '</span>');
            sentence = trans;
        }
        return sentence;
    }

    camelCase(str) {
        let result = str.toLowerCase().replace(/(^|\s)\S/g, L => L.toUpperCase());
        return result;
    }
}

module.exports = Translator;