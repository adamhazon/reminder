import { Dispatch, AnyAction } from 'redux';
import { API, Provider } from '../api';
import { http, HttpResponse } from '../http';
import { typedAction } from '../typedAction';

type ProviderState = {
    loading: boolean;
    providers: Provider[];
    errors?: Error
};

const initialState: ProviderState = {
    loading: false,
    providers: [],
    errors: undefined
}

const fetchProviders = () => (
    typedAction('provider/FETCH_REQUEST')
);

const fetchProvidersSuccess = (payload: Provider[]) => (
    typedAction('provider/FETCH_SUCCESS', payload)
);

const fetchProvidersError = (error: Error) => (
    typedAction('provider/FETCH_ERROR', {error})
);

export const getProviders = (id: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(fetchProviders());

        let response: HttpResponse<Provider[]>;

        try {
            response = await http<Provider[]>(API.Provider.replace(':id', id));
            if (response.parsedBody)
                dispatch(fetchProvidersSuccess(response.parsedBody));
        }
        catch (error) {
            dispatch(fetchProvidersError(error));
        }
    };
};

type ProviderAction = ReturnType<typeof fetchProviders | typeof fetchProvidersSuccess | typeof fetchProvidersError>;

export const providerReducer = (
    state = initialState,
    action: ProviderAction
): ProviderState => {
    switch (action.type) {
        case 'provider/FETCH_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'provider/FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                providers: action.payload,
                errors: undefined
            }
        case 'provider/FETCH_ERROR':
            return {
                ...state,
                loading: false,
                errors: action.payload.error
            }
        default:
            return state;
    }
}