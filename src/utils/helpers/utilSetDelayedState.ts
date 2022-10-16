import { chunk } from 'lodash';
import { SetStateAction } from 'react';

export const utilSetDelayedState = (
  data: any[],
  setStateCallback: (value: SetStateAction<any>) => void,
  { chunkSize = 20, renderDelay = 500 } = {}
) => {
  const chunkSorted = chunk(data, chunkSize);

  for (let i = 0; i < chunkSorted.length; i++) {
    const timeout = setTimeout(
      () => {
        setStateCallback((currentValue: any) => {
          if (currentValue) return [...currentValue, ...chunkSorted[i]];
        });

        clearTimeout(timeout);
      },
      i === 0 ? renderDelay * i : renderDelay / i // do the first render fast, then pause, then render remaining chunks fatser
    );
  }
};
