import { ButtonPlay } from 'src/components/Button/ButtonPlay';
import { ITrack } from 'src/types/track';

interface CardButtonPlayProps<TData, TType> {
  data: TData;
  type: TType;
  [others: string]: any;
}

export function CardButtonPlay<
  TData extends { context: { type: string; uri: string } } & ITrack,
  TType
>(props: CardButtonPlayProps<TData, TType>) {
  const {
    type,
    data: { context, uri }
  } = props;

  const style: any = {
    right: 4,
    bottom: 4,
    position: 'absolute'
  };

  if (type === 'track') {
    if (context?.type === 'track') {
      return <ButtonPlay uri={uri} {...style} />;
    }

    return <ButtonPlay context_uri={context?.uri} {...style} />;
  }

  return <ButtonPlay context_uri={uri} {...style} />;
}
