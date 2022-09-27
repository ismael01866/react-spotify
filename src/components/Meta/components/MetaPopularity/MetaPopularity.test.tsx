import { render } from '@testing-library/react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { getPopularityIcon, MetaPopularity } from './MetaPopularity';

describe('<MetaPopularity />', () => {
  test('should render proper icon', () => {
    expect(getPopularityIcon(0)).toEqual(FaRegStar);
    expect(getPopularityIcon(5)).toEqual(FaStarHalfAlt);
    expect(getPopularityIcon(10)).toEqual(FaStar);
  });

  test('should render proper popularity score', () => {
    const { getByText } = render(<MetaPopularity popularity={95} />);

    expect(getByText('10')).toBeInTheDocument();
  });
});
