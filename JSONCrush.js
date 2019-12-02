/////////////////////////////////////////////////////////////////////// 
// JSONCrush by Frank Force [MIT] https://github.com/KilledByAPixel/JSONCrush
// Based on JSCrush - Javascript crusher by @aivopaas. [MIT] http://www.iteral.com/jscrush
/////////////////////////////////////////////////////////////////////// 

"use strict"; // strict mode

function JSONCrush(string)
{
    const JSCrush=(string, characters)=>
    {
        // JSCrush Algorithm (remove repeated substrings)
        const ByteLength = string=>encodeURI(string).replace(/%../g,'i').length;
        const HasUnmatchedSurrogate = string=>
        {
            let w1 = 0;
            for(let i = 0; i < string.length; ++i)
            {
                let code = string.charCodeAt(i);
                let w2 = code >= 0xDC00 && code <= 0xDFFF;
                if (w1 && !w2 || !w1 && w2)
                    return true;
                w1 = code >= 0xD800 && code <= 0xDBFF;
            }
            
            return w1;
        }
        
        const maxSubstringLength = 50; // speed it up by limiting max length
        let X, B, O, m, i, c, e, N, M, o, t, j, x, R;
        let Q = characters;
        let s = string;
        X = 1;
        m = '';
        while(true)
        {
            for (M=N=e=c=0,i=Q.length;!c&&i--;)
                !~s.indexOf(Q[i])&&(c=Q[i]);
            if (!c) break;
            if (O)
            {
                o={};
                for (x in O)
                    for (j=s.indexOf(x),o[x]=0;~j;o[x]++)
                        j=s.indexOf(x,j+x.length);
                O=o;
            }
            else for (O=o={},t=1;X&&t<maxSubstringLength;t++)
                    for (X=i=0;++i<s.length-t;)
                        if (!HasUnmatchedSurrogate(x=s.substr(j=i,t)))
                        if (!HasUnmatchedSurrogate(x=s.substr(j=i,t)))
                            if (!o[x])
                                if (~(j=s.indexOf(x,j+t)))
                                        for (X=t,o[x]=1;~j;o[x]++)
                                            j=s.indexOf(x,j+t);
            for (let x in O) 
            {
                j=ByteLength(x);
                if (j=(R=O[x])*j-j-(R+1)*ByteLength(c))
                    (j>M||j==M&&R>N)&&(M=j,N=R,e=x);
                if (j<1)
                    delete O[x]
            }
            o={};
            for(let x in O)
                o[x.split(e).join(c)]=1;
            O=o;
            if(!e) break;
            s=s.split(e).join(c)+c+e
            m=c+m;
        }

        return {a:s, b:m};
    }

    // remove \u0001 if it is found in the string so it can be used as a delimiter
    string = string.replace(/\u0001/g,'');
    
    // swap out common json characters
    string = JSONCrushSwap(string);
    
    // create a string of characters that will not be escaped by encodeURIComponent
    let characters = [];
    const unescapedCharacters = `-_.!~*'()`;
    for (let i=127; --i;)
    {
        if 
        (
            (i>=48&&i<=57) || // 0-9
            (i>=65&&i<=90) || // A-Z
            (i>=97&&i<=122)|| // a-z
            unescapedCharacters.includes(String.fromCharCode(i))
        )
            characters.push(String.fromCharCode(i));
    }
    
    // check if every character is used
    let allUsed = true;
    for(let i in characters)
    {
        let c = characters[i];
        if (!string.includes(c))
        {
            allUsed = false;
            break;
        }
    }
    
    if (allUsed)
    {
        // use extended set if all the unescaped ones are used
        for (let i=2; i<255; ++i)
        {
            let c = String.fromCharCode(i);
            if (c!='\\' && !characters.includes(c))
                characters.unshift(c);
        }
    }
    
    // crush with JS crush
    const crushed = JSCrush(string, characters);
    
    // use \u0001 as a delimiter between JSCrush parts 
    const crushedString = crushed.a + '\u0001' + crushed.b;
    
    // encode URI
    return encodeURIComponent(crushedString);
}

function JSONUncrush(string)
{
    // string must be a decoded URI component, searchParams.get() does this automatically

    // unsplit the string
    const splitString = string.split('\u0001');
    
    // JSUncrush algorithm
    let a = splitString[0];
    let b = splitString[1];
    for(let c in b)
    {
        let d = a.split(b[c]);
        a = d.join(d.pop());
    }
    
    // unswap the json characters in reverse direction
    return JSONCrushSwap(a, 0);
}

function JSONCrushSwap(string, forward=true)
{
    // swap out characters for lesser used ones that wont get escaped
    const swapGroups = 
    [
        ['"', "'"],
        ["':", "!"],
        [",'", "~"],
        ['}', ")", '\\', '\\'],
        ['{', "(", '\\', '\\'],
    ];
    
    const Swap=(string, g)=>
    {
        let regex = new RegExp(`${(g[2]?g[2]:'')+g[0]}|${(g[3]?g[3]:'')+g[1]}`,'g');
        return string.replace(regex, $1 => ($1 === g[0] ? g[1] : g[0]));
    }

    // need to be able to swap characters in reverse direction for uncrush
    if (forward)
        for (let i=0; i<swapGroups.length; ++i)
            string = Swap(string, swapGroups[i]);
    else
        for (let i=swapGroups.length; i--;)
            string = Swap(string, swapGroups[i]);

    return string;
}