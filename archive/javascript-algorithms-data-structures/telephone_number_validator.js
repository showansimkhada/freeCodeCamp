function telephoneCheck(str) {
    if (str[0].match("[-]")) {
        // console.log("checking for -")
        return false
    } 
    let array = str.split("")
    let result = ''
    let num = []
    for (let i in array) {
        if (array[i].match("[0-9]")) {
            num.push(parseInt(array[i]))
            result += array[i]
        } else if (array[i].match("[-]")) {
            result += array[i]
        } else if (array[i].match("[()]")) {
            result += array[i]
        } else if (array[i].match("\\s")){
            result += array[i]
        } else {
            return false
        }
    }
    let a = result.indexOf("(");
    let b = result.indexOf(")");
    if (a == -1 && b > -1) {
        return false
    } else if (a > b) {
        return false
    }
    // checking for the country code
    if (result.length === 10 && result[0].match("[2-5]")) {
        return true
    } else if (result.length > 10) {
        if (num.length === 11){
            // console.log("checking for country code");
            if (result[0].match('[1]') && num[0] == 1) {
                return true
            }
            return false
        } else if (result[1].match("[06-9]")) {
            // console.log("checking for area codes")
            return false
        } else {
            if (num.length > 11) {
                return false
            }
            let x = 0;
            for (let i in result) {
                if (result[i].match("[-]")) {
                    x++;
                }
            }
            if (x > 2) {
                return false;
            } else {
                return true;
            }
        }
    } else {
       return false
    }
}

console.log(true, telephoneCheck("555-555-5555"))
console.log(true,telephoneCheck("1 555-555-5555"))
console.log(true,telephoneCheck("1 (555) 555-5555"))
console.log(true,telephoneCheck("5555555555"))
console.log(true,telephoneCheck("555-555-5555"))
console.log(true,telephoneCheck("(555)555-5555"))
console.log(true,telephoneCheck("1(555)555-5555"))
console.log(false,telephoneCheck("555-5555"))
console.log(false,telephoneCheck("5555555"))
console.log(false,telephoneCheck("1 555)555-5555"))
console.log(true,telephoneCheck("1 555 555 5555"))
console.log(true,telephoneCheck("1 456 789 4444"))
console.log(false,telephoneCheck("123**&!!asdf#"))
console.log(false,telephoneCheck("55555555"))
console.log(false,telephoneCheck("(6054756961)"))
console.log(false,telephoneCheck("2 (757) 622-7382"))
console.log(false,telephoneCheck("0 (757) 622-7382"))
console.log(false,telephoneCheck("-1 (757) 622-7382"))
console.log(false,telephoneCheck("2 757 622-7382"))
console.log(false,telephoneCheck("10 (757) 622-7382"))
console.log(false,telephoneCheck("27576227382"))
console.log(false,telephoneCheck("(275)76227382"))
console.log(false,telephoneCheck("2(757)6227382"))
console.log(false,telephoneCheck("2(757)622-7382"))
console.log(false,telephoneCheck("555)-555-5555"))
console.log(false,telephoneCheck("(555-555-5555"))
console.log(false,telephoneCheck("(555)5(55?)-5555"))
console.log(false, telephoneCheck("55 55-55-555-5"))
console.log(false, telephoneCheck("11 555-555-5555"))