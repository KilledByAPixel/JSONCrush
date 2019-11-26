# JSONCrush - Compress JSON into URI friendly strings

This simple system allows for excellent compression of uri encoded JSON strings using the JSCrush algorithm.

* Strings are processed to swap out common json characters with ones that won't be escaped.
* The JSCrush algorithm helps to eliminate repeated substrings.
* This can be used to compress any type of string but is optimized for uri encoded JSON.
* The algorithm speed is reasonable for most cases but can be very slow for long strings (>5000 characters).
* The character \u0001 (start of heading) is used as a delimiter and will be removed if it appears.
* No additional libraries are needed and minified code is under 2k!

# [TRY THE LIVE DEMO!](https://killedbyapixel.github.io/JSONCrush)

# How to Use

* Include JSONCrush.js or JSONCrush.min.js in your script
* Pass a JSON string to JSONCrush to compress it.
* Call encodeURIComponent to make the string safe for urls.
* To decode the string use JSONUncrush.

# Example #1 (short string)

### JSON - 103 bytes

* `{"students":[{"name":"Jack","age":17},{"name":"Jill","age":16},{"name":"Sue","age":16}],"class":"math"}`

### URI Encoded Component - 199 bytes

* `%7B%22students%22%3A%5B%7B%22name%22%3A%22Jack%22%2C%22age%22%3A17%7D%2C%7B%22name%22%3A%22Jill%22%2C%22age%22%3A16%7D%2C%7B%22name%22%3A%22Sue%22%2C%22age%22%3A16%7D%5D%2C%22class%22%3A%22math%22%7D`

### JSONCrush URI Encoded Component - 82 bytes! 60% smaller

* `('students!%5B*Jack-7)%2C*Jill-6)%2C*Sue-6)%5D~class!'math')*('name!'-'~age!1%01-*`

### Compare with [lz-string](https://github.com/pieroxy/lz-string) compressToEncodedURIComponent - 112 bytes

* `N4IgzgLgrgJgpgOwmEAuA2qBBDAtnNEAKWwGMBrEAGhGwHMDUBGAdgF8qs9HiBLAG37VaDNEwBsHLvkIBlKARr1GEtgF0apftjApUIXNggALEGyA`

### Compare with [json-url](https://github.com/masotime/json-url) lzma compression - 102 bytes

* `XQAAAAJFAAAAAAAAAABBKgpnQ92WP4KxyTTsJxd-yINVbdp6KNXjexeyXFUtdZzJEFmXfd4HbreByHRJ7Nv-aehaORBt6sv_9IjAAA`

# Example #2 (long string used by [ZzArt](https://github.com/KilledByAPixel/ZzArt))

### JSON - 3122 bytes

* `{"shaderStatements":[{"output":"b","outputSwizzle":"zxyw","assignmentOperator":"-=","functionName":"","parameter":"a","valueX":6.62,"valueY":6.165,"valueZ":-0.974,"valueW":-4.233,"parameterSwizzle":"xzyy"},{"output":"b","outputSwizzle":"ywxz","assignmentOperator":"-=","functionName":"","parameter":"a","valueX":-4.88,"valueY":0.649,"valueZ":0.171,"valueW":-0.084,"parameterSwizzle":"yzwx"},{"output":"a","outputSwizzle":"xzwy","assignmentOperator":"*=","functionName":"logA","parameter":"b","valueX":-2.368,"valueY":-7.284,"valueZ":-5.01,"valueW":-0.005,"parameterSwizzle":"zzwz"},{"output":"b","outputSwizzle":"xwzy","assignmentOperator":"-=","functionName":"sin","parameter":"b","valueX":-3.686,"valueY":-3.258,"valueZ":-4.059,"valueW":-8.506,"parameterSwizzle":"wwzz"},{"output":"b","outputSwizzle":"zxyw","assignmentOperator":"=","functionName":"ceil","parameter":"b","valueX":5.36,"valueY":-8.274,"valueZ":0.002,"valueW":5.429,"parameterSwizzle":"xxwy"},{"output":"a","outputSwizzle":"xzwy","assignmentOperator":"=","functionName":"","parameter":"b","valueX":-3.353,"valueY":-5.681,"valueZ":-7.792,"valueW":1.254,"parameterSwizzle":"zyxw"},{"output":"b","outputSwizzle":"ywxz","assignmentOperator":"+=","functionName":"floor","parameter":"a","valueX":6.669,"valueY":-0.05,"valueZ":-8.629,"valueW":-2.802,"parameterSwizzle":"xyyw"},{"output":"b","outputSwizzle":"xywz","assignmentOperator":"+=","functionName":"fract","parameter":"a","valueX":0.103,"valueY":-3.118,"valueZ":0.255,"valueW":6.287,"parameterSwizzle":"xyyw"},{"output":"a","outputSwizzle":"zxyw","assignmentOperator":"/=","functionName":"ceil","parameter":"","valueX":5.484,"valueY":-1.26,"valueZ":8.705,"valueW":-1.59,"parameterSwizzle":"zyyw"},{"output":"a","outputSwizzle":"wyzx","assignmentOperator":"=","functionName":"sqrtA","parameter":"b","valueX":-0.366,"valueY":-0.117,"valueZ":0.162,"valueW":1.761,"parameterSwizzle":"yywy"},{"output":"a","outputSwizzle":"yxzw","assignmentOperator":"*=","functionName":"atan","parameter":"b","valueX":3.743,"valueY":-0.003,"valueZ":4.636,"valueW":0.056,"parameterSwizzle":"wxxw"},{"output":"b","outputSwizzle":"zwxy","assignmentOperator":"=","functionName":"","parameter":"","valueX":6.083,"valueY":-6.322,"valueZ":0.032,"valueW":0.428,"parameterSwizzle":"yzyy"},{"output":"a","outputSwizzle":"zxyw","assignmentOperator":"/=","functionName":"","parameter":"a","valueX":0.151,"valueY":1.024,"valueZ":-2.862,"valueW":3.193,"parameterSwizzle":"xzyx"},{"output":"a","outputSwizzle":"zwxy","assignmentOperator":"*=","functionName":"","parameter":"a","valueX":-1.637,"valueY":1.828,"valueZ":1.924,"valueW":-0.006,"parameterSwizzle":"yxyy"}],"randSeed":-1810015485,"randSeedString":"1574121532870","iterationCount":1,"gridPosX":4,"gridPosY":0,"generation":17,"subGeneration":1,"hueOffset":0.218,"hueScale":-0.789,"saturationScale":0.493,"uvOffsetX":-0.36,"uvOffsetY":0.559,"uvScaleX":1.02,"uvScaleY":-1.143,"rotate":0,"usePalette":0,"paletteColors":[{"x":0.041,"y":0.01,"z":0.584},{"x":0.131,"y":0.102,"z":0.658},{"x":0.9,"y":0.855,"z":0.917},{"x":0.797,"y":0.882,"z":0.478}],"saveListIndex":-1,"uniqueID":361315861}`

### JSONCrush URI Encoded Component - 1195 bytes! 75% smaller

* `('shaderStatements!%5B('output!'bj-JT!6.62BY!6.165kU0.974BWU4.233FHxzyyKbMywxzE-JTU4.88BYQ649kQ171BWU0.084FHyzwxKaMxzwyE*JlogAR-2.368V7.284kU5.01BWU0.005FHzzwzKbMxwzyE-JsinR-3.686V3.258kU4.059BWU8.506FHwwzzKbjJceilR5.36V8.274kQ002BW!5.429FHxxwyKaMxzwyEJR-3.353V5.681kU7.792BW!1.254FHzyxwKbMywxzE%2BJfloorT!6.669V0.05kU8.629BWU2.802FHxyywKbMxywzE%2BJfractTQ103V3.118kQ255BW!6.287FHxyywKaj%2FJceil'F!''BX!5.484V1.26k!8.705BWU1.59FHzyywKaMwyzxEJsqrtAR-0.366V0.117kQ162BW!1.761FHyywyKaMyxzwE*JatanR3.743V0.003k!4.636BWQ056FHwxxwKbMzwxyEJ'F!''BX!6.083V6.322kQ032BWQ428FHyzyyKaj%2FJTQ151BY!1.024kU2.862BW!3.193FHxzyxKaMzwxyE*JTU1.637BY!1.828k!1.924BWU0.006FHyxyy')%5D~randSeedU1810015485~randSeedString!'1574121532870'~ite_Count!1~gridPosX!4~gridPosY!0~gene_!17~subGene_!1~hueOffsetQ218~hueScaleU0.789~satu_ScaleQ493~uvOffsetXU0.36~uvOffsetYQ559~uvScaleX!1.02~uvScaleYU1.143~rotate!0~usePalette!0~paletteColors!%5B('xQ041~yQ01~zQ584)%2C('xQ131~yQ102~zQ658)%2C('xQ9~yQ855~zQ917)%2C('xQ797~yQ882~zQ478)%5D~saveListIndexU1~uniqueID!361315861)B~valueE'~assignmentOperator!'F~parameterHSwizzle!'J%3D'~functionName!'K')%2C('output!'M'~outputHQ!0.R'F!'b'BX!T'F!'a'BXU!-VBYU_rationjMzxywEkBZ%01kj_VUTRQMKJHFEB`

# License

JSONCrush by Frank Force [MIT] https://github.com/KilledByAPixel/JSONCrush

Using Javascript crusher by @aivopaas [MIT] http://www.iteral.com/jscrush

GitHub Corner is Copyright (c) 2016 Tim Holman - http://tholman.com
