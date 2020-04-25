import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Icon, Button, Item, Divider } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import { RootState } from '../redux';
import moment from 'moment';

const mapStateToProps = (state: RootState) => ({
    reminder: state.reminder
});

type Props = ReturnType<typeof mapStateToProps>;

const UnconnectedReminderDetails: React.FC<Props> = ({ reminder }) => {
    const history = useHistory();

    return (
        <div className='pageWrapper'>
            <Container text>

                <Header className='uppercase' icon textAlign='center'>
                    <Icon name='bell' />
                    Reminder details
                </Header>

                <Divider />



                <Item.Group>
                    <Item>
                        <Item.Content>
                            <Item.Header>{reminder.title}</Item.Header>
                            <Divider />
                            <Item.Meta>Category</Item.Meta>
                            <Item.Header>{reminder.category?.categoryName}</Item.Header>
                            <Divider />
                            <Item.Meta>Provider</Item.Meta>
                            <Item.Header>{reminder.provider}</Item.Header>
                            <Divider />
                            <Item.Meta>Contract end date</Item.Meta>
                            <Item.Header>{moment(reminder.endDate).format('dddd, MMMM Do YYYY')}</Item.Header>
                            
                            <Item.Extra>{reminder.notice}</Item.Extra>
                        </Item.Content>
                    </Item>
                </Item.Group>
                    
                <Button 
                    icon 
                    labelPosition='left' 
                    secondary 
                    floated='left'
                    onClick={() => history.push("/")}
                >
                    Back
                    <Icon name='arrow left' />
                </Button>

            </Container>
        </div>
    );
}

export const ReminderDetails = connect(
    mapStateToProps
)(UnconnectedReminderDetails);