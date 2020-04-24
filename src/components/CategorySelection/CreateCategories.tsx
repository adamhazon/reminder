import React, { Fragment } from 'react';
import { Category } from '../../redux/api';
import { Card } from 'semantic-ui-react';

interface Props {
    groupID: string;
    categories: Category[];
}

const CreateCategories: React.FC<Props> = ({ groupID, categories }) => {
    const render: JSX.Element[] = [];

    if (categories && categories.length) {
        categories.map((category, index) => {
            render.push(
                <Card raised key={`category_${groupID}_${category.id}_${index}`}>
                    <Card.Content>
                        <Card.Meta textAlign="center">
                            <i className={`categoryIcon category-icon--${category.icon.toLowerCase()}`} />
                        </Card.Meta>
                        <Card.Header className='categoryHeader'>
                            {category.categoryName}
                        </Card.Header>
                    </Card.Content>
                </Card>
            );
            return category;
        });
    }

    return (
        <Fragment>
            {render}
        </Fragment>
    );
}

export default CreateCategories;