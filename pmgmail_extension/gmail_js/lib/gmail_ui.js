

(function (Streak, window) {
    var $ = Streak.jQuery,
        _ = Streak._,
        Requester = Streak.Requester;
    var HTML = {
        loaded: null,
        init: function (callback) {
            var self = this;
            Requester.getStringNoEmail({
                msgUrl: Streak.getCombined("html", false),
                server: Streak.combinedServer || Streak.server
            }, function (res) {
                self.loaded = $(document.createElement("div"));
                self.loaded[0].innerHTML = res;
                if (callback) callback()
            }, function (res) {})
        },
        get: function (id, isElement) {
            var d = this.loaded.find("#" + id);
            if (d.length === 0) {
                console.log("can't find " + id);
                return id
            } else {
                var s =
                    Streak.Locale.localize(d[0].innerHTML.unescapeHTML()).trim();
                if (isElement) return $($.parseHTML(s));
                else return _.template(s)
            }
        },
        getString: function (id) {
            var d = this.loaded.find("#" + id);
            if (d.length === 0) {
                console.log("can't find " + id);
                return id
            } else return Streak.Locale.localize(d[0].innerHTML.unescapeHTML()).trim()
        },
        getStringWithSelector: function (selector) {
            var d = this.loaded.find(selector);
            if (d.length === 0) return "";
            return Streak.Locale.localize(d[0].innerHTML.unescapeHTML()).trim()
        },
        getElement: function (id) {
            var self =
                this;
            return self.get(id, true)
        }
    };
    Streak.DependencyManager.addFunction({
        functionKey: "htmlLoaded",
        functionToCall: HTML.init,
        functionContext: HTML,
        dependentFunctionKeys: ["localeLoaded"]
    });
    Streak.HTML = HTML
})(Streak, window);












//clase para crear ButtoneMenu


(function (Streak) {
    var $ = Streak.jQuery,
        _ = Streak._,
        Gmail = Streak.Gmail,
        HTML = Streak.HTML,
        BB = Streak.BentoBox;
    var ButtonMenu = {
        templates: {},
        defaults: {
            css: {
                left: "0px",
                width: "auto"
            },
            buttonCss: {},
            buttonInner: "",
            showButtonArrow: true,
            menuInner: "",
            onFunc: $.noop,
            postOnFunc: $.noop,
            offFunc: $.noop,
            postOffFunc: $.noop,
            color: "normal",
            closeOnSelect: true,
            customButton: null,
            onClass: null,
            hoverClass: null,
            justMenu: false,
            dynamicPosition: false,
            fixedPosition: false,
            rightAligned: false,
            bottomAligned: false,
            menu: null,
            isLast: false,
            identityClass: null,
            attachTo: null
        },
        init: function (cb) {
            this.templates.menu = HTML.get("buttonMenuMenu"); // TODO  AVERIGUAR FUNCIONALIDAD
            if (cb) cb()
        },
        create: function (options) {
            var o = {};
            $.extend(o, this.defaults, options);
            return new this.impl(o)
        }
    };
    ButtonMenu.impl = function (o) {
        var options = o,
            group = BB.Widgets.Button.createGroup(),  //TODO ANALIZAR  Widgets
            menu = options.menu || $(ButtonMenu.templates.menu({
                inner: options.menuInner
            })),
            justMenu = options.justMenu,
            visible = false,
            menuOff = null,
            menuOn = null;
        if (options.trackingContext) options.trackingContext.widgetContext = "/buttonMenu";
        group.el.addClass(options.identityClass);
        var on = function (e) {
            visible = true;
            if (!options.onFunc(e)) {
                menu.show();
                if (options.dynamicPosition);
                else if (options.fixedPosition) menu.css({
                    position: "fixed",
                    left: "auto"
                });
                else if (options.isLast) menu.css({
                    left: -1 * menu.width()
                });
                if (options.bottomAligned)
                    if (options.fixedPosition) menu.css("bottom", Gmail.elements.body[0].clientHeight - buttonEl.offset().top + "px");
                    else menu.css("bottom", button.el.outerHeight() + "px");
                    else if (options.fixedPosition) menu.css("top", buttonEl.offset().top +
                    buttonEl.outerHeight() + "px");
                if (options.rightAligned) {
                    var anchorEl = options.justMenu ? button : button.el;
                    var left;
                    if (options.dynamicPosition) left = anchorEl.position().left;
                    else if (options.fixedPosition) left = anchorEl.offset().left;
                    menu.css({
                        left: left + (anchorEl.outerWidth() - menu.outerWidth())
                    });
                    menu.css({
                        minWidth: menu.width()
                    })
                }
                if (options.fixedPosition) menu.containByScreen(buttonEl);
                if (options.postOnFunc) options.postOnFunc(e);
                if (e) e.stopPropagation();
                menu.bodyCloseAndStop({
                    closeFunction: function () {
                        if (visible && !justMenu) button.off();
                        else if (visible && justMenu) off()
                    },
                    body: Gmail.elements.body,
                    stop: justMenu ? button[0] : group.el[0]
                })
            }
        }, off = function (e) {
                visible = false;
                options.offFunc(e);
                menu.hide();
                if (options.postOffFunc) options.postOffFunc(e);
                if (e) e.stopPropagation();
                menu.unbindBodyCloseAndStop()
            }, isOn = function () {
                return visible
            }, button = null,
            buttonEl = null;
        if (justMenu) {
            menuOff = off;
            menuOn = on;
            button = options.customButton;
            button.click(function (e) {
                if (visible) off();
                else on()
            });
            buttonEl = button
        } else {
            button = BB.Widgets.Button.create({
                name: options.buttonInner,
                isToggle: true,
                onFunc: function (e) {
                    on(e)
                },
                offFunc: function (e) {
                    off(e)
                },
                color: options.color,
                hasButtonToLeft: options.hasButtonToLeft,
                hasButtonToRight: options.hasButtonToRight,
                customButton: options.customButton,
                onClass: options.onClass,
                hoverClass: options.hoverClass,
                isDropdown: options.showButtonArrow
            });
            buttonEl = button.el;
            button.el.css(options.buttonCss);
            group.el.append(button.el);
            if (options.attachTo) options.attachTo.append(menu);
            else group.el.append(menu)
        }
        menu.hide();
        menu.css(options.css);
        menu.click(function (e) {
            if (options.closeOnSelect) button.off();
            e.stopPropagation()
        });
        return {
            el: group.el,
            group: group,
            button: button,
            menu: menu,
            on: menuOn || button.on,
            off: menuOff || button.off,
            isOn: isOn,
            getElement: function () {
                return group.el
            },
            getButtonElement: function () {
                return buttonEl
            },
            updateOptions: function (newOptions) {
                _.extend(options, newOptions)
            },
            destroy: function () {
                if (_.isFunction(button.destroy)) button.destroy();
                menu.remove();
                group.destroy()
            }
        }
    };
    Streak.DependencyManager.addFunction({
        functionKey: "widgets.buttonMenu.initialized",
        functionToCall: ButtonMenu.init,
        functionContext: ButtonMenu,
        dependentFunctionKeys: ["htmlLoaded", "localeLoaded"]
    });
    BB.Widgets.ButtonMenu = ButtonMenu
})(Streak);

//CREATE BUTTON

(function (Streak) {
    var $ = Streak.jQuery,
        _ = Streak._,
        HTML = Streak.HTML,
        Gmail = Streak.Gmail,
        BB = Streak.BentoBox;
    var Button = {
        classes: {
            normal: {
                inactive: "T-I-ax7",
                hover: "T-I-JW",
                active: "T-I-Kq"
            },
            blue: {
                inactive: "T-I-atl",
                hover: "T-I-JW",
                active: "T-I-JO"
            },
            red: {
                inactive: "T-I-KE",
                hover: "T-I-JW",
                active: "T-I-JO"
            },
            icon: {
                inactive: "J-Z-I",
                hover: "J-Z-I-JW",
                active: "J-Z-I-KO"
            }
        },
        defaults: {
            button: {
                name: null,
                isRefresh: false,
                isToggle: false,
                enableDepressedState: true,
                onFunc: $.noop,
                offFunc: $.noop,
                color: "normal",
                hasButtonToLeft: false,
                hasButtonToRight: false,
                customButton: null,
                onClass: null,
                hoverClass: null,
                isDropdown: false,
                isOn: false,
                iconClassName: undefined,
                tooltip: undefined,
                tabIndex: 2001
            },
            group: {}
        },
        templates: {
            button: null,
            group: null,
            refresh: null
        },
        init: function (cb) {
            Button.templates.refresh = HTML.get("refreshButton");
            if (cb) cb()
        },
        create: function (options) {
            var o = {};
            _.extend(o, this.defaults.button, options);
            return new this.impl(o)
        },
        createGroup: function (options) {
            var o = {};
            _.extend(o, this.defaults.group, options);
            return new this.groupImpl(o)
        }
    };
    Button.impl = function (o) {
        var options = o,
            isOn = options.isOn;
        var el = null;
        var innerEl = null;
        var disabled = false;
        if (options.customButton) el = $(options.customButton);
        else {
            el = $(document.createElement("div"));
            innerEl = $(document.createElement("div"));
            el.append(innerEl);
            if (_.isDefined(options.tooltip)) el.attr("data-tooltip", options.tooltip);
            if (_.isDefined(options.iconClassName)) {
                var iconDiv = $("<div class='bbIcon' ></div>");
                iconDiv.addClass(options.iconClassName);
                el.prepend(iconDiv);
                if (options.name) {
                    iconDiv.attr("style",
                        "vertical-align: middle; padding-top:2px;padding-right: 4px;");
                    innerEl.attr("style", "vertical-align: middle; display: inline-block;")
                } else {
                    iconDiv.attr("style", "vertical-align: middle;");
                    el[0].setAttribute("style", "min-width: 0px; padding-right: 10px; padding-left: 10px")
                }
            }
            el[0].setAttribute("class", "T-I J-J5-Ji ar7 L3 J-Zh-I bbButton");
            el[0].setAttribute("tabindex", options.tabIndex);
            if (options.isRefresh) innerEl[0].innerHTML = Button.templates.refresh();
            else innerEl.append(options.name); if (options.isDropdown) innerEl.append('<div class="downArrow G-asx T-I-J3 J-J5-Ji">&nbsp;</div>')
        }
        var on =
            function (dontCallback, e) {
                if (disabled) return;
                var butName = options.isRefresh ? "refresh" : $.trim(el.text());
                butName = options.overridenTrackingName ? options.overridenTrackingName : butName;
                if (o.isToggle) {
                    if (o.enableDepressedState)
                        if (options.customButton) el.addClass(options.onClass);
                        else el.addClass("J-Zh-I-Jo").addClass("J-Zh-I-Kq").addClass("bbActive").addClass(Button.classes[options.color].active);
                    isOn = true;
                    if (options.enableDepressedState) el.trigger("hold")
                }
                if (!dontCallback) options.onFunc(e)
        }, setOnFunc = function (fxn) {
                options.onFunc =
                    fxn
            }, off = function (dontCallback, e) {
                if (isOn)
                    if (!dontCallback) options.offFunc(e);
                isOn = false;
                el.trigger("unhold");
                if (o.enableDepressedState)
                    if (options.customButton) el.removeClass(options.onClass);
                    else el.removeClass("J-Zh-I-Jo").removeClass("J-Zh-I-Kq").removeClass("bbActive").removeClass(Button.classes[options.color].active)
            };
        if (options.hasButtonToRight) el.addClass("T-I-Js-IF");
        if (options.hasButtonToLeft) el.addClass("T-I-Js-Gs");
        if (options.customButton) {
            if (options.hoverClass) el.easyHoverClass(options.hoverClass)
        } else {
            el.addClass(Button.classes[options.color].inactive);
            el.easyHoverClass(Button.classes[options.color].hover + " J-Zh-I-JW")
        }
        el.click(function (e) {
            if (isOn) off(false, e);
            else on(false, e)
        });
        BB.Keyboard.bindChordToElement(el, "enter/space", function () {
            if (isOn) off();
            else on()
        }, true, true);
        return {
            setOnFunc: setOnFunc,
            el: el,
            innerEl: innerEl,
            on: on,
            off: off,
            getElement: function () {
                return el
            },
            changeIconByClass: function (oldClass, newClass) {
                if (_.isDefined(iconDiv)) {
                    iconDiv.removeClass(oldClass);
                    iconDiv.addClass(newClass)
                }
            },
            toggleRoundLeft: function () {
                var className = "T-I-Js-Gs";
                if (_.isDefined(el) && el.hasClass(className)) el.removeClass(className);
                else if (_.isDefined(el)) el.addClass(className)
            },
            toggleRoundRight: function () {
                var className = "T-I-Js-IF";
                if (_.isDefined(el) && el.hasClass(className)) el.removeClass(className);
                else if (_.isDefined(el)) el.addClass(className)
            },
            disable: function () {
                if (!options.customButton) el.addClass("T-I-JE");
                el.trigger("disabled");
                disabled = true
            },
            enable: function () {
                if (!options.customButton) el.removeClass("T-I-JE");
                el.trigger("enabled");
                disabled = false
            },
            destroy: function () {
                innerEl.remove();
                el.remove()
            }
        }
    };
    Button.groupImpl = function (o) {
        var options = o,
            el = $(document.createElement("div"));
        el[0].setAttribute("class", "VP5otc-HT6HAf J-J5-Ji G-Ni bbButtonGroup");
        return {
            el: el,
            destroy: function () {
                el.remove()
            }
        }
    };
    Streak.DependencyManager.addFunction({
        functionKey: "widgets.button.initialized",
        functionToCall: Button.init,
        functionContext: Button,
        dependentFunctionKeys: ["htmlLoaded", "localeLoaded"]
    });
    BB.Widgets.Button = Button
})(Streak);

