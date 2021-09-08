export default class SpellCheck {
  // regex dictionary for each type of input
  static regexDict: { [key: string]: RegExp } = {
    ip: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    port: /^[0-9]+$/,
    auth: /^[a-zA-Z0-9]+$/,
    type: /^[a-zA-Z]+$/,
  };

  static check(key: string, input: string) {
    // return true if the string matches the regex associated to the provided key
    return SpellCheck.regexDict[key].test(input);
    // return key.match(SpellCheck.regexDict[key]) !== null;
  }
}
