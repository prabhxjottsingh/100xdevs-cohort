/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
    const freqCounter = new Map()
    for (let i = 0; i < str1.length; i++) {
        const ch = str1[i].toLowerCase()
        freqCounter.set(ch, (freqCounter.get(ch) || 0) + 1)
    }
    for (let i = 0; i < str2.length; i++) {
        const ch = str2[i].toLowerCase()
        if (!freqCounter.has(ch)) {
            return false
        }
        freqCounter.set(ch, freqCounter.get(ch) - 1)
    }
    return Array.from(freqCounter.values()).every((count) => count === 0)
}
module.exports = isAnagram
