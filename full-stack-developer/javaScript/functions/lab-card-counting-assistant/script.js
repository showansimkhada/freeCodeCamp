let count = 0;
function cc(card) {
  if ( card > 1 && card < 7) {
    count++;
  } else if (card === 10 || card === "A" || card == "J" || card === "Q" || card === "K") {
    count--;
  }
  if (count <= 0) {
    return count + " Hold";
  } else {
    return count + " Bet";
  }
}