/**
 * The ResizeObserver export interface is used to observe changes to Element's content
 * rect.
 *
 * It is modeled after MutationObserver and IntersectionObserver.
 */
export declare interface ResizeObserver {
  // tslint:disable-next-line:no-misused-new
  new(callback: ResizeObserverCallback): ResizeObserver;

  /**
   * Adds target to the list of observed elements.
   */
  observe(target: Element): void;

  /**
   * Removes target from the list of observed elements.
   */
  unobserve(target: Element): void;

  /**
   * Clears both the observationTargets and activeTargets lists.
   */
  disconnect(): void;
}

/**
 * This callback delivers ResizeObserver's notifications. It is invoked by a
 * broadcast active observations algorithm.
 */
export declare interface ResizeObserverCallback {
  // tslint:disable-next-line:callable-types
  (entries: ResizeObserverEntry[], observer: ResizeObserver): void;
}

export declare interface ResizeObserverEntry {

  /**
   * The Element whose size has changed.
   */
  readonly target: Element;

  /**
   * Element's content rect when ResizeObserverCallback is invoked.
   */
  readonly contentRect: DOMRectReadOnly;
}

export interface DOMRectReadOnly {
  // static fromRect(other: DOMRectInit | undefined): DOMRectReadOnly;

  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;

  toJSON(): any;
}
