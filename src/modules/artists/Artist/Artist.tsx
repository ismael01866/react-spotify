import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectUser } from 'src/features';
import { ArtistContent, ArtistHeader } from 'src/features/artist';

export function Artist() {
  const router = useRouter();

  const { id } = router.query;
  const { country } = useSelector(selectUser);

  return (
    (id && (
      <Flex flexDirection={'column'} gap={12}>
        <ArtistHeader artistID={id} />
        {country && <ArtistContent country={country} artistID={id} />}
      </Flex>
    )) || <></>
  );
}
