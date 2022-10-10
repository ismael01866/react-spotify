import { Tbody, Tr } from '@chakra-ui/react';
import { useContext, useRef } from 'react';
import { LayoutGridContext } from 'src/layout/components/LayoutGrid/LayoutGridContext';
import { useDelayedRender, useOnScreen } from 'src/utils/hooks/dom';
import { CollectionRowTracksChunk } from './components';

interface CollectionTableBodyProps {
  index: number;
  skeletonTracks: any[];
}

export function CollectionTableBody(props: CollectionTableBodyProps) {
  const { index, skeletonTracks } = props;

  /**
   * virtualized list to increase perfomance
   */

  const containerEl = useRef<HTMLTableSectionElement>(null);
  const { contentElRef } = useContext(LayoutGridContext);

  const isIntersecting = useOnScreen(containerEl, {
    root: contentElRef.current,
    rootMargin: '800px 0px'
  });

  /**
   * we use a delay render to load each chunk after each other
   */

  const delayTime = 100 * (index - 1); // milliseconds
  const delayedRender = useDelayedRender(delayTime);

  return (
    <Tbody ref={containerEl}>
      {delayedRender(() => {
        return (
          <>
            {isIntersecting ? (
              <>
                <CollectionRowTracksChunk
                  index={index}
                  skeletonTracks={skeletonTracks}
                />
              </>
            ) : (
              <>
                {skeletonTracks?.map((_, index) => (
                  <Tr key={index} height={20} />
                ))}
              </>
            )}
          </>
        );
      })}
    </Tbody>
  );
}
