function convertToRoman(num) {
    let romNum = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
    let arbNum = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    let x = num;
    let str = ''
    for (let i in arbNum) {
        while (x >= arbNum[i]) {
            x -= arbNum[i]
            str += romNum[i]
        }
    }
    return str;
}
   
console.log(convertToRoman(29));