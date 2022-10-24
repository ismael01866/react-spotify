import { FaUser } from 'react-icons/fa';

import { EmptySkeleton } from 'components/Skeleton';

export function UserEmptySkeleton() {
  return <EmptySkeleton icon={FaUser} />;
}
