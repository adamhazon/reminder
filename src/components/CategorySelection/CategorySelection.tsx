import React, { Fragment, useState } from 'react';
import { CategoryGroup, Category } from '../../redux/api';
import { Form, Accordion, Card, Icon, AccordionTitleProps } from 'semantic-ui-react';
import CreateCategories from './CreateCategories';

interface Props {
    categoriesGrouped: CategoryGroup[];
    setCategory: Function;
    selected?: Category;
}

interface State {
    activeIndex: string | number | undefined;
    showCategories: boolean;
}

const CategorySelection: React.FC<Props> = ({ categoriesGrouped, setCategory, selected }) => {
    const [ state, setState ] = useState<State>({ activeIndex: -1, showCategories: false });
    const { activeIndex } = state;

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, titleProps: AccordionTitleProps) => {
        const { index } = titleProps;
        const newIndex = state.activeIndex === index ? -1 : index;
        setState({
            ...state,
            activeIndex: newIndex
        });
    }

    const toggleCategorySelection = () => {
        console.log('HERE!!');
        setState(prevState => {
            return {
                ...state,
                showCategories: !prevState.showCategories
            }
        });
    }

    const selectCategory = (category: Category) => {
        setCategory(category);
        toggleCategorySelection();
    }

    const createGroups = () => {
        const render: JSX.Element[] = [];
        
        if (categoriesGrouped && categoriesGrouped.length) {
            categoriesGrouped.map((categoryGroup, index) => {
                // Remove duplications
                const categories = categoryGroup.categories.filter((v,i,a) => a.findIndex(t => (t.id === v.id)) === i);
                render.push(
                    <Fragment key={`group_${categoryGroup.group.id}`}>
                        <Accordion.Title
                            active={activeIndex === index}
                            index={index}
                            onClick={handleClick}
                        >
                            <Icon name='dropdown' />
                            {categoryGroup.group.name}
                        </Accordion.Title>
                        <Accordion.Content
                            active={activeIndex === index}
                        >
                            <Card.Group doubling itemsPerRow={4}>
                                <CreateCategories 
                                    groupID={categoryGroup.group.id} 
                                    categories={categories}
                                    selectCategory={selectCategory}
                                    selected={selected}
                                />
                            </Card.Group>
                        </Accordion.Content>
                    </Fragment>
                );
                return categoryGroup;
            });
        }
        
        return render;
    }

    return (
        <Fragment>
            <Form.Field>
                <input 
                    type='text' 
                    name='category' 
                    placeholder='Please choose a category...'
                    onClick={() => {
                        toggleCategorySelection()
                    }}
                    readOnly={true}
                    value={selected ? selected.categoryName : undefined}
                />
            </Form.Field>

            {state.showCategories &&
                <Accordion fluid styled>
                    {createGroups()}
                </Accordion>
            }
        </Fragment>
    );
}

export default CategorySelection;