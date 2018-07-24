const isValidLibrary = function (libraries) {
    return (!libraries || typeof libraries === 'object')
}

const linkLibrary = function (libraries, bytecode) {
    if (!bytecode.includes('__')) {
        return bytecode;
    }

    for (const libraryName in libraries) {
        if (!libraries.hasOwnProperty(libraryName)) {
            continue;
        }

        const libraryAddress = libraries[libraryName];

        var regex = new RegExp("__" + libraryName + "_+", "g");
        bytecode = bytecode.replace(regex, libraryAddress.replace("0x", ""));
    }

    if (bytecode.includes('__')) {
        throw new Error('Not all libraries were linked.');
    }

    return bytecode;
};

module.exports = {
    isValidLibrary,
    linkLibrary
}