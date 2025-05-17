
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Authors from '../pages/authors/Authors';
import authorsService from '../services/authorsService';

// Mock services
jest.mock('../services/authorsService');

describe('Authors Component', () => {
  const mockAuthors = [
    { id: 1, name: 'Jane Austen', birthDate: '1775-12-16', country: 'England' },
    { id: 2, name: 'George Orwell', birthDate: '1903-06-25', country: 'India' },
  ];

  beforeEach(() => {
    authorsService.getAuthors.mockResolvedValue(mockAuthors);
  });

  it('renders authors list correctly', async () => {
    render(<Authors />);
    
    // Check loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    // Wait for authors to load
    await waitFor(() => {
      expect(screen.getByText('Jane Austen')).toBeInTheDocument();
      expect(screen.getByText('George Orwell')).toBeInTheDocument();
    });
  });

  it('opens add author modal when clicking add button', async () => {
    render(<Authors />);
    
    await waitFor(() => {
      expect(screen.getByText('Jane Austen')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Add Author'));
    
    expect(screen.getByText('Add New Author')).toBeInTheDocument();
    expect(screen.getByLabelText('Author Name')).toBeInTheDocument();
  });

  // more than bla bla bla
});