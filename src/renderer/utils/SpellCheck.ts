export default class SpellCheck {
  static regexDict: { [key: string]: string } = {
    ip: '[0-9]+.[0-9]+.[0-9]+.[0-9]+',
  };
  static check(key: string, input: string) {
    return input.match(this.regexDict[key]) != null;
  }
}
