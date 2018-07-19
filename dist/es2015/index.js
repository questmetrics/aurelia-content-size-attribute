import { __decorate, __metadata } from 'tslib';
import { bindable, customAttribute } from 'aurelia-templating';
import { DOM, PLATFORM } from 'aurelia-pal';
import { TaskQueue } from 'aurelia-task-queue';

var ContentSize_1;
let ContentSize = ContentSize_1 = class ContentSize {
    constructor(element, taskQueue) {
        this.element = element;
        this.taskQueue = taskQueue;
    }
    /**
     * @internal
     */
    static inject() {
        return [DOM.Element, TaskQueue];
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
__decorate([
    bindable({
        primaryProperty: true,
        defaultBindingMode: 'fromView'
    }),
    __metadata("design:type", Object)
], ContentSize.prototype, "dimension", void 0);
ContentSize = ContentSize_1 = __decorate([
    customAttribute('content-size'),
    __metadata("design:paramtypes", [HTMLElement,
        TaskQueue])
], ContentSize);

function configure(fxconfig, plgCfg) {
    ContentSize.ResizeObserver = plgCfg && plgCfg.resizeObserver || PLATFORM.global.ResizeObserver;
    fxconfig.globalResources(ContentSize);
}

export { ContentSize, configure };
