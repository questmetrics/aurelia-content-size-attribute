import { ContentSize } from '../../src';
import { IContainerContentDimension } from '../../src/content-size';

export interface AppItem {
  name: string;
}

export class AppViewModel {

  public readonly contentSizeNotifier: ContentSize;
  public readonly el: HTMLElement;
  public readonly divSize: IContainerContentDimension | undefined;
}

export function wait(time: number = 100): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
