"use strict";

const url = require("url");

const testUrl = 'http://user:pass@host.com:8080/path/to/file?query=string#hash';

console.log( url.parse( testUrl ) );

/* 
Url {
    protocol: 'http:',
    slashes: true,
    auth: 'user:pass',
    host: 'host.com:8080',
    port: '8080',
    hostname: 'host.com',
    hash: '#hash',
    search: '?query=string',
    query: 'query=string',
    pathname: '/path/to/file',
    path: '/path/to/file?query=string',
    href: 'http://user:pass@host.com:8080/path/to/file?query=string#hash'
}
*/
