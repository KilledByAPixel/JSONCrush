/////////////////////////////////////////////////////////////////////// 
// JSONCrush by Frank Force [MIT] https://github.com/KilledByAPixel/JSONCrush
// Based on JSCrush - Javascript crusher by @aivopaas. [MIT] http://www.iteral.com/jscrush
/////////////////////////////////////////////////////////////////////// 

"use strict"; // strict mode

let JSONCrush = function(object, JSONStringify=true)
{
    let X, B, O, m, i, c, e, N, M, o, t, j, x, R;
    
    let Q=[];
    let safeChars = `-_.!~*'()`; // unescaped by encode uri component
    for (i=127;--i;)((i>=65&&i<=90)||(i>=97&&i<=122)||(i>=48&&i<=57)||safeChars.includes(String.fromCharCode(i)))&&Q.push(String.fromCharCode(i));
    
    let s = object;
    if (JSONStringify)
        s = JSON.stringify(object);
    s = JSONCrushSwap(s);
    
    X=B=s.length/2
    O=m='';
	i = s;
    
    for(let S=encodeURI(i).replace(/%../g,'i').length;;m=c+m)
    {
		for(M=N=e=c=0,i=Q.length;!c&&--i;)!~s.indexOf(Q[i])&&(c=Q[i]);
		if(!c)break;
		if(O)
        {
			o={};
			for(x in O)
				for(j=s.indexOf(x),o[x]=0;~j;o[x]++)j=s.indexOf(x,j+x.length);
			O=o;
		}
        else for(O=o={},t=1;X;t++)
				for(X=i=0;++i<s.length-t;)
					if(!o[x=s.substr(j=i,t)])
						if(~(j=s.indexOf(x,j+t)))
							for(X=t,o[x]=1;~j;o[x]++)j=s.indexOf(x,j+t);
		for(let x in O) 
        {
			j=encodeURI(x).replace(/%../g,'i').length;
			if(j=(R=O[x])*j-j-(R+1)*encodeURI(c).replace(/%../g,'i').length)
				(j>M||j==M&&R>N)&&(M=j,N=R,e=x);
			if(j<1)
				delete O[x]
		}
		o={};
		for(let x in O)
			o[x.split(e).join(c)]=1;
		O=o;
		if(!e)break;
		s=s.split(e).join(c)+c+e
	}
    
    // find unused character
    let highestCharCode = 128;
    for(i = 0; i < s.length; ++i)
    {
        let c = s.charCodeAt(i);
        if (c > highestCharCode)
            highestCharCode = c;
    }
    ++highestCharCode;
    
    c = String.fromCharCode(highestCharCode);
    let crushed = c + s + c + m;
    return crushed;
}

let JSONUncrush = function(string, JSONParse=true)
{
    let c = string.split(string[0]);
    let a = c[1];
    let b = c[2];
    for(let c in b)
    {
        let d = a.split(b[c]);
        a=d.join(d.pop());
    }
    
    let uncrushed = JSONCrushSwap(a, 0);
    if (JSONParse)
        uncrushed = JSON.parse(uncrushed);
    return uncrushed;
}

let JSONCrushSwap = function(string, forward=true)
{
    function Swap(string, g)
    {
        let regex = new RegExp(`${(g[2]?g[2]:'')+g[0]}|${(g[3]?g[3]:'')+g[1]}`,'g');
        return string.replace(regex, $1 => ( $1 === g[0] ? g[1] : g[0] ));
    }

    // swap out characters for lesser used ones that wont get escaped
    let swapGroups = 
    [
        ['"', "'"],
        ["':", "!"],
        [",'", "~"],
        ['}', ")", '\\', '\\'],
        ['{', "(", '\\', '\\'],
    ];
    
    if (forward)
        for (let i=0; i<swapGroups.length;++i)
            string = Swap(string, swapGroups[i]);
    else
        for (let i=swapGroups.length; i--;)
            string = Swap(string, swapGroups[i]);
        
    return string;
}