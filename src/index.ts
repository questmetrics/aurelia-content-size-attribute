import { PLATFORM } from 'aurelia-pal';
import { ContentSize } from './content-size';
import { ResizeObserver } from './interfaces';

export { ContentSize };

export function configure(fxconfig: { globalResources(rs: Function): any }, plgCfg?: { resizeObserver?: ResizeObserver }): void {
  ContentSize.ResizeObserver = plgCfg && plgCfg.resizeObserver || PLATFORM.global.ResizeObserver;
  fxconfig.globalResources(ContentSize);
}
