/////////////////////////////////////////////////////////////////////// 
// JSONCrush by Frank Force [MIT]
// Based on JSCrush - Javascript crusher by @aivopaas. [MIT] http://www.iteral.com/jscrush
/////////////////////////////////////////////////////////////////////// 

"use strict"; // strict mode

function JSONCrush(object)
{
    let string = JSON.stringify(object);
    
    let Q=[];
    for (let i=122;--i;((i>=65&&i<=90)||(i>=97&&i<=122)||(i>=48&&i<=57))&&Q.push(String.fromCharCode(i)));
    
    let s, X, B, O, m, i, c, e, N, M, o, t, j, x, R;
	s = string.replace(/([\r\n]|^)\s*\/\/.*|[\r\n]+\s*/g,'').replace(/\\/g,'\\\\')
    X=B=s.length/2
    O=m='';
	i = s;
    
    for(let S=encodeURI(i).replace(/%../g,'i').length;;m=c+m)
    {
		for(M=N=e=c=0,i=Q.length;!c&&--i;!~s.indexOf(Q[i])&&(c=Q[i]));
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
    
    let crushed = {a:s, b:m};
    return JSON.stringify(crushed);
}

function JSONUncrush(string)
{
    let crushed = JSON.parse(string);

    let a = crushed.a;
    let b = crushed.b;
    for(let c in b)
    {
        let d = a.split(b[c]);
        a=d.join(d.pop());
    }

    let uncrushed = a;
    return JSON.parse(uncrushed);
}