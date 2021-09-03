function ToHex(c: number): string {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}


/**
 * A tiny library which generates fairly different colors from consecutive numbers,
 * such as indices.
 */
class ColorGen {
  static rgbOffsets = [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
  ];
  static rgbSteps = [
    Math.floor(Math.random() * 700),
    Math.floor(Math.random() * 700),
    Math.floor(Math.random() * 700),
  ];

  /**
   * Generate a color from a number "seed". As long as the seedReset() method isn't called, the results will
   * remain always the same for each number, regardless of how many times you call it.
   * @param value seed
   * @returns rgb color string
   */
  static generate(value: number): string {
    let rgb = new Array<number>(3);

    for (let i = 0; i < 3; i++) {
      rgb[i] = (ColorGen.rgbOffsets[i] + ColorGen.rgbSteps[i] * value) % 255;
    }

    return `#${ToHex(rgb[0])}${ToHex(rgb[1])}${ToHex(rgb[1])}`;
  }

  /**
   * Regenerate the library's seeds. The colors associated with each number when calling generate()
   * will be changed.
   */
  static seedReset() {
    ColorGen.rgbOffsets = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
    ];
    ColorGen.rgbSteps = [
      Math.floor(Math.random() * 700),
      Math.floor(Math.random() * 700),
      Math.floor(Math.random() * 700),
    ];
  }

  /**
   * Generate a color corresponding to a number between 0 and 1.
   * The closer to one the value, the hotter the color.
   * @param value 
   */
  static heatmap(value: number): string {
    const valueClamped = Math.max(0, Math.min(1, value));
    const valueScaled = valueClamped * 255;
    const red = Math.floor(valueScaled);
    const green = Math.floor(255 - valueScaled);
    return `rgb(${red}, ${green}, 0)`;
  }
}

export default ColorGen;
