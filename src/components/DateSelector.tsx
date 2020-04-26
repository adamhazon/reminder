import React, { Fragment, useState } from 'react';
import { Label,Segment, Dropdown, DropdownProps, DropdownItemProps } from 'semantic-ui-react';
import moment from 'moment';

interface Props {
  date: string;
  updateDate: Function;
}

interface State {
  days: DropdownItemProps[];
  months: DropdownItemProps[];
  years: DropdownItemProps[];
}

const DateSelector: React.FC<Props> = ({ date, updateDate }) => {
  const today = moment();

  // Create a list of days depending on selected month
  const createDays = (dateString: string) => {
    const items: DropdownItemProps[] = [];
    const date = moment(dateString).date(1);
    const month = date.month();

    while (month === date.month()) {
      items.push({ text: date.date(), value: date.date() });
      date.add(1, 'days');
    }

    return items;
  }

  // Create a list of months
  const createMonths = () => {
    const items: DropdownItemProps[] = [];

    for (let i = 0; i < 12; i++) {
      items.push({ text: moment().month(i).format('MMMM'), value: i });
    }

    return items;
  }

  // Create a list of years (10 years from now)
  const createYears = () => {
    const items: DropdownItemProps[] = [];

    for (let i = today.year(); i < today.year()+11; i++) {
      items.push({ text: i, value: i });
    }

    return items;
  }

  // Initial local state
  const [state, setState] = useState<State>({
    days: createDays(today.format()),
    months: createMonths(),
    years: createYears()
  });

  // ***
  const handleDateChange = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    const tempDate = moment(date);

    switch (data.id) {
      case 'day':
        tempDate.date(Number(data.value));
        break;
      case 'month':
        tempDate.month(Number(data.value));
        break;
      case 'year':
        tempDate.year(Number(data.value));
        break;
    }

    // Update parent state
    updateDate(tempDate.format());

    setState({
      ...state,
      days: createDays(tempDate.format()) // Update list of days in case the month changed
    });
  }

  return (
    <Fragment>
      <Label ribbon color='teal' className='ribbonLabel'>Contract end date</Label>
      <Segment.Group horizontal className='endDateWrapper'>

        <Segment className='endDateSegment'>
          <Dropdown
            id='day'
            className='endDateField'
            fluid
            floating
            selection
            placeholder='Day...'
            options={state.days}
            onChange={handleDateChange}
            value={moment(date).date()}
          />
        </Segment>
        <Segment className='endDateSegment'>
          <Dropdown
            id='month'
            className='endDateField'
            fluid
            floating
            selection
            placeholder='Month...'
            options={state.months}
            onChange={handleDateChange}
            value={moment(date).month()}
          />
        </Segment>
        <Segment className='endDateSegment'>
          <Dropdown
            id='year'
            className='endDateField'
            fluid
            floating
            selection
            placeholder='Year...'
            options={state.years}
            onChange={handleDateChange}
            value={moment(date).year()}
          />
        </Segment>
      </Segment.Group>
    </Fragment>
  );
}

export default DateSelector;