import { FaUser } from 'react-icons/fa';
import { EmptySkeleton } from 'src/components/Skeleton';

export function UserEmptySkeleton() {
  return <EmptySkeleton icon={FaUser} />;
}
