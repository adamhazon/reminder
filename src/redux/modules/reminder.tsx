import { Dispatch, AnyAction } from 'redux';
import { Category } from '../api';
import { typedAction } from '../typedAction';
import moment from 'moment';

export interface ReminderState {
    title: string;
    category?: Category;
    provider: string;
    endDate: string;
    notice?: string;
  }

const initialState: ReminderState = {
    title: '',
    category: undefined,
    provider: '',
    endDate: moment().format(),
    notice: undefined
}

const createReminderSuccess = (payload: ReminderState) => (
    typedAction('reminder/CREATE', payload)
);

// Store the reminder in reminder state
export const createReminder = (reminder: ReminderState) => {
    return (dispatch: Dispatch<AnyAction>) => {
        dispatch(createReminderSuccess(reminder));
    };
}

type ReminderAction = ReturnType<typeof createReminderSuccess>;

// Reminder reducer
export const reminderReducer = (
    state = initialState,
    action: ReminderAction
): ReminderState => {
    switch (action.type) {
        case 'reminder/CREATE':
            return {
                ...action.payload
            };
        default:
            return state;
    }
}
