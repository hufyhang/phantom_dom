#!/usr/local/bin/phantomjs

var system = require('system');

//import dom.js
phantom.injectJs('./dom.js');

if(system.args.length === 1) {
    console.log('Missing parameters.');
    phantom.exit();
}

var url = system.args[1],
    dom = system.args[2];

_dom.grab({url:url, dom: dom}, function(data) {
    console.log(data);
    phantom.exit();
});

