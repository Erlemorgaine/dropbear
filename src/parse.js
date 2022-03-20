const { isOpeningParenthesis, isClosingParenthesis } = require('./identify');
const { specialForms } = require('./special-forms');
const { peek, pop } = require('./utilities');

// Here we find the boundaries of the functions
const parenthesize = (tokens) => { 
    // Take the first off the list
    const token = pop(tokens);

    // Peek is checking the next value
    if (isOpeningParenthesis(token.value)) {
        const expression = [];

        while (!isClosingParenthesis(peek(tokens).value)) {
            expression.push(parenthesize(tokens));
        }

        pop(tokens);
        return expression;

    }

    return token;
};

// Here we turn all tokens inside and outside of the functions into some type (leafnodes)
const parse = (tokens) => {
    // const token = pop(tokens);
    if (Array.isArray(tokens)) {
        const [first, ...rest] = tokens;

        return {
            type: 'CallExpression',
            name: first.value,
            // These are the arguments of the functions
            arguments: rest.map(parse)
        }
    }

    // If it wasn't an array we know its a single token
    const token = tokens;

    if (token.type === 'Number') {
        return {
            type: 'NumericLiteral',
            value: token.value
        }
    }

    if (token.type === 'String') {
        return {
            type: 'StringLiteral',
            value: token.value
        }
    }

    if (token.type === 'Name') {
        return {
            type: 'Identifier',
            name: token.value
        }
    }
}
;

module.exports = { parse: tokens => parse(parenthesize(tokens)) };
