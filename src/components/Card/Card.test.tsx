import { render } from '@testing-library/react';
import { Card } from './Card';

describe('<Card />', () => {
  test('should render Card', () => {
    const { getByText } = render(<Card>test</Card>);

    expect(getByText('test')).toBeTruthy();
  });
});
