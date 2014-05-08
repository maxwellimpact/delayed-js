About
==========

Delayed JS is a light weight solution built to delay the load of JavaScript files and scripts through dynamic loading and dependency tracking without the need for a large library to load externally. It helps prevent render blocking of pages, which makes pages appear to load faster, and appeases googles page speed recommendations.

Using delayed js
==========
The prefered method for using delayed js is to include the minified version of the code directly in ```<head>``` by copying the contents of the file and pasting it within ```<script>``` tags. The non minified version is intended for development.

## basic usage

```js
delayed.script(src, name, callback, dependsOn);
```

* src - external js file or local function - required
* name - used for tracking and dependancy checks - optional
* callback - attached to the onload of the script from src - optional
* dependsOn - used to tell it to hold the script until the dependancy loads - optional

## tested on

* Firefox (latest)
* Chrome (latest)
* Safari (latest)
* IE (7,8,9,10,11)

## full example

```html
<!DOCTYPE html>
<html>
<head>

<title>Delayed JS</title>
    
<script>
function D(){function s(n,i,s,u){if(typeof t[u]!=r){o(n,s,i)}else{if(typeof e[u]==r)e[u]=[];e[u].push({src:n,name:i,cb:s})}}function o(e,t,r){if(typeof e==n){e()}else{var s=i.createElement("script");s.async=true;s.onload=function(){u(t,r)};if(!s.addEventListener&&s.readyState){s.onreadystatechange=s.onload}s.src=e;var o=i.getElementsByTagName("body")[0];o.appendChild(s)}}function u(r,i){t[i]=true;if(typeof r==n)r();if(typeof e[i]=="object"){for(var s=0;s<e[i].length;s++){o(e[i][s].src,e[i][s].cb,e[i][s].name)}delete e[i]}}var e=[],t=[],n="function",r="undefined",i=document;this.script=function(e,t,n,r){if(r){s(e,t,n,r)}else{o(e,n,t)}}}delayed=new D();
</script>

<script>
    delayed.script(function(){
        console.log('loads after jquery');
    },null,null,'jQuery');
</script>
</head>
<body>
    <h1 id="mainTitle">Example</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    
    <script>
        delayed.script('//code.jquery.com/jquery-1.11.0.min.js', 'jQuery', function(){
            console.log('jquery loaded');
        });
    </script>
</body>
</html>

```