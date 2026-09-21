function ConvertHandler() {
    this.getNum = function(input) {
  
        // Regex for separating strings
        let str = /[a-zA-Z]+/;
    
        let result;
        
        // Getting all by spliting letters
        let num = input.split(str)[0];
    
        // Checking for empty values
        if (!num) {
            return 1;
        }
  
        // Checking for / operator
        let index = num.indexOf('/');
        if (index > -1) {
            let newArr = num.split('/');
            
            // Not more than one / operator
            if (newArr.length > 2) {
            return 'invalid number';
            } else {
            // If invalid input then result will be NaN
            result = 1 * (newArr[0] / newArr[1]);
            }
        } else {
            result = 1 * num;
        }
  
        // Checking for NaN values
        if (!result) {
            return 'invalid number';
        }
        return result;
    };
    
    this.getUnit = function(input) {
        if (!input) {
            return 'invalid unit';
        }
        // Regex to match the units
        let regex = /[a-z]+/i;
        let result ;
        let unit = input.match(regex)[0];
        switch (unit) {
            case 'mi':
            result = 'mi';
            break;
            case 'km':
            result = 'km';
            break;
            case 'l':
            result = 'L';
            break;
            case 'gal':
            result = 'gal';
            break;
            case 'lbs':
            result = 'lbs';
            break;
            case 'kg':
            result = 'kg';
            break;
            case 'MI':
            result = 'mi';
            break;
            case 'KM':
            result = 'km';
            break;
            case 'L':
            result = 'L';
            break;
            case 'GAL':
            result = 'gal';
            break;
            case 'LBS':
            result = 'lbs';
            break;
            case 'KG':
            result = 'kg';
            break;
            default:
            result = 'invalid unit';
            break;
        }
    return result;
    };
        
    this.getReturnUnit = function(initUnit) {
        let result;
        switch (initUnit) {
            case 'mi':
            result = 'km';
            break;
            case 'km':
            result = 'mi';
            break;
            case 'L':
            result = 'gal';
            break;
            case 'gal':
            result = 'L';
            break;
            case 'lbs':
            result = 'kg';
            break;
            case 'kg':
            result = 'lbs';
            break;
            default:
            result = 'invalid unit';
            break;
        }
        return result;
    };
    
    this.spellOutUnit = function(unit) {
        let result;
        switch (unit) {
            case 'mi':
            result = 'mile';
            break;
            case 'km':
            result = 'kilometer';
            break;
            case 'L':
            result = 'liter';
            break;
            case 'gal':
            result = 'gallon';
            break;
            case 'lbs':
            result = 'pound';
            break;
            case 'kg':
            result = 'kilogram';
            break;
            default:
            result = 'invalid unit';
            break;
        }
        return result;
    };
    
    this.convert = function(initNum, initUnit) {
        const galToL = 3.78541;
        const lbsToKg = 0.453592;
        const miToKm = 1.60934;
        let result;
        switch (initUnit) {
            case 'mi':
            result = initNum * miToKm;
            break;
            case 'km':
            result = initNum / miToKm;
            break;
            case 'L':
            result = initNum / galToL;
            break;
            case 'gal':
            result = initNum * galToL;
            break;
            case 'lbs':
            result = initNum * lbsToKg;
            break;
            case 'kg':
            result = initNum / lbsToKg;
            break;
            default:
            return 'invalid unit';
        }
        return parseFloat(result.toFixed(5));
    };
    
    this.getString = function(initNum, initUnit, returnNum, returnUnit) {
        return initNum + " " + this.spellOutUnit(initUnit) + "s converts to " + returnNum + " " + this.spellOutUnit(returnUnit) + 's';
    };
    
}
  
module.exports = ConvertHandler;