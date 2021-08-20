import { render, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { CommunityPage } from 'pages';
import { Router } from 'react-router-dom';
import Route from './Route';
import { AuthProvider, useHandleAuth } from '../context/AuthContext';
import AuthInterface from '../models/Auth/AuthInterface';

const history = createMemoryHistory({ initialEntries: ['/dashboard'] });

describe('route redirections based on authentication', () => {
  it('should render public page', async () => {
    const { getByText } = render(
      <Router history={history}>
        <Route path="/dashboard" comp={() => <div>DashboardPage</div>} />
      </Router>,
    );
    await waitFor(() => expect(getByText('DashboardPage')).toBeInTheDocument());
  });

  xit('should not redirect to login page when user is logged', async () => {
    const mockedUser: AuthInterface = {
      token: 'token',
      authenticated: true,
      email: 'email@example.com',
      displayName: 'John Smith',
    };
    const { onChange } = useHandleAuth();
    onChange(mockedUser);

    const { container } = render(
      <AuthProvider>
        <Router history={history}>
          <Route path="/comunidades" isPrivate comp={CommunityPage} />
          <Route path="/login" comp={() => <div>/login</div>} />
        </Router>
      </AuthProvider>,
    );
    await waitFor(() =>
      expect(container.innerHTML).toEqual(
        expect.stringContaining('Comunidades'),
      ),
    );
  });
});