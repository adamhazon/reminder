import React, { useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Container, Header, Icon, Form } from 'semantic-ui-react';

import { RootState } from '../../redux';
import { getCategoriesGrouped } from '../../redux/modules/category';
import { getProviders } from '../../redux/modules/provider';

import CategorySelection from '../../components/CategorySelection/CategorySelection';

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

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const UnconnectedReminderCreation: React.FC<Props> = ({ getCategoriesGrouped, getProviders, categoriesGrouped, providers }) => {

  useEffect(() => {
    if (categoriesGrouped.length === 0) {
      getCategoriesGrouped();
    }
    if (providers.length === 0) {
      getProviders('016f388e-bcf7-410b-9ebd-08ff91484ec6');
    }
  }, [getCategoriesGrouped, getProviders, categoriesGrouped, providers]);

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
                placeholder='Title...' 
            />
          </Form.Field>
          
          <CategorySelection categoriesGrouped={categoriesGrouped} />
        </Form>

      </Container>
    </div>
  );
}

export const ReminderCreation = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedReminderCreation);
