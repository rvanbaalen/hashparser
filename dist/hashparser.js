"use strict";/**
 * @param key
 * @returns {RegExp}
 */function hashParserReg(a){return new RegExp("(#!|&)("+a+"=)(.[^&]*)")}window.HashParser={setParameter:function setParameter(a,b,c){var d=location.hash;if(c=!!c,b=c?btoa(JSON.stringify(b)):encodeURIComponent(b),-1<d.indexOf(a))location.hash=d.replace(hashParserReg(a),"$1$2"+b);else{// Add the param
var e="#!"===d.substr(0,2)?"&":"#!";location.hash=d+e+a+"="+b}},getParameter:function getParameter(a,b){var c=location.hash.match(hashParserReg(a));if(b=!!b,null!==c)c=c[c.length-1];else return c;return b?JSON.parse(atob(c)):decodeURIComponent(c)}};