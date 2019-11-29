///////////////////////////////////////////////////////////////////////
// JSONCrush by Frank Force [MIT] https://github.com/KilledByAPixel/JSONCrush
// Based on JSCrush - Javascript crusher by @aivopaas. [MIT] http://www.iteral.com/jscrush
///////////////////////////////////////////////////////////////////////
import { JSONCrushSwap } from "./JSONCrushSwap";

export function JSONUncrush(string: string) {
  // string must be a decoded URI component, searchParams.get() does this automatically

  // unsplit the string
  let splitString: string[] = string.split("\u0001");

  // JSUncrush algorithm
  let a: string = splitString[0];
  let b: string = splitString[1];
  for (let c in b.split("")) {
    let d = a.split(b[c]);
    a = d.join(d.pop());
  }

  // unswap the json characters in reverse direction
  return JSONCrushSwap(a, !!0);
}
