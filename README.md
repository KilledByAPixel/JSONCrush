# JSONCrush

This simple system allows good compression of uri encoded JSON strings using the JSCrush algorithm.
Strings are processed to swap out json characters with ones that won't be escaped by encodeURIComponent.
Also the JSCrush algorithm works helps reduce repeated substrings.
This can be used to compress any type of string but is optimized for uri encoded JSON.

No additional libraries are needed and minified code is under 2k!

# [TRY THE LIVE DEMO!](https://killedbyapixel.github.io/JSONCrush)

# Example

### JSON - 103 chars

* {"students":[{"name":"Jack","age":17},{"name":"Jill","age":16},{"name":"Sue","age":16}],"class":"math"}

### URI Encoded Component - 199 chars

* %7B%22students%22%3A%5B%7B%22name%22%3A%22Jack%22%2C%22age%22%3A17%7D%2C%7B%22name%22%3A%22Jill%22%2C%22age%22%3A16%7D%2C%7B%22name%22%3A%22Sue%22%2C%22age%22%3A16%7D%5D%2C%22class%22%3A%22math%22%7D

### JSONCrushed URI Encoded Component - 91 chars

* %C2%81('students!%5B*Jack-7)%2C*Jill-6)%2C*Sue-6)%5D~class!'math')*('name!'-'~age!1%C2%81-*

# License

JSONCrush by Frank Force [MIT] https://github.com/KilledByAPixel/JSONCrush

Based on Javascript crusher by @aivopaas [MIT] http://www.iteral.com/jscrush

GitHub Corner is Copyright (c) 2016 Tim Holman - http://tholman.com
