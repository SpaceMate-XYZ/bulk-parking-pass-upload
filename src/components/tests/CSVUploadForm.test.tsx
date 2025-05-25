import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CSVUploadForm from '../CSVUploadForm'; // Adjust path as necessary

// Mock child components to isolate testing to CSVUploadForm
vi.mock('../FileUploadZone', () => ({
  default: ({ onFileAccepted, onFileRejected, isLoading, error }: any) => (
    <div data-testid="file-upload-zone">
      <button data-testid="accept-file" onClick={() => onFileAccepted(new File(['test'], 'test.csv', { type: 'text/csv' }))}>Accept File</button>
      <button data-testid="reject-file" onClick={() => onFileRejected()}>Reject File</button>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  )
}));

vi.mock('../PreviewTable', () => ({
  default: () => <div data-testid="preview-table">Preview Table</div>
}));

vi.mock('../ProcessingStatus', () => ({
  default: ({ isProcessing }: any) => (
    <div data-testid="processing-status">
      {isProcessing ? 'Processing...' : 'Idle'}
    </div>
  )
}));

describe('CSVUploadForm', () => {
  it('renders initial state correctly', () => {
    render(<CSVUploadForm />);
    expect(screen.getByText('Bulk Upload Parking Passes')).toBeInTheDocument();
    expect(screen.getByTestId('file-upload-zone')).toBeInTheDocument();
    expect(screen.queryByTestId('preview-table')).not.toBeInTheDocument();
    expect(screen.queryByTestId('processing-status')).not.toBeInTheDocument();
    expect(screen.queryByText('Process File')).not.toBeInTheDocument();
  });

  it('shows preview and processing sections when a file is accepted', () => {
    render(<CSVUploadForm />);
    fireEvent.click(screen.getByTestId('accept-file'));
    expect(screen.getByTestId('preview-table')).toBeInTheDocument();
    expect(screen.getByTestId('processing-status')).toBeInTheDocument();
    expect(screen.getByText('Process File')).toBeInTheDocument();
    expect(screen.getByText('Process File')).toBeEnabled();
  });

  it('displays an error message when a file is rejected', () => {
    render(<CSVUploadForm />);
    fireEvent.click(screen.getByTestId('reject-file'));
    expect(screen.getByText('Please upload a valid CSV file')).toBeInTheDocument();
    expect(screen.queryByTestId('preview-table')).not.toBeInTheDocument();
    expect(screen.queryByText('Process File')).not.toBeInTheDocument();
  });

  it('clears the selected file and error when clear button is clicked', () => {
    render(<CSVUploadForm />);
    // Accept a file first
    fireEvent.click(screen.getByTestId('accept-file'));
    expect(screen.getByTestId('preview-table')).toBeInTheDocument();
    // Click clear
    fireEvent.click(screen.getByText('Clear'));
    expect(screen.queryByTestId('preview-table')).not.toBeInTheDocument();
    expect(screen.queryByText('Please upload a valid CSV file')).not.toBeInTheDocument();
     // Process file button should not be visible, or if visible, it should be disabled.
    // Depending on implementation, the entire block containing these might disappear.
    // For this test, we'll assume the block disappears.
    expect(screen.queryByText('Process File')).not.toBeInTheDocument();
  });

  it('calls onSubmit when "Process File" is clicked with a selected file', () => {
    const handleSubmit = vi.fn();
    render(<CSVUploadForm onSubmit={handleSubmit} />);
    fireEvent.click(screen.getByTestId('accept-file')); // Select a file
    fireEvent.click(screen.getByText('Process File'));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith(expect.any(File));
  });

  it('"Process File" button is disabled when isProcessing is true', () => {
    render(<CSVUploadForm isProcessing={true} />);
    fireEvent.click(screen.getByTestId('accept-file')); // Select a file
    expect(screen.getByText('Process File')).toBeDisabled();
  });
  
  it('"Clear" button is disabled when isProcessing is true', () => {
    render(<CSVUploadForm isProcessing={true} />);
    fireEvent.click(screen.getByTestId('accept-file')); // Select a file
    expect(screen.getByText('Clear')).toBeDisabled();
  });

  it('FileUploadZone shows loading when isProcessing is true', () => {
    render(<CSVUploadForm isProcessing={true} />);
    // The mock FileUploadZone shows "Loading..." text when isLoading is true
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
