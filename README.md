About
==========

Delayed JS is a light weight solution built to delay the load of JavaScript files and scripts through dynamic loading and dependency tracking without the need for a large library to load externally. It helps prevent render blocking of pages, which makes pages appear to load faster, and appeases googles page speed recommendations.

Using delayed js
==========
The prefered method for using delayed js is to include the minified version of the code directly in ```<head>``` by copying the contents of the file and pasting it within ```<script>``` tags. The non minified version is intended for development.

## basic usage

```js
delayed.loadScript(src, name, callback, dependsOn);
```

* src - external js file or local function - required
* name - used for tracking and dependancy checks - optional
* callback - attached to the onload of the script from src - optional
* dependsOn - used to tell it to hold the script until the dependancy loads - optional

## full example

```html
<!DOCTYPE html>
<html>
<head>

<title>Delayed JS</title>
    
<script>
function Delayed(){function r(e,r,s,o){if(typeof n[o]!="undefined"){i(e,s,r)}else{if(typeof t[o]=="undefined")t[o]=new Array;t[o].push({src:e,name:r,cb:s})}}function i(e,t,n){if(typeof e=="function"){e()}else{var r=document.createElement("script");r.async=true;r.onload=function(){s(t,n)};r.src=e;var i=document.getElementsByTagName("body")[0];i.appendChild(r)}}function s(e,r){n[r]=true;e();if(typeof t[r]=="object"){for(var s=0;s<t[r].length;s++){i(t[r][s].src,t[r][s].cb,t[r][s].name)}delete t[r]}}var e=this;var t=new Array;var n=new Array;this.loadScript=function(e,t,n,s){if(s){r(e,t,n,s)}else{i(e,n,t)}}}
</script>

<script>
    delayed = new Delayed();

    delayed.loadScript(function(){
        console.log('loads after jquery');
    },null,null, 'jQuery');
</script>
</head>
<body>
    <h1 id="mainTitle">Example</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    
    <script>
        delayed.loadScript('//code.jquery.com/jquery-1.11.0.min.js', 'jQuery', function(){
            console.log('jquery loaded');
        });
    </script>
</body>
</html>

```