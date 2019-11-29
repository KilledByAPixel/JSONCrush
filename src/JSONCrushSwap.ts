///////////////////////////////////////////////////////////////////////
// JSONCrush by Frank Force [MIT] https://github.com/KilledByAPixel/JSONCrush
// Based on JSCrush - Javascript crusher by @aivopaas. [MIT] http://www.iteral.com/jscrush
///////////////////////////////////////////////////////////////////////
interface Grouping {
  [key: number]: string;
}

export function JSONCrushSwap(string: string, forward: boolean = true) {
  // swap out characters for lesser used ones that wont get escaped
  const swapGroups = [
    ['"', "'"],
    ["':", "!"],
    [",'", "~"],
    ["}", ")", "\\", "\\"],
    ["{", "(", "\\", "\\"]
  ];

  function Swap(string: string, g: Grouping) {
    let regex = new RegExp(
      `${(g[2] ? g[2] : "") + g[0]}|${(g[3] ? g[3] : "") + g[1]}`,
      "g"
    );
    return string.replace(regex, $1 => ($1 === g[0] ? g[1] : g[0]));
  }

  // need to be able to swap characters in reverse direction for uncrush
  if (forward)
    for (let i = 0; i < swapGroups.length; ++i)
      string = Swap(string, swapGroups[i]);
  else
    for (let i = swapGroups.length; i--; ) string = Swap(string, swapGroups[i]);

  return string;
}
