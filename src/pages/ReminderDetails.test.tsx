import React from 'react';
import { render } from '@testing-library/react';
import { UnconnectedReminderDetails } from './ReminderDetails';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn()
  })
}));

const reminder = {
  title: 'My reminder',
  category: {
    id: '1',
    icon: 'category-icon--car-sharing',
    categoryName: 'Car sharing'
  },
  provider: 'DriveNow',
  endDate: '2020-04-26T13:00:38+02:00',
  notice: '3 months notice'
}

describe('ReminderDetails', () => {

  it('renders correctly', () => {
    const { getByText } = render(<UnconnectedReminderDetails reminder={reminder} />);
    const header = getByText(/Reminder details/i);
    const title = getByText(/My reminder/i);
    const category = getByText(/Car sharing/i);
    const provider = getByText(/DriveNow/i);
    const endDate = getByText(/Sunday, April 26th 2020/i);
    const notice = getByText(/3 months notice/i);
  
    expect(header).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(provider).toBeInTheDocument();
    expect(endDate).toBeInTheDocument();
    expect(notice).toBeInTheDocument();
  })
});
