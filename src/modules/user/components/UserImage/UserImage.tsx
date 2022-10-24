import { AspectRatio, Image } from '@chakra-ui/react';

import { IUser } from 'types/user';

import { UserEmptySkeleton } from '../UserEmptySkeleton';

interface UserImageProps {
  user: IUser;
}

export function UserImage(props: UserImageProps) {
  const { user } = props;
  const { display_name, images } = user;

  return (
    <AspectRatio boxSize={'full'} ratio={4 / 3}>
      <Image
        src={images?.[0]?.url}
        alt={display_name}
        fallback={<UserEmptySkeleton />}
      />
    </AspectRatio>
  );
}
