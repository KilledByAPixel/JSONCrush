///////////////////////////////////////////////////////////////////////
// JSONCrush by Frank Force [MIT] https://github.com/KilledByAPixel/JSONCrush
// Based on JSCrush - Javascript crusher by @aivopaas. [MIT] http://www.iteral.com/jscrush
///////////////////////////////////////////////////////////////////////
import { JSONCrushSwap } from "./JSONCrushSwap";

interface Carry {
  [key: string]: number;
  [key: number]: number;
}

export function JSONCrush(string: string) {
  const JSCrush = (string: string, characters: string[]) => {
    // JSCrush Algorithm (remove repeated substrings)
    const ByteLength = (string: string) =>
      encodeURI(string).replace(/%../g, "i").length;
    let maxSubstringLength = 50; // speed it up by limiting max length
    let o: Carry = {};
    let X, O, m, i, N, M, t, j, R;
    let c: string | number;
    let e: string | number;
    let Q: string[] = characters;
    let x: string;
    let s: string = string;
    X = 1;
    m = "";
    while (true) {
      for (M = N = e = c = 0, i = Q.length; !c && i--; )
        !~s.indexOf(Q[i]) && (c = Q[i]);
      if (!c) break;
      if (O) {
        o = {};
        for (x in O)
          for (j = s.indexOf(x), o[x] = 0; ~j; o[x]++)
            j = s.indexOf(x, j + x.length);
        O = o;
      } else
        for (O = o = {}, t = 1; X && t < maxSubstringLength; t++)
          for (X = i = 0; ++i < s.length - t; )
            if (!o[(x = s.substr((j = i), t))])
              if (~(j = s.indexOf(x, j + t)))
                for (X = t, o[x] = 1; ~j; o[x]++) j = s.indexOf(x, j + t);
      for (let x in O) {
        j = ByteLength(x);
        if ((j = (R = O[x]) * j - j - (R + 1) * ByteLength(c as string)))
          (j > M || (j == M && R > N)) && ((M = j), (N = R), (e = x));
        if (j < 1) delete O[x];
      }
      o = {};
      for (let x in O) o[x.split(e as string).join(c as string)] = 1;
      O = o;
      if (!e) break;
      s = s.split(e as string).join(c as string) + c + e;
      m = c + m;
    }

    return { a: s, b: m };
  };

  // remove \u0001 if it is found in the string so it can be used as a delimiter
  string = string.replace(/\u0001/g, "");

  // swap out common json characters
  string = JSONCrushSwap(string);

  // create a string of characters that will not be escaped by encodeURIComponent
  let characters = [];
  const unescapedCharacters = `-_.!~*'()`;
  for (let i = 127; --i; ) {
    if (
      (i >= 48 && i <= 57) || // 0-9
      (i >= 65 && i <= 90) || // A-Z
      (i >= 97 && i <= 122) || // a-z
      unescapedCharacters.includes(String.fromCharCode(i))
    )
      characters.push(String.fromCharCode(i));
  }

  // check if every character is used
  let allUsed = true;
  for (let i in characters) {
    let c = characters[i];
    if (!string.includes(c)) {
      allUsed = false;
      break;
    }
  }

  if (allUsed) {
    // use extended set if all the unescaped ones are used
    for (let i = 2; i < 255; ++i) {
      let c = String.fromCharCode(i);
      if (c != "\\" && !characters.includes(c)) characters.unshift(c);
    }
  }

  // crush with JS crush
  let crushed = JSCrush(string, characters);

  // use \u0001 as a delimiter between JSCrush parts
  let crushedString = crushed.a + "\u0001" + crushed.b;

  // encode URI
  return encodeURIComponent(crushedString);
}
