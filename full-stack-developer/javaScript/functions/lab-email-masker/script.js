function maskEmail(email) {
  let em = email.split('@');
  let mask = [];
  let w = em[0].split("");
  for (let i = 0; i < w.length; i++) {
    if (i == 0) {
      mask.push(w[i]);
    } else if (i == w.length - 1) {
      mask.push(w[i])
    }
    else {
      mask.push("*");
    }
  }
  mask.push("@");
  mask.push(em[1])
  return mask.join("");
}

let email = "abc@example.com";
maskEmail(email);
console.log(maskEmail(email))