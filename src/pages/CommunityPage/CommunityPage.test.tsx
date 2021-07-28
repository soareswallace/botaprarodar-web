import CommunityPage from './CommunityPage';
import { render, screen } from '@testing-library/react';

const defaultCommunities: string[] = [];

describe('CommunityPage', () => {
  it('renders communities page without error', () => {
    const { container } = render(<CommunityPage props={defaultCommunities} />);
    expect(container).toBeInTheDocument();
  });

  it('renders a list to show the communities', () => {
    render(<CommunityPage props={defaultCommunities} />);
    const communitiesList = screen.getByTestId('communities-list');
    expect(communitiesList).toBeInTheDocument;
  });

  it('renders a list with two communities', () => {
    const newCommunities = ['First Community', 'Second Community'];
    render(<CommunityPage props={newCommunities} />);
    const communitiesList = screen.getByTestId('communities-list').childNodes;
    expect(communitiesList).toHaveLength(2);
  });
});
