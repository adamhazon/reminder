import React, { useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { RootState } from './redux';
import { getCategoriesGrouped } from './redux/modules/category';
import { getProviders } from './redux/modules/provider';

// semantic-ui-react imports
import { Container, Header, Icon, Form } from 'semantic-ui-react';

import './App.css';

const mapStateToProps = (state: RootState) => ({
  categories: state.category.categories,
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

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const UnconnectedApp: React.FC<Props> = ({ getCategoriesGrouped, getProviders, categories, providers }) => {

  useEffect(() => {
    if (categories.length === 0) {
      getCategoriesGrouped();
    }
    if (providers.length === 0) {
      getProviders('016f388e-bcf7-410b-9ebd-08ff91484ec6');
    }
  }, [getCategoriesGrouped, getProviders, categories, providers]);

  return (
    <div className='App'>
      <Container text>

        <Header as='h2'>
          <Icon name='plus' />
          <Header.Content>Add a reminder</Header.Content>
        </Header>

        {/* <i className='gas' /> */}
        
        <Form>
          <Form.Field>
            <input type='text' name='title' placeholder='Title' />
          </Form.Field>
        </Form>

      </Container>
    </div>
  );
}

export const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedApp);
