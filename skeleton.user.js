// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  try to take over the world!
// @author       You
// @match        https://sergiosusa.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sergiosusa.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    try {
        let siteImproved = new SiteImproved();
        siteImproved.render();
    } catch (exception) {
        alert(exception);
    }
})();

function SiteImproved() {
    Renderer.call(this);

    this.rendererList = [
        // renderable function
        new RenderableExampleFunction(),
    ];

    this.globalRenderList = [
        // renderable function
    ];
}
SiteImproved.prototype = Object.create(Renderer.prototype);

function RenderableExampleFunction() {
    Renderable.call(this);

    this.handlePage = /https:\/\/sergiosusa\.com\/blog\//g

    this.render = () => {
    }
}
RenderableExampleFunction.prototype = Object.create(Renderable.prototype);

// region Base Functions
function Renderer() {
    this.rendererList = [];
    this.globalRenderList = [];

    this.render = () => {
        let renderers = this.findRenderer();

        for (const renderer of renderers) {
            renderer.render();
        }

        this.globalRender();
    }

    this.findRenderer = () => {

        let renderers = [];

        for (const renderer of this.rendererList) {
            if (renderer.canHandleCurrentPage()) {
                renderers.push(renderer);
            }
        }
        return renderers;
    };

    this.globalRender = function () {
        return this.globalRenderList.map(renderer => renderer.render());
    }
}

function Renderable() {
    this.handlePage = "";

    this.canHandleCurrentPage = () => {
        return null !== document.location.href.match(this.handlePage);
    };

    this.showAlert = (text) => {
        alert(text);
    }
}
// endregion