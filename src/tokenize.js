const {
  isLetter,
  isWhitespace,
  isNumber,
  isParenthesis,
  isQuote,
} = require('./identify');

const tokenize = (inputString) => {
  const tokens = [];

  // This is to keep track of where I am
  let cursor = 0;

  while (cursor < inputString.length) {
    const char = inputString[cursor];

    if (isParenthesis(char)) {
      tokens.push({type: 'Parenthesis', value: char});
      cursor++;
      continue;
    } 
    
    if (isWhitespace(char)) {
      cursor++;
      continue;
    } 
    
    if (isNumber(char)) {
      let num = char;

      // Note ++cursor: this means: first bump number, then use it
      while (isNumber(inputString[++cursor])) {
        num += inputString[cursor];
      }

      tokens.push({type: 'Number', value: +num});
      continue;
    } 
    
    if (isLetter(char)) {
      let symbol = char;

       // Note ++cursor: this means: first bump number, then use it
       while (isLetter(inputString[++cursor])) {
        symbol += inputString[cursor];
      }

      tokens.push({type: 'Name', value: symbol});
      continue;
    }

    // Our language only supports double quotes
    if (isQuote(char)) {
      let quote = '';

      // Note ++cursor: this means: first bump number, then use it
      // Also: !isQuote since we want to have everything in between quotes
      while (!isQuote(inputString[++cursor])) {
        quote += inputString[cursor];
      }

      tokens.push({type: 'String', value: quote});

      // Move one more character since we want to disregard the last quote
      cursor++;
      continue;
    }

    throw new Error(char + ' is not a valid character');
  }

  return tokens;
};

module.exports = { tokenize };
