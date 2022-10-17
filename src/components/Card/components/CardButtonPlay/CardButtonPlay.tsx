import { memo } from 'react';
import { ButtonPlay } from 'src/components/Button/ButtonPlay';
import { ITrack } from 'src/types/track';

interface CardButtonPlayProps<TData, TType> {
  data: TData;
  type: TType;
  [others: string]: any;
}

const MemoButtonPlay = memo(ButtonPlayContainer);

export function CardButtonPlay<TData extends {} & ITrack, TType>(
  props: CardButtonPlayProps<TData, TType>
) {
  const {
    type,
    data: { context, uri }
  } = props;

  if (type === 'track') {
    if (context?.type === 'track') {
      return <MemoButtonPlay uri={uri} />;
    }

    return <MemoButtonPlay context_uri={context?.uri} />;
  }

  return <MemoButtonPlay context_uri={uri} />;
}

function ButtonPlayContainer({ ...others }) {
  return (
    <ButtonPlay
      bottom={4}
      boxShadow={'dark-lg'}
      pos={'absolute'}
      right={4}
      {...others}
    />
  );
}
