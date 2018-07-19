import { ContentSize } from './content-size';
import { ResizeObserver } from './interfaces';
export { ContentSize };
export declare function configure(fxconfig: {
    globalResources(rs: Function): any;
}, plgCfg?: {
    resizeObserver?: ResizeObserver;
}): void;
