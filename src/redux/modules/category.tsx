import { Dispatch, AnyAction } from 'redux';
import { API, Category, CategoryGroup } from '../api';
import { http, HttpResponse } from '../http';
import { typedAction } from '../typedAction';

type CategoryState = {
    loading: boolean;
    categories: Category[];
    grouped: CategoryGroup[];
    errors?: Error
};

const initialState: CategoryState = {
    loading: false,
    categories: [],
    grouped: [],
    errors: undefined
}

const fetchCategories = () => (
    typedAction('category/FETCH_REQUEST')
);

const fetchCategoriesSuccess = (payload: Category[]) => (
    typedAction('category/FETCH_SUCCESS', payload)
);

const fetchCategoriesGroupedSuccess = (payload: CategoryGroup[]) => (
    typedAction('categoryGroup/FETCH_SUCCESS', payload)
);

const fetchCategoriesError = (error: Error) => (
    typedAction('category/FETCH_ERROR', {error})
);

// Return an array of all categories
export const getCategories = () => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(fetchCategories());

        let response: HttpResponse<Category[]>;

        try {
            response = await http<Category[]>(API.Category);
            if (response.parsedBody)
                dispatch(fetchCategoriesSuccess(response.parsedBody));
        }
        catch (error) {
            dispatch(fetchCategoriesError(error));
        }
    };
};

// Return categories divided by groups
export const getCategoriesGrouped = () => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(fetchCategories());

        let response: HttpResponse<CategoryGroup[]>;

        try {
            response = await http<CategoryGroup[]>(API.CategoryGroup);
            if (response.parsedBody)
                dispatch(fetchCategoriesGroupedSuccess(response.parsedBody));
        }
        catch (error) {
            dispatch(fetchCategoriesError(error));
        }
    };
};

type CategoryAction = ReturnType<typeof fetchCategories | typeof fetchCategoriesSuccess | typeof fetchCategoriesGroupedSuccess | typeof fetchCategoriesError>;

// Category reducer
export const categoryReducer = (
    state = initialState,
    action: CategoryAction
): CategoryState => {
    switch (action.type) {
        case 'category/FETCH_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'category/FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                categories: action.payload,
                errors: undefined
            }
        case 'categoryGroup/FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                grouped: action.payload,
                errors: undefined
            }
        case 'category/FETCH_ERROR':
            return {
                ...state,
                loading: false,
                errors: action.payload.error
            }
        default:
            return state;
    }
}