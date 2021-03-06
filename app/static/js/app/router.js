﻿define(["dojo/router"],
    function (router) {
        var views = {};

        function registerView(url, view) {
            views[url] = view;
            router.register(url, function (e) {
                navigateTo(view, e);
            });
        }

        function navigateTo(view, e) {
            for (var i in views) {
                var v = views[i];
                if (view == v) {
                    v.domNode.style.display = "";
                    if (v.show) {
                        v.show(e);
                    }
                } else {
                    v.domNode.style.display = "none";
                }
            }
        }

        function startup() {
            router.startup("/");
        }

        return {
            registerView: registerView,
            startup: startup
        };
    }
);