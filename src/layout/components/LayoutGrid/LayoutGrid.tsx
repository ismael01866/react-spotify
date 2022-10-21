import { Grid, GridItem } from '@chakra-ui/react';
import { ReactNode, useEffect, useRef } from 'react';
import {
  useSpotifyPlayerEmbed,
  useSpotifyPlayerStateHandler
} from 'src/utils/hooks/spotify';
import { Player, Sidebar } from './components';
import { LayoutGridContext } from './LayoutGridContext';

interface LayoutGridProps {
  children: ReactNode;
}

export function LayoutGrid({ children }: LayoutGridProps) {
  useSpotifyPlayerEmbed();
  useSpotifyPlayerStateHandler();

  const contentElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    contentElRef?.current?.scrollTo({ top: 0 }); // scroll to top
  }, [children]);

  return (
    <LayoutGridContext.Provider value={{ contentElRef: contentElRef }}>
      <Grid
        templateAreas={`"sidebar content" "player player"`}
        gridTemplateColumns={'auto 1fr'}
        gridTemplateRows={'1fr auto'}
        height={'100vh'}
      >
        <GridItem area={'sidebar'} pos={'relative'} zIndex={1}>
          <Sidebar />
        </GridItem>

        <GridItem
          area={'content'}
          p={12}
          ref={contentElRef}
          overflowX={'hidden'}
          overflowY={'auto'}
          zIndex={0}
          sx={{
            scrollbarWidth: 'thin'
          }}
        >
          {children}
        </GridItem>

        <GridItem area={'player'}>
          <Player />
        </GridItem>
      </Grid>
    </LayoutGridContext.Provider>
  );
}
