function rot13(str) {
    let regex = new RegExp("[A-Z]");
    let array = str.split('');
    let result = []
    for (let i in array) {
        if (array[i].match(regex)) {
            let x = array[i].charCodeAt() + 13
            if (x > 90) {
                y = x - 90;
                y += 64
                x = y
            } 
            result.push(String.fromCharCode(x))
        } else {
            result.push(array[i])
        }
    }
    return result.join("")
}

let x = rot13("SERR CVMMN!")
console.log(x)