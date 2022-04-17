import { connect, ConnectedProps as _connectedProps } from 'react-redux';
import { Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { createStore, combineReducers } from 'redux';
export type ConnectedProps<TConnector> = _connectedProps<TConnector>;
const staticReducers = {
  App: (state: any = null, action: any) => {
    return state;
  }
};
const appAsyncReducers: Partial<Record<string, (state: Record<string, unknown>, action: Record<string, unknown>) => Record<string, unknown>>> = {};
function createReducer(asyncReducers?: any) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers
  });
}

function getAppStore() {
  const store = createStore(createReducer());
  return {
    ...store,
    injectReducer: (key: string, asyncReducer: any) => {
      appAsyncReducers[key] = asyncReducer;
      store.replaceReducer(createReducer(appAsyncReducers));
    }
  };
}
/** 全局Store，在入口处初始化引用 */
export const AppStore = getAppStore();
/**
 * @description:
 * @param {String} pageName 页面名称，作为页面key使用，不同页面不要使用相同的名称;
 * @param {IOwnState} initPageState 初始化页面redux状态
 * @param {IMapReducer} reducers 页面的redux reducer对象
 * @return {*}
 */

export function CreatePageSliceStoreConnector<State, CaseReducers extends SliceCaseReducers<State>, Name extends string>(pageSlice: Slice<State, CaseReducers, Name>) {
  AppStore.injectReducer(pageSlice.name, pageSlice.reducer);
  const mapStateToProps = (state: any) => {
    return state[pageSlice.name] as State;
  };
  const mapDispatchToProps = (dispatch: any) => {
    return {
      ...pageSlice.actions,
      dispatch
    };
  };
  return connect(mapStateToProps, mapDispatchToProps);
}
