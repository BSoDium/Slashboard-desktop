function ToHex(c: number): string {
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
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
   * Calculate the "distance" between two rgb colors (which basically are 3D points).
   * @param a first color
   * @param b second color
   * @returns distance
   */
  private static colorDistance(
    a: [number, number, number],
    b: [number, number, number]
  ): number {
    const vector = new Array<number>(3);
    for (let i = 0; i < 3; i += 1) {
      vector[i] = b[i] - a[i];
    }
    return Math.sqrt(vector.map((x) => x * x).reduce((u, v) => u + v, 0));
  }

  private static avgDist(
    a: [number, number, number],
    b: [number, number, number]
  ): number {
    const vector = new Array<number>(3);
    for (let i = 0; i < 3; i += 1) {
      vector[i] = b[i] - a[i];
    }
    return (
      Math.sqrt(vector.reduce((u, v) => u + v, 0)) /
      (vector[0] + vector[1] + vector[2])
    );
  }

  /**
   * Generate a color from a number "seed". As long as the seedReset() method isn't called, the results will
   * remain always the same for each number, regardless of how many times you call it.
   * @param value seed
   * @returns rgb color string
   */
  static generate(value: number, bg?: [number, number, number]): string {
    const rgb: [number, number, number] = [0, 0, 0];
    const reference = bg || [0, 0, 0]; // by default the background is considered to be black

    for (let i = 0; i < 3; i += 1) {
      rgb[i] = (ColorGen.rgbOffsets[i] + ColorGen.rgbSteps[i] * value) % 255;
    }

    // if the color is too close to the reference color, we need to adjust it
    if (ColorGen.avgDist(rgb, reference) < 150) {
      ColorGen.seedReset();
      return ColorGen.generate(value, bg);
    }

    return `#${ToHex(rgb[0])}${ToHex(rgb[1])}${ToHex(rgb[1])}`;
  }

  /**
   * Regenerate the library's seeds. The colors associated with each number when calling generate()
   * will be changed.
   */
  static seedReset() {
    console.debug('Resetting color generator');
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
