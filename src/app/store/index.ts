import { ActionReducerMap } from '@ngrx/store'
import { LayoutState, layoutReducer } from './layout/layout-reducers'
import {
  calendarReducer,
  type CalendarState,
} from './calendar/calendar.reducer'
import {authenticationReducer, AuthenticationState} from "./authentication/authentication.reducer";
import {CartState} from "./cart/cart.state";
import {cartReducer} from "./cart/cart.reducer";

export interface RootReducerState {
  layout: LayoutState
  Calendar: CalendarState
  authentication: AuthenticationState
  cart:CartState
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  layout: layoutReducer,
  Calendar: calendarReducer,
  authentication: authenticationReducer,
  cart:cartReducer
}
