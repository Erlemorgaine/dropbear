const { environment } = require('./standard-library');
const last = collection => collection[collection.length - 1];

const apply = node => {
    // Environment is an object with keys. E.g. the name is add, so we look for the value of add (which is a function in our standard library)
    const func = environment[node.name];

    // Since the arguments can also be functions, we need to recursively evaluate
    const args = node.arguments.map(evaluate);

    // We also need to handle errors
    if (typeof func !== 'function') {
        throw new Error(`${node.name} is not a function`);
    }

    // E.g. this equivalents add(1, 2)
    return func(...args);
};

const evaluate = (node) => {  
    if (node.type === 'CallExpression') {
        // Here we use a function that uses the standard library
        return apply(node);
    }

    // Our strings and numbers don't have a value, only a name
    if (node.value) {
        return node.value;
    }
};

module.exports = { evaluate };
