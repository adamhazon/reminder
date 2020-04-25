import { combineReducers } from 'redux';
import { categoryReducer } from './modules/category';
import { providerReducer } from './modules/provider';
import { reminderReducer } from './modules/reminder';

export const rootReducer = combineReducers({
    category: categoryReducer,
    provider: providerReducer,
    reminder: reminderReducer
});

export type RootState = ReturnType<typeof rootReducer>;