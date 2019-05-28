const OS = require("os");
const path = require("path");
const debug = require("debug")("lib:debug");
const colors = require('etherlime-utils').colors;

const commandReference = {
  "o": "step over",
  "i": "step into",
  "u": "step out",
  "n": "step next",
  ";": "step instruction",
  "p": "print instruction",
  "h": "print this help",
  "v": "print variables and values",
  ":": `evaluate expression - see ${colors.colorCommand('`v`')}`,
  "+": `add watch expression (${colors.colorCommand('`+:<expr>`')})`,
  "-": `remove watch expression (${colors.colorCommand('`-:<expr>`')})`,
  "?": "list existing watch expressions",
  "b": "add breakpoint",
  "B": "remove breakpoint",
  "c": "continue until breakpoint",
  "q": "quit",
  "r": "reset"
};


let formatStartMessage = () => {
  const lines = ["", "Loading transaction data...", ""];

  return lines.join(OS.EOL);
}

let formatCommandDescription = (commandId) => {
  return "(" + `${colors.colorCommand(commandId)}` + ") " + commandReference[commandId];
}

let formatAffectedInstances = (instances) => {
  let hasAllSource = true;

  let lines = Object.keys(instances).map(function (address) {
    let instance = instances[address];

    if (instance.contractName) {
      return " " + `${colors.colorAddress(address)}` + " - " + `${colors.colorName(instance.contractName)}`;
    }

    if (!instance.source) {
      hasAllSource = false;
    }

    return " " + address + "(UNKNOWN)";
  });

  if (!hasAllSource) {
    lines.push("");
    lines.push(
      "Warning: The source code for one or more contracts could not be found."
    );
  }

  return lines.join(OS.EOL);
}

let formatHelp = (lastCommand) => {
  if (!lastCommand) {
    lastCommand = "n";
  }

  let prefix = [
    `${colors.colorName("Commands:")}`,
    `(${colors.colorCommand('enter')}) last command entered (${colors.colorCommand(commandReference[lastCommand])})`
  ];

  let commandSections = [
    ["o", "i", "u", "n", ";"],
    ["p", "h", "q", "r"],
    ["b", "B", "c"],
    ["+", "-"],
    ["?"],
    ["v", ":"]
  ].map(function (shortcuts) {
    return shortcuts.map(formatCommandDescription).join(", ");
  });

  let suffix = [""];

  let lines = prefix.concat(commandSections).concat(suffix);

  return lines.join(OS.EOL);
}

let formatLineNumberPrefix = (line, number, cols, tab) => {
  if (!tab) {
    tab = "  ";
  }

  let prefix = number + "";
  while (prefix.length < cols) {
    prefix = " " + prefix;
  }

  prefix += ": ";
  return prefix + line.replace(/\t/g, tab);
}

let formatLinePointer = (line, startCol, endCol, padding, tab) => {
  if (!tab) {
    tab = "  ";
  }

  padding += 2; // account for ": "
  let prefix = "";
  while (prefix.length < padding) {
    prefix += " ";
  }

  let output = "";
  for (let i = 0; i < line.length; i++) {
    let pointedAt = i >= startCol && i < endCol;
    let isTab = line[i] === "\t";

    let additional;
    if (isTab) {
      additional = tab;
    } else {
      additional = " "; // just a space
    }

    if (pointedAt) {
      additional = additional.replace(/./g, `${colors.colorName('^')}`);
    }

    output += additional;
  }

  return prefix + output;
}

let formatRangeLines = (source, range, contextBefore) => {
  // range is {
  //   start: { line, column },
  //   end: { line, column}
  // }
  //

  if (contextBefore == undefined) {
    contextBefore = 2;
  }

  let startBeforeIndex = Math.max(range.start.line - contextBefore, 0);

  let prefixLength = (range.start.line + 1 + "").length;

  let beforeLines = source
    .filter(function (line, index) {
      return index >= startBeforeIndex && index < range.start.line;
    })
    .map(function (line, index) {
      let number = startBeforeIndex + index + 1; // 1 to account for 0-index
      return formatLineNumberPrefix(line, number, prefixLength);
    });

  let line = source[range.start.line];
  let number = range.start.line + 1; // zero-index

  let pointerStart = range.start.column;
  let pointerEnd;

  // range.end is undefined in some cases
  // null/undefined check to avoid exceptions
  if (range.end && range.start.line === range.end.line) {
    // start and end are same line: pointer ends at column
    pointerEnd = range.end.column;
  } else {
    pointerEnd = line.length;
  }

  let allLines = beforeLines.concat([
    formatLineNumberPrefix(line, number, prefixLength),
    formatLinePointer(line, pointerStart, pointerEnd, prefixLength)
  ]);

  return allLines.join(OS.EOL);
}

let formatInstruction = (traceIndex, instruction) => {
  return (`(${traceIndex}) ${instruction.name} ${instruction.pushData ? instruction.pushData : ''}`);
}

let formatStack = (stack) => {
  let formatted = stack.map(function (item, index) {
    item = "  " + item;
    if (index === stack.length - 1) {
      item += " (top)";
    }

    return item;
  });

  if (stack.length === 0) {
    formatted.push("  No data on stack.");
  }

  return formatted.join(OS.EOL);
}

module.exports = {
  formatStartMessage,
  formatCommandDescription,
  formatAffectedInstances,
  formatHelp,
  formatLineNumberPrefix,
  formatLinePointer,
  formatRangeLines,
  formatInstruction,
  formatStack
}
