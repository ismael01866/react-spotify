import { HStack, IconButton } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export interface NavigationProps {}

export function Navigation(props: NavigationProps) {
  return (
    <HStack>
      <IconButton
        aria-label={'back'}
        icon={<FaChevronLeft />}
        onClick={() => window.history.back()}
      />

      <IconButton
        aria-label={'forward'}
        icon={<FaChevronRight />}
        onClick={() => window.history.forward()}
      />
    </HStack>
  );
}
