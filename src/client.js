import ReduxClient from '@pawjs/redux/client';
import createSagaMiddleware from 'redux-saga';
import mySaga from './app/components/home/saga';

import * as reducers from './app/reducers';

const appInitialState = {};

export default class Client {
  constructor({ addPlugin }) {
    const reduxClient = new ReduxClient({ addPlugin });
    reduxClient.setReducers(reducers);

    this.sagaMiddleware = createSagaMiddleware();
    reduxClient.addMiddleware(this.sagaMiddleware);
    addPlugin(reduxClient);
  }

  trackPageView() {
    const { ga } = window;
    if (typeof ga !== 'undefined' && ga) {
      ga('send', {
        hitType: 'pageview',
        page: window.location.pathname,
      });
    }
  }

  apply(clientHandler) {
    clientHandler
      .hooks
      .reduxInitialState
      .tapPromise('ReduxInitialState', async ({ getInitialState, setInitialState }) => {
        const initialState = Object.assign({}, getInitialState(), appInitialState);
        setInitialState(initialState);
      });

    clientHandler
      .hooks
      .beforeRender
      .tapPromise('RunSagaMiddleware', async () => this.sagaMiddleware.run(mySaga));

    clientHandler.hooks.locationChange.tapPromise('ReInitAds', async () => {
      this.trackPageView();
    });
  }
}
