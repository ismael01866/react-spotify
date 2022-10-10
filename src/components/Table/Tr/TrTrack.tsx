import { TableRowProps, Tr } from '@chakra-ui/react';
import { forwardRef } from 'react';

interface TrTackProps extends TableRowProps {}

export const TrTrack = forwardRef<HTMLTableRowElement, TrTackProps>(
  (props, ref) => {
    const { children, ...others } = props;

    return (
      <Tr
        ref={ref}
        _hover={{
          bgGradient: 'linear(to-r, transparent, bg.900)'
        }}
        {...others}
      >
        {children}
      </Tr>
    );
  }
);

TrTrack.displayName = 'TrTrack';
