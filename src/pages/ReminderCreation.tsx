import React, { useState, useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { Container, Header, Icon, Form, Label, Button
} from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import { RootState } from '../redux';
import { getCategoriesGrouped } from '../redux/modules/category';
import { getProviders } from '../redux/modules/provider';

import CategorySelection from '../components/CategorySelection';
import DateSelector from '../components/DateSelector';

import { Category } from '../redux/api';
import { createReminder, ReminderState } from '../redux/modules/reminder';

const mapStateToProps = (state: RootState) => ({
  categoriesGrouped: state.category.grouped,
  providers: state.provider.providers,
  providerIsLoading: state.provider.loading,
  reminder: state.reminder
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

interface State {
  form: ReminderState;
  validate: boolean;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const UnconnectedReminderCreation: React.FC<Props> = ({
  getCategoriesGrouped,
  getProviders,
  categoriesGrouped,
  providers,
  providerIsLoading,
  reminder
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  // Initial local state
  const [state, setState] = useState<State>({
    form: reminder,
    validate: false
  });

  // List of notice options
  const noticeOptions = [
    { value: 'No notice', text: 'No notice' },
    { value: '1 month notice', text: '1 month notice' },
    { value: '2 months notice', text: '2 months notice' },
    { value: '3 months notice', text: '3 months notice' },
  ];

  const {form} = state;

  useEffect(() => {
    if (categoriesGrouped.length === 0) {
      getCategoriesGrouped();
    }
  }, [getCategoriesGrouped, getProviders, categoriesGrouped, providers]);

  // Set the selected category in the state & load list of providers
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

  // Update text inputs in state
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

  // update endDate in state
  const setEndDate = (date: string) => {
    setState({
      ...state,
      form: {
        ...form,
        endDate: date
      }
    });
  }

  // Validate reminder inputs
  const reminderValidation = (): boolean => {
    setState({
      ...state,
      validate: true
    });
    return form.title !== '' &&
           form.category !== undefined &&
           form.provider !== '' &&
           form.endDate !== '';
  } 
                                      
  // Handle the click of the next button
  const createReminderHandler = () => {
    if (reminderValidation()) {
      dispatch(createReminder(form));
      history.push("/ReminderDetails")
    }
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
              error={state.validate && !form.title}
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
            error={state.validate && !form.category}
          />

          <Form.Field>
            <Label ribbon color='orange' className='ribbonLabel'>Provider</Label>
            <Form.Dropdown
              error={state.validate && !form.provider}
              fluid
              search
              selection
              loading={providerIsLoading}
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

          <DateSelector date={form.endDate} updateDate={setEndDate} />

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
                  notice: String(data.value)
                }
              })}
              value={form.notice}
            />
          </Form.Field>

          <Button
            icon
            labelPosition='right'
            secondary
            floated='right'
            onClick={createReminderHandler}
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
