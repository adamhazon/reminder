import React, { useState, useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Container, Header, Icon, Form } from 'semantic-ui-react';

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
}

interface State {
  form: ReminderForm;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const UnconnectedReminderCreation: React.FC<Props> = ({ getCategoriesGrouped, getProviders, categoriesGrouped, providers }) => {
  const [state, setState] = useState<State>({
    form: {
      title: '',
      category: undefined
    }
  });

  useEffect(() => {
    if (categoriesGrouped.length === 0) {
      getCategoriesGrouped();
    }
    if (providers.length === 0) {
      getProviders('016f388e-bcf7-410b-9ebd-08ff91484ec6');
    }
  }, [getCategoriesGrouped, getProviders, categoriesGrouped, providers]);

  const setCategory = (category: Category) => {
    setState({
      ...state,
      form: {
        ...state.form,
        category
      }
    });
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

        <Header as='h2' className='uppercase'>
          <Icon name='bell outline' />
          <Header.Content>Add a reminder</Header.Content>
        </Header>

        <Form>
          <Form.Field>
            <input 
                type='text' 
                name='title'
                value={form.title}
                placeholder='Title...' 
                onChange={handleTextInputChange}
            />
          </Form.Field>
          
          <CategorySelection 
            categoriesGrouped={categoriesGrouped} 
            setCategory={setCategory}
            selected={form.category}
          />
        </Form>

      </Container>
    </div>
  );
}

export const ReminderCreation = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedReminderCreation);
