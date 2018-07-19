import { TaskQueue } from 'aurelia-task-queue';
import { ResizeObserver } from './interfaces';
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
export declare class ContentSize {
    /**
     * Resize observer class that will be used to observe the element size
     * Changing implementation after the application start will not have effect on existing bound custom attributes
     */
    static ResizeObserver: ResizeObserver;
    dimension: IContainerContentDimension;
    constructor(element: HTMLElement, taskQueue: TaskQueue);
}
