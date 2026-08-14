import { render, screen } from '@testing-library/react';
import App from './App';

test('renders attendance dashboard', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /hệ thống quản lý điểm danh lớp học/i })).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/tìm kiếm theo tên sinh viên/i)).toBeInTheDocument();
});
