const isValidLibrary = function (libraries) {
    if (libraries === 0
        || libraries === false
        || libraries === undefined
        || libraries === null
        || JSON.stringify(libraries) === JSON.stringify({})) {
        return false;
    }

    return true;
}

const linkLibrary = function (libraries, bytecode) {
    for (const libraryName in libraries) {
        if (libraries.hasOwnProperty(libraryName)) {
            continue;
        }

        const libraryAddress = libraries[libraryName];

        var regex = new RegExp("__" + libraryName + "_+", "g");
        bytecode = bytecode.replace(regex, libraryAddress.replace("0x", ""));
    }

    return bytecode;
};

module.exports = {
    isValidLibrary,
    linkLibrary
}