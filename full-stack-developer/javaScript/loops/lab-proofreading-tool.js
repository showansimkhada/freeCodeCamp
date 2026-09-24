const isPalindrome = (word) => {
  for (let j = 0; j < word.length; j++) {
    for (let i = word.length-1; i >= 0; i--) {
      if (word[j].toLowerCase() == word[i].toLowerCase()) {
        j++
        continue
      } else {
        return false
      }
    }
  }
  return true
}

const findPalindromeBreaks = (words) => {
  let indices = [];
  for (let i = 0; i < words.length; i++) {
    if(!isPalindrome(words[i])) {
      indices.push(i)
    }
  }
  if (indices) {
    return indices
  }
  return []
}

const findRepeatedPhrases = (words, parseLength) => {
  if (parseLength > words.length || parseLength <= 0) {
    return []
  }
  const indices = []
  for (let i = 0; i <= words.length - parseLength; i++) {
    const a = words.slice(i, i+parseLength)
    for (let j = i+1; j <= words.length-parseLength; j++) {
      const b = words.slice(j, parseLength+j)
      if (JSON.stringify(a) === JSON.stringify(b) && a.length == parseLength && b.length == parseLength) {
        if (indices.indexOf(i) === -1) {
          indices.push(i)
        }
        if (indices.indexOf(j) === -1) {
          indices.push(j)
        }
      }
    }
  }
  return indices
}

const analyzeTexts = (texts, pharseLength) => {
  if (texts.length == 0) {
    return []
  }
  
  return texts.map(x => {
    const repeatedPhrases = findRepeatedPhrases(x, pharseLength)
    const palindromeBreaks = findPalindromeBreaks(x)
    return {repeatedPhrases, palindromeBreaks}
  })
}