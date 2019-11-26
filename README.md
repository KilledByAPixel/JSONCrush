# JSONCrush

This simple system allows good compression of uri encoded JSON strings using the JSCrush algorithm.

Strings are processed to swap out common json characters with ones that won't be escaped by encodeURIComponent.

The JSCrush algorithm helps to eliminate repeated substrings.

This can be used to compress any type of string but is optimized for uri encoded JSON.

No additional libraries are needed and minified code is under 2k!

# [TRY THE LIVE DEMO!](https://killedbyapixel.github.io/JSONCrush)

# Example

### JSON - 103 bytes

* {"students":[{"name":"Jack","age":17},{"name":"Jill","age":16},{"name":"Sue","age":16}],"class":"math"}

### URI Encoded Component - 199 bytes

* %7B%22students%22%3A%5B%7B%22name%22%3A%22Jack%22%2C%22age%22%3A17%7D%2C%7B%22name%22%3A%22Jill%22%2C%22age%22%3A16%7D%2C%7B%22name%22%3A%22Sue%22%2C%22age%22%3A16%7D%5D%2C%22class%22%3A%22math%22%7D

### JSONCrushed URI Encoded Component - 82 bytes!

* ('students!%5B*Jack-7)%2C*Jill-6)%2C*Sue-6)%5D~class!'math')*('name!'-'~age!1%01-*

### Compare with [lz-string](https://github.com/pieroxy/lz-string) compressToEncodedURIComponent - 112 bytes

* N4IgzgLgrgJgpgOwmEAuA2qBBDAtnNEAKWwGMBrEAGhGwHMDUBGAdgF8qs9HiBLAG37VaDNEwBsHLvkIBlKARr1GEtgF0apftjApUIXNggALEGyA

### Compare with [json-url](https://github.com/masotime/json-url) lzma compression - 102 bytes

* XQAAAAJFAAAAAAAAAABBKgpnQ92WP4KxyTTsJxd-yINVbdp6KNXjexeyXFUtdZzJEFmXfd4HbreByHRJ7Nv-aehaORBt6sv_9IjAAA

# License

JSONCrush by Frank Force [MIT] https://github.com/KilledByAPixel/JSONCrush

Based on Javascript crusher by @aivopaas [MIT] http://www.iteral.com/jscrush

GitHub Corner is Copyright (c) 2016 Tim Holman - http://tholman.com
