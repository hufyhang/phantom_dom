#!/usr/local/bin/phantomjs

var _dom = (function() {
    return {
        grab: function(_args, callback) {

            var page = require('webpage').create();

            if(_args.url === undefined || _args.dom === undefined) {
                callback(false);
                return;
            }

            var url = _args.url,
            dom = _args.dom;

            page.onConsoleMessage = function(msg) {
                callback(msg);
            };

            page.open(url, function(status) {
                if(status === 'success') {
                    page.injectJs("jquery.min.js");
                    page.evaluate(function(url, dom) {
                        if($(dom).length === 0) {
                            console.log("No match!!!");
                            return;
                        }

                        var buffer = "{";
                        buffer += "\"url\" : \"" + url.replace(/\"/g, "'") + "\", ";
                        buffer += "\"dom\" : \"" + dom + "\", ";
                        buffer += "\"data\": [";

                        $.each($(dom), function() {
                            buffer += "{";
                            //get innerHTML
                            var text = $(this).html();
                            text = text.replace(/\"/g, "&quot;");
                            text = text.replace(/\n/g, " ");
                            buffer += "\"_\" : \"" + text + "\", ";

                            //get attributes
                            $.each(this.attributes, function() {
                                if(this.specified) {
                                    buffer += "\"" + this.name + "\" : \"" + this.value + "\", ";
                                }
                            });

                            buffer = buffer.slice(0, -2);
                            buffer += "}, ";
                        });


                        buffer = buffer.slice(0, -2);
                        buffer += "]}";
                        console.log(buffer);
                    }, url, dom);
                    page.close();
                }
            });


        }
    };
})();

