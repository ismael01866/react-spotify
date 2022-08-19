import { ButtonPlay } from 'src/components/Button/ButtonPlay';

export interface CardButtonPlayProps {
  [others: string]: any;
}

export function CardButtonPlay(props: CardButtonPlayProps) {
  const { ...others } = props;

  return (
    <ButtonPlay
      bottom={4}
      right={4}
      pos={'absolute'}
      opacity={0}
      _groupHover={{ opacity: 1 }}
      {...others}
    />
  );
}
