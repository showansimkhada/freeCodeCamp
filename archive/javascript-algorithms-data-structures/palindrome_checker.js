function palindrome(str) {
    let array = str.split('')
    let barr = []
    let regex = new RegExp("[a-zA-Z0-9]")
    // select only digits and letter
    for (let i in array ) {
        if (array[i].match(regex)) {
            barr.push(array[i].toLowerCase())
        }
    }
    // joint the array letter to one
    let a = barr.join('')

    // reverse the array and join
    let b = barr.reverse().join('');

    if (a === b) {
        return true;
    } else {
        return false;
    }
}

console.log(palindrome("My age is 0, 0 si ega ym."));