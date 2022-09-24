import { Grid, GridItem } from '@chakra-ui/react';
import { ReactNode, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useSpotifyPlayerStateHandler } from 'src/layout/hooks';
import { PlayerContext } from 'src/modules/player/Player/PlayerContext';
import { selectPlaybackID } from 'src/modules/player/Player/PlayerSlice';
import { UserContext } from 'src/modules/users/User/UserContext';
import { useMe } from 'src/utils/hooks/services';
import { Player, Sidebar } from './components';
import { LayoutGridContext } from './LayoutGridContext';

interface LayoutGridProps {
  children: ReactNode;
}

export function LayoutGrid({ children }: LayoutGridProps) {
  const playbackID = useSelector(selectPlaybackID);
  const contentElRef = useRef<HTMLDivElement>(null);

  const { user } = useMe();
  const { player } = useSpotifyPlayerStateHandler();

  useEffect(() => {
    contentElRef?.current?.scrollTo({ top: 0 }); // scroll to top
  }, []);

  return (
    <UserContext.Provider value={{ ...user }}>
      <PlayerContext.Provider value={{ player }}>
        <LayoutGridContext.Provider
          value={{ contentElRef: contentElRef }}
        >
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
              py={12}
              px={12}
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

            {playbackID && (
              <GridItem area={'player'}>
                <Player />
              </GridItem>
            )}
          </Grid>
        </LayoutGridContext.Provider>
      </PlayerContext.Provider>
    </UserContext.Provider>
  );
}
