/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isAlphaNumeric(char) {
  return /[a-zA-Z0-9]/.test(char);
}

function isPalindrome(str) {
  let start = 0,
    end = str.length - 1;
  while (start < end) {
    if (str[start] === ' ' || !isAlphaNumeric(str[start])) {
      start++;
      continue;
    }
    if (str[end] === ' ' || !isAlphaNumeric(str[end])) {
      end--;
      continue;
    }
    if (str[start].toLowerCase() !== str[end].toLowerCase()) {
      return false;
    }
    start++;
    end--;
  }
  return true;
}

module.exports = isPalindrome;
