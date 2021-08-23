import {
  act,
  render,
  RenderResult,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CommunityPage from './CommunityPage';
import CommunityService from '../../services/CommunityService/CommunityService';
import Community from '../../models/Community/Community';

jest.mock('../../services/CommunityService/CommunityService');
const mockedCommunityService = CommunityService as jest.Mocked<
  typeof CommunityService
>;

describe('CommunityPage', () => {
  beforeEach(() => {
    const mockedCommunity: Community = {
      id: 'string',
      address: 'string',
      created_date: Date.prototype,
      description: 'string',
      name: 'string',
      org_email: 'string',
      org_name: 'string',
      bicycles: [],
      withdrawals: [],
    };
    mockedCommunityService.getAllCommunities.mockResolvedValue([
      mockedCommunity,
    ]);
  });

  it('should render loading component', async () => {
    act(() => {
      render(
        <BrowserRouter>
          <CommunityPage />
        </BrowserRouter>,
      );
    });
    const loadingText = screen.getByText('Carregando, por favor aguarde...');
    expect(loadingText).toBeInTheDocument();
    await waitForElementToBeRemoved(() =>
      screen.getByText('Carregando, por favor aguarde...'),
    );
  });

  it('renders a grid to show the communities', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <CommunityPage />
        </BrowserRouter>,
      );
    });

    const communitiesList = screen.getByTestId('communities-grid');
    expect(communitiesList).toBeInTheDocument();
  });
});
