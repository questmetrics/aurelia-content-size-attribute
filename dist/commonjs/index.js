'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_1 = require('tslib');
var aureliaTemplating = require('aurelia-templating');
var aureliaPal = require('aurelia-pal');
var aureliaTaskQueue = require('aurelia-task-queue');

var ContentSize_1;
exports.ContentSize = ContentSize_1 = class ContentSize {
    constructor(element, taskQueue) {
        this.element = element;
        this.taskQueue = taskQueue;
    }
    /**
     * @internal
     */
    static inject() {
        return [aureliaPal.DOM.Element, aureliaTaskQueue.TaskQueue];
    }
    /**
     * @internal Aurelia lifecycle method
     */
    bind() {
        this.resizeObserver = new ContentSize_1.ResizeObserver((entries) => {
            this.rect = entries[0];
            this.taskQueue.queueMicroTask(this);
        });
        this.resizeObserver.observe(this.element);
    }
    /**
     * @internal Aurelia lifecycle method
     */
    unbind() {
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
    }
    /**
     * @internal
     */
    call() {
        this.calculate();
    }
    /**
     * @internal
     */
    calculate() {
        const { element, rect: { contentRect: rect } } = this;
        this.dimension = {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            scrollWidth: element.scrollWidth,
            scrollHeight: element.scrollHeight
        };
    }
};
tslib_1.__decorate([
    aureliaTemplating.bindable({
        primaryProperty: true,
        defaultBindingMode: 'fromView'
    }),
    tslib_1.__metadata("design:type", Object)
], exports.ContentSize.prototype, "dimension", void 0);
exports.ContentSize = ContentSize_1 = tslib_1.__decorate([
    aureliaTemplating.customAttribute('content-size'),
    tslib_1.__metadata("design:paramtypes", [HTMLElement,
        aureliaTaskQueue.TaskQueue])
], exports.ContentSize);

function configure(fxconfig, plgCfg) {
    exports.ContentSize.ResizeObserver = plgCfg && plgCfg.resizeObserver || aureliaPal.PLATFORM.global.ResizeObserver;
    fxconfig.globalResources(exports.ContentSize);
}

exports.configure = configure;
