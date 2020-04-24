import { combineReducers } from 'redux';
import { categoryReducer } from './modules/category';
import { providerReducer } from './modules/provider';

export const rootReducer = combineReducers({
    category: categoryReducer,
    provider: providerReducer
});

export type RootState = ReturnType<typeof rootReducer>;