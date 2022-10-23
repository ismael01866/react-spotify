import { chunk } from 'lodash';
import { SetStateAction } from 'react';

export const utilSetDelayedState = (
  data: any[],
  setStateCallback: (value: SetStateAction<any>) => void,
  { chunkSize = 20, renderDelay = 100, initialDelay = 500 } = {}
) => {
  let delay = 0;
  const chunkSorted = chunk(data, chunkSize);

  for (let i = 0; i < chunkSorted.length; i++) {
    (function (j) {
      delay = (j - 1) * renderDelay + initialDelay;

      const timeout = setTimeout(
        () => {
          setStateCallback((currentValue: any) => {
            if (currentValue) return [...currentValue, ...chunkSorted[i]];
          });

          clearTimeout(timeout);
        },
        i === 0 ? 0 : delay
      );
    })(i);
  }
};
