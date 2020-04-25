import React from 'react';
import { Container, Header, Icon, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

export const ReminderDetails = () => {
    const history = useHistory();

    return (
        <div className='pageWrapper'>
            <Container text>

                <Header className='uppercase' icon textAlign='center'>
                <Icon name='bell' />
                Reminder details
                </Header>

                <Button 
                    icon 
                    labelPosition='left' 
                    primary 
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
