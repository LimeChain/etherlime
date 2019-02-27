
let options = (options, expected_keys) => {
    expected_keys.forEach((key) => {
        if (options[key] == null) {
            throw new Error(`Expected parameter "${key}" not passed to function.`);
        }
    });
}

let one = (options, expected_keys) => {
    let found = [];

    expected_keys.forEach((key) => {
        if (options[key] != null) {
            found.push(1);
        } else {
            found.push(0);
        }
    });

    let total = found.reduce((t, value) => {
        return t + value;
    });

    if (total >= 1) return;

    throw new Error(`Expected one of the following parameters, but found none: ${expected_keys.join(", ")}`);
}

module.exports = {
    options,
    one
};
