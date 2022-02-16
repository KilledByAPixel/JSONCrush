# JSONCrush - Compress JSON into URL friendly strings

This simple system allows for excellent compression of uri encoded JSON strings using the JSCrush algorithm.

* The JSCrush algorithm eliminates repeated substrings similar to the zip algorithm.
* Strings are processed to swap out common json characters with ones that won't be escaped in the URL.
* This can be used to compress any type of string but is optimized for uri encoded JSON.
* The algorithm speed is reasonable for most cases but can be slow for long strings (>10K characters).
* The character \u0001 (start of heading) is used as a delimiter and will be removed if it appears.
* No additional libraries or dependencies are required and minified code is under 2k!

# [TRY THE LIVE DEMO!](https://killedbyapixel.github.io/JSONCrush)

# How to Use

* Download from github or use `npm install jsoncrush`
* Import JSONCrush as a module with something like `import JSONCrush from './JSONCrush.js'`
* Just pass a JSON string to `JSONCrush.crush()` to compress it!
* If used in a url you must call `encodeURIComponent()` to escape any special characters.
* To decode just pass the crushed string to `JSONCrush.uncrush()`
* See [index.html](https://github.com/KilledByAPixel/JSONCrush/blob/master/index.html) for a demonstration.

# Why?

* To compress longish urls with JSON data (<10K characters) so they can be shared and bookmarked easily.

# Example #1 (short string)

### JSON - 103 bytes

* `{"students":[{"name":"Jack","age":17},{"name":"Jill","age":16},{"name":"Sue","age":16}],"class":"math"}`

### URI Encoded - 199 bytes

* `%7B%22students%22%3A%5B%7B%22name%22%3A%22Jack%22%2C%22age%22%3A17%7D%2C%7B%22name%22%3A%22Jill%22%2C%22age%22%3A16%7D%2C%7B%22name%22%3A%22Sue%22%2C%22age%22%3A16%7D%5D%2C%22class%22%3A%22math%22%7D`

### JSONCrushed and URI Encoded - 82 bytes! 59% smaller

* `('students!%5B*Jack-7.Jill-6.Sue-6)%5D~class!'math')*('name!'-'~age!1.)%2C*%01.-*_`

### Compare with base64 encoded - 138 bytes

* `eyJzdHVkZW50cyI6W3sibmFtZSI6IkphY2siLCJhZ2UiOjE3fSx7Im5hbWUiOiJKaWxsIiwiYWdlIjoxNn0seyJuYW1lIjoiU3VlIiwiYWdlIjoxNn1dLCJjbGFzcyI6Im1hdGgifQ`

### Compare with [lz-string](https://github.com/pieroxy/lz-string) compressToEncodedURIComponent - 112 bytes

* `N4IgzgLgrgJgpgOwmEAuA2qBBDAtnNEAKWwGMBrEAGhGwHMDUBGAdgF8qs9HiBLAG37VaDNEwBsHLvkIBlKARr1GEtgF0apftjApUIXNggALEGyA`

### Compare with [rison](https://github.com/Nanonid/rison) encodeURIComponent - 108 bytes

* `(class%3Amath%2Cstudents%3A!((age%3A17%2Cname%3AJack)%2C(age%3A16%2Cname%3AJill)%2C(age%3A16%2Cname%3ASue)))`

### Compare with [json-url](https://github.com/masotime/json-url) lzma compression - 102 bytes

* `XQAAAAJFAAAAAAAAAABBKgpnQ92WP4KxyTTsJxd-yINVbdp6KNXjexeyXFUtdZzJEFmXfd4HbreByHRJ7Nv-aehaORBt6sv_9IjAAA`

# Example #2 (long string used by [ZzArt](https://github.com/KilledByAPixel/ZzArt))

### JSON - 3122 bytes

* `{"shaderStatements":[{"output":"b","outputSwizzle":"zxyw","assignmentOperator":"-=","functionName":"","parameter":"a","valueX":6.62,"valueY":6.165,"valueZ":-0.974,"valueW":-4.233,"parameterSwizzle":"xzyy"},{"output":"b","outputSwizzle":"ywxz","assignmentOperator":"-=","functionName":"","parameter":"a","valueX":-4.88,"valueY":0.649,"valueZ":0.171,"valueW":-0.084,"parameterSwizzle":"yzwx"},{"output":"a","outputSwizzle":"xzwy","assignmentOperator":"*=","functionName":"logA","parameter":"b","valueX":-2.368,"valueY":-7.284,"valueZ":-5.01,"valueW":-0.005,"parameterSwizzle":"zzwz"},{"output":"b","outputSwizzle":"xwzy","assignmentOperator":"-=","functionName":"sin","parameter":"b","valueX":-3.686,"valueY":-3.258,"valueZ":-4.059,"valueW":-8.506,"parameterSwizzle":"wwzz"},{"output":"b","outputSwizzle":"zxyw","assignmentOperator":"=","functionName":"ceil","parameter":"b","valueX":5.36,"valueY":-8.274,"valueZ":0.002,"valueW":5.429,"parameterSwizzle":"xxwy"},{"output":"a","outputSwizzle":"xzwy","assignmentOperator":"=","functionName":"","parameter":"b","valueX":-3.353,"valueY":-5.681,"valueZ":-7.792,"valueW":1.254,"parameterSwizzle":"zyxw"},{"output":"b","outputSwizzle":"ywxz","assignmentOperator":"+=","functionName":"floor","parameter":"a","valueX":6.669,"valueY":-0.05,"valueZ":-8.629,"valueW":-2.802,"parameterSwizzle":"xyyw"},{"output":"b","outputSwizzle":"xywz","assignmentOperator":"+=","functionName":"fract","parameter":"a","valueX":0.103,"valueY":-3.118,"valueZ":0.255,"valueW":6.287,"parameterSwizzle":"xyyw"},{"output":"a","outputSwizzle":"zxyw","assignmentOperator":"/=","functionName":"ceil","parameter":"","valueX":5.484,"valueY":-1.26,"valueZ":8.705,"valueW":-1.59,"parameterSwizzle":"zyyw"},{"output":"a","outputSwizzle":"wyzx","assignmentOperator":"=","functionName":"sqrtA","parameter":"b","valueX":-0.366,"valueY":-0.117,"valueZ":0.162,"valueW":1.761,"parameterSwizzle":"yywy"},{"output":"a","outputSwizzle":"yxzw","assignmentOperator":"*=","functionName":"atan","parameter":"b","valueX":3.743,"valueY":-0.003,"valueZ":4.636,"valueW":0.056,"parameterSwizzle":"wxxw"},{"output":"b","outputSwizzle":"zwxy","assignmentOperator":"=","functionName":"","parameter":"","valueX":6.083,"valueY":-6.322,"valueZ":0.032,"valueW":0.428,"parameterSwizzle":"yzyy"},{"output":"a","outputSwizzle":"zxyw","assignmentOperator":"/=","functionName":"","parameter":"a","valueX":0.151,"valueY":1.024,"valueZ":-2.862,"valueW":3.193,"parameterSwizzle":"xzyx"},{"output":"a","outputSwizzle":"zwxy","assignmentOperator":"*=","functionName":"","parameter":"a","valueX":-1.637,"valueY":1.828,"valueZ":1.924,"valueW":-0.006,"parameterSwizzle":"yxyy"}],"randSeed":-1810015485,"randSeedString":"1574121532870","iterationCount":1,"gridPosX":4,"gridPosY":0,"generation":17,"subGeneration":1,"hueOffset":0.218,"hueScale":-0.789,"saturationScale":0.493,"uvOffsetX":-0.36,"uvOffsetY":0.559,"uvScaleX":1.02,"uvScaleY":-1.143,"rotate":0,"usePalette":0,"paletteColors":[{"x":0.041,"y":0.01,"z":0.584},{"x":0.131,"y":0.102,"z":0.658},{"x":0.9,"y":0.855,"z":0.917},{"x":0.797,"y":0.882,"z":0.478}],"saveListIndex":-1,"uniqueID":361315861}`

### JSONCrushed - 1194 bytes! 76% smaller then URI encoded JSON

* `('shaderStatements!%5B('output!'bk-HT!6.62BY!6.165BZU0.974BWU4.233FJxzyyKbMywxzE-HTU4.88BYQ649BZQ171BWU0.084FJyzwxKaMxzwyE*HlogAR-2.368V7.284BZU5.01BWU0.005FJzzwzKbMxwzyE-HsinR-3.686V3.258BZU4.059BWU8.506FJwwzzKbkHceilR5.36V8.274BZQ002BW!5.429FJxxwyKaMxzwyEHR-3.353V5.681BZU7.792BW!1.254FJzyxwKbMywxzE%2BHfloorT!6.669V0.05BZU8.629BWU2.802FJxyywKbMxywzE%2BHfractTQ103V3.118BZQ255BW!6.287FJxyywKak%2FHceil'F!''BX!5.484V1.26BZ!8.705BWU1.59FJzyywKaMwyzxEHsqrtAR-0.366V0.117BZQ162BW!1.761FJyywyKaMyxzwE*HatanR3.743V0.003BZ!4.636BWQ056FJwxxwKbMzwxyEH'F!''BX!6.083V6.322BZQ032BWQ428FJyzyyKak%2FHTQ151BY!1.024BZU2.862BW!3.193FJxzyxKaMzwxyE*HTU1.637BY!1.828BZ!1.924BWU0.006FJyxyy')%5D~randSeedU1810015485~randSeedString!'1574121532870'~itejCount!1~gridPosX!4~gridPosY!0~genej!17~subGenej!1~hueOffsetQ218~hueScaleU0.789~satujScaleQ493~uvOffsetXU0.36~uvOffsetYQ559~uvScaleX!1.02~uvScaleYU1.143~rotate!0~usePalette!0~paletteColors!%5B('xQ041~yQ01~zQ584_xQ131~yQ102~zQ658_xQ9~yQ855~zQ917_xQ797~yQ882~zQ478)%5D~saveListIndexU1~uniqueID!361315861)B~valueE'~assignmentOperator!'F~parameterH%3D'~functionName!'JSwizzle!'K'_output!'M'~outputJQ!0.R'F!'b'BX!T'F!'a'BXU!-VBYU_)%2C('jrationkMzxywE%01kj_VUTRQMKJHFEB_`

# License

JSONCrush by Frank Force [MIT] https://github.com/KilledByAPixel/JSONCrush

Using Javascript crusher by @aivopaas [MIT] http://www.iteral.com/jscrush
