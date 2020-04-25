import React, { useState, useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Container, Header, Icon, Form, Label, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import { RootState } from '../../redux';
import { getCategoriesGrouped } from '../../redux/modules/category';
import { getProviders } from '../../redux/modules/provider';

import CategorySelection from '../../components/CategorySelection/CategorySelection';
import { Category } from '../../redux/api';

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
}

interface State {
  form: ReminderForm;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const UnconnectedReminderCreation: React.FC<Props> = ({ getCategoriesGrouped, getProviders, categoriesGrouped, providers }) => {
  const history = useHistory();
  const [state, setState] = useState<State>({
    form: {
      title: '',
      category: undefined,
      provider: ''
    }
  });

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

  const {form} = state;

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
              disabled={!providers.length}
              fluid
              search
              selection
              placeholder='Choose a provider...'
              options={providers.map((provider) => {
                return {
                  text: provider.company.companyName,
                  value: provider.company.companyName
                };
              })}
              onChange={(e) => setState({
                ...state,
                form: {
                  ...form,
                  provider: e.currentTarget.innerText
                }
              })}
              value={form.provider}
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
