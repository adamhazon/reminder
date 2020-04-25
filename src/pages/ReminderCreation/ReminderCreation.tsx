import React, { useState, useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Container, Header, Icon, Form, Label, Button, 
  Segment, Dropdown, DropdownProps, DropdownItemProps 
} from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import { RootState } from '../../redux';
import { getCategoriesGrouped } from '../../redux/modules/category';
import { getProviders } from '../../redux/modules/provider';

import CategorySelection from '../../components/CategorySelection/CategorySelection';
import { Category } from '../../redux/api';

import moment from 'moment';

const mapStateToProps = (state: RootState) => ({
  categoriesGrouped: state.category.grouped,
  providers: state.provider.providers,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getCategoriesGrouped,
      getProviders
    },
    dispatch
  );
};

interface ReminderForm {
  title: string;
  category?: Category;
  provider: string;
  endDate: string;
  notice?: number;
}

interface State {
  form: ReminderForm;
  days: DropdownItemProps[];
  months: DropdownItemProps[];
  years: DropdownItemProps[];
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const UnconnectedReminderCreation: React.FC<Props> = ({ getCategoriesGrouped, getProviders, categoriesGrouped, providers }) => {
  const history = useHistory();
  const today = moment();

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

  const createMonths = () => {
    const items: DropdownItemProps[] = [];
    
    for (let i = 0; i < 12; i++) {
      items.push({ text: moment().month(i).format('MMMM'), value: i });
    }

    return items;
  }

  const createYears = () => {
    const items: DropdownItemProps[] = [];
    
    for (let i = today.year(); i < today.year()+11; i++) {
      items.push({ text: i, value: i });
    }

    return items;
  }

  const [state, setState] = useState<State>({
    form: {
      title: '',
      category: undefined,
      provider: '',
      endDate: today.format(),
      notice: undefined
    },
    days: createDays(today.format()),
    months: createMonths(),
    years: createYears()
  });

  const noticeOptions = [
    { value: 0, text: 'No notice' },
    { value: 1, text: '1 month notice' },
    { value: 2, text: '2 months notice' },
    { value: 3, text: '3 months notice' },
  ];

  const {form} = state;

  useEffect(() => {
    if (categoriesGrouped.length === 0) {
      getCategoriesGrouped();
    }
  }, [getCategoriesGrouped, getProviders, categoriesGrouped, providers]);

  const setCategory = (category: Category) => {
    setState(prevState => {
      return {
        ...state,
        form: {
          ...state.form,
          category,
          provider: prevState.form.category 
                    && prevState.form.category.id === category.id 
                    ? prevState.form.provider : ''
        }
      }
    });
    getProviders(category.id);
  }

  const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setState({
        ...state,
        form: {
          ...form,
          [name]: value
        }
    });
  }

  const handleDateChange = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
    const date = moment(form.endDate);

    switch (data.id) {
      case 'day':
        date.date(Number(data.value));
        break;
      case 'month':
        date.month(Number(data.value));
        break;
      case 'year':
        date.year(Number(data.value));
        break;
    }

    setState({
        ...state,
        form: {
          ...form,
          endDate: date.format()
        },
        days: createDays(date.format())
    });
  }

  return (
    <div className='pageWrapper'>
      <Container text>

        <Header className='uppercase' icon textAlign='center'>
          <Icon name='bell outline' />
          Create a reminder
        </Header>

        <Form>
          <Form.Field>
            <Label ribbon color='purple' className='ribbonLabel'>Title</Label>
            <Form.Input
              type='text' 
              name='title'
              value={form.title}
              placeholder='Describe your reminder...' 
              onChange={handleTextInputChange}
            />
          </Form.Field>
          
          <CategorySelection 
            categoriesGrouped={categoriesGrouped} 
            setCategory={setCategory}
            selected={form.category}
          />

          <Form.Field>
            <Label ribbon color='orange' className='ribbonLabel'>Provider</Label>
            <Form.Dropdown
              fluid
              search
              selection
              placeholder='Choose a provider...'
              noResultsMessage='Please select a category first'
              options={providers.map((provider) => {
                return {
                  text: provider.company.companyName,
                  value: provider.company.companyName
                };
              })}
              onChange={(e, data) => setState({
                ...state,
                form: {
                  ...form,
                  provider: String(data.value)
                }
              })}
              value={form.provider}
            />
          </Form.Field>

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
                value={moment(form.endDate).date()}
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
                value={moment(form.endDate).month()}
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
                value={moment(form.endDate).year()}
              />
            </Segment>
          </Segment.Group>

          <Form.Field>
            <Label ribbon color='yellow' className='ribbonLabel'>Notice period (optional)</Label>
            <Form.Dropdown
              fluid
              selection
              placeholder='What is the notice period?'
              options={noticeOptions}
              onChange={(e, data) => setState({
                ...state,
                form: {
                  ...form,
                  notice: Number(data.value)
                }
              })}
              value={form.notice}
            />
          </Form.Field>

          <Button 
            icon 
            labelPosition='right' 
            primary 
            floated='right'
            onClick={() => history.push("/ReminderDetails")}
          >
            Next
            <Icon name='arrow right' />
          </Button>
        </Form>

      </Container>
    </div>
  );
}

export const ReminderCreation = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedReminderCreation);
