// tslint:disable: variable-name
import { bindable, customAttribute } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { TaskQueue } from 'aurelia-task-queue';
import { ResizeObserver, ResizeObserverEntry } from './interfaces';

export interface IContainerContentDimension {
  top: number;
  left: number;
  /**
   * Width of the container content area.
   */
  width: number;
  /**
   * Height of the container content area.
   */
  height: number;
  /**
   * Real width of content, could be bigger than the container width
   */
  scrollWidth: number;
  /**
   * Real height of content, could be bigger than the container height
   */
  scrollHeight: number;
}

@customAttribute('content-size')
export class ContentSize {

  /**
   * @internal
   */
  public static inject(): any[] {
    return [DOM.Element, TaskQueue];
  }

  /**
   * Resize observer class that will be used to observe the element size
   * Changing implementation after the application start will not have effect on existing bound custom attributes
   */
  public static ResizeObserver: ResizeObserver;

  @bindable({
    primaryProperty: true,
    defaultBindingMode: 'fromView'
  })
  public dimension: IContainerContentDimension;

  /**
   * @internal
   */
  private resizeObserver: ResizeObserver | null;

  /**
   * @internal
   */
  private rect: ResizeObserverEntry;

  /**
   * @internal
   */
  private element: HTMLElement;

  /**
   * @internal
   */
  private taskQueue: TaskQueue;

  constructor(
    element: HTMLElement,
    taskQueue: TaskQueue
  ) {
    this.element = element;
    this.taskQueue = taskQueue;
  }

  /**
   * @internal Aurelia lifecycle method
   */
  public bind(): void {
    this.resizeObserver = new ContentSize.ResizeObserver((entries) => {
      this.rect = entries[0];
      this.taskQueue.queueMicroTask(this);
    });
    this.resizeObserver.observe(this.element);
  }

  /**
   * @internal Aurelia lifecycle method
   */
  public unbind(): void {
    this.resizeObserver!.disconnect();
    this.resizeObserver = null;
  }

  /**
   * @internal
   */
  public call(): void {
    this.calculate();
  }

  /**
   * @internal
   */
  private calculate(): void {
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
}
