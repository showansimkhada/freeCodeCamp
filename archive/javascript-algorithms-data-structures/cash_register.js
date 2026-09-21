function checkCashRegister(price, cash, cid) {
    const obj = {
        status: "",
        change: []
    }
    var total = 0;
    cid.forEach((v, k) => {
        total += cid[k][1];
    });
    var array = cid.reverse();
    let ret = cash - price;
    if (ret > total) {
        obj.status = "INSUFFICIENT_FUNDS";
        return obj;
    } 
    else {
        obj.status = "OPEN"
        for (let i = 0; i < 9; i++) {
            var str = array[i][0]
            var tCash = array[i][1];
            switch (str) {
                case "ONE HUNDRED":
                    var val = 100;
                    var x = coins(ret, tCash, val);
                    // console.log(x)
                    if (x >= val){
                        obj.change.push(["ONE HUNDRED", x]);
                        ret = ret - x;
                        ret = ret.toFixed(2);
                        array[i][1] = array[i][1] - x;
                    } else if (tCash == 0 ) {
                        obj.change.push(["ONE HUNDRED", tCash]);
                    }
                    break;
                case "TWENTY":
                    var val = 20;
                    var x = coins(ret, tCash, val);
                    // console.log(x)
                    if (x >= val){
                        obj.change.push(["TWENTY", x]);
                        ret = ret - x;
                        ret = ret.toFixed(2);
                        array[i][1] = array[i][1] - x;
                    } else if (tCash == 0 ) {
                        obj.change.push(["TWENTY", tCash]);
                    }
                    break;
                case "TEN":
                    // console.log(ret)
                    var val = 10;
                    var x = coins(ret, tCash, val);
                    // console.log(x)
                    if (x >= val){
                        obj.change.push(["TEN", x]);
                        ret = ret - x;
                        ret = ret.toFixed(2);
                        array[i][1] = array[i][1] - x;
                    } else if (tCash == 0 ) {
                        obj.change.push(["TEN", tCash]);
                    }
                    break;
                case "FIVE":
                    // console.log(ret)
                    var val = 5;
                    var x = coins(ret, tCash, val);
                    // console.log(x)
                    if (x >= val){
                        obj.change.push(["FIVE", x])
                        ret = ret - x;
                        ret = ret.toFixed(2);
                        array[i][1] = array[i][1] - x;
                    } else if (tCash == 0 ) {
                        obj.change.push(["FIVE", tCash]);
                    }
                    break;
                case "ONE":
                    // console.log(ret)
                    var val = 1;
                    var x = coins(ret, tCash, val);
                    // console.log(x)
                    if (x >= val){
                        obj.change.push(["ONE", x]);
                        ret = ret - x;
                        ret = ret.toFixed(2);
                        array[i][1] = array[i][1] - x;
                    } else if (tCash == 0 ) {
                        obj.change.push(["ONE", tCash]);
                    }
                    break;
                case "QUARTER":
                    // console.log(ret)
                    var val = 0.25;
                    var x = coins(ret, tCash, val);
                    // console.log(x)
                    if (x >= val){
                        obj.change.push(["QUARTER", x]);
                        ret = ret - x;
                        ret = ret.toFixed(2);
                        array[i][1] = array[i][1] - x;
                    } else if (tCash == 0 ) {
                        obj.change.push(["QUARTER", tCash]);
                    }
                    break;
                case "DIME":
                    // console.log(ret)
                    var val = 0.1;
                    var x = coins(ret, tCash, val);
                    // console.log(x)
                    if (x >= val){
                        obj.change.push(["DIME", x]);
                        ret = ret - x;
                        ret = ret.toFixed(2);
                        array[i][1] = array[i][1] - x;
                    } else if (tCash == 0 ) {
                        obj.change.push(["DIME", tCash]);
                    }
                    break;
                case "NICKEL":
                    // console.log(ret)
                    var val = 0.05;
                    var x = coins(ret, tCash, val);
                    // console.log(x)
                    if (x >= val){
                        obj.change.push(["NICKEL", x]);
                        ret = ret - x;
                        ret = ret.toFixed(2);
                        array[i][1] = array[i][1] - x;
                    } else if (tCash == 0 ) {
                        obj.change.push(["NICKEL", tCash]);
                    }
                    break;
                case "PENNY":
                    // console.log(ret)
                    var val = 0.01;
                    var x = coins(ret, tCash, val);
                    // console.log(x)
                    if (x >= val){
                        obj.change.push(["PENNY", x]);
                        ret = ret - x;
                        ret = ret.toFixed(2);
                        array[i][1] = array[i][1] - x;
                    } else if (tCash == 0 ) {
                        obj.change.push(["PENNY", tCash]);
                    }
                    break;
            }
        }
    }
    var z = 0;
    array.forEach((v, k) => {
        z += array[k][1];
    });
    if ( ret > 0) {
        obj.status= "INSUFFICIENT_FUNDS", 
        obj.change= []
    }
    if (z === 0) {
        obj.status = "CLOSED";
        obj.change.reverse();
    }
    return obj;
}

function coins(ret, tCash, val) {
    let x = 0;
    if (ret >= tCash) {
        x = tCash
    } else {
        while (ret >= val && tCash > 0) {
            ret = parseFloat(ret).toFixed(2);
            ret -= val;
            tCash -= val;
            x += val;
        }
    }
    return x;
}


console.log("EXPECTED", "======================================", "ACTUAL")
let x = checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
console.log(JSON.stringify(x), "===", {status: "OPEN", change: [["QUARTER", 0.5]]})
x =  checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
console.log(JSON.stringify(x), "===", {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]})
x = checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
console.log(JSON.stringify(x), "===", {status: "INSUFFICIENT_FUNDS", change: []});
x = checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
console.log(JSON.stringify(x), "===", {status: "INSUFFICIENT_FUNDS", change: []});
x = checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
console.log(JSON.stringify(x), "===", {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]});