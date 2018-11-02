import ReduxClient from '@pawjs/redux/client';
import createSagaMiddleware from 'redux-saga';
import mySaga from './app/components/home/saga';

import * as reducers from './app/reducers';
const appInitialState = {};

export default class Client {

    constructor({addPlugin}) {
        const reduxClient = new ReduxClient({addPlugin});
        reduxClient.setReducers(reducers);

        this.sagaMiddleware = createSagaMiddleware();
        reduxClient.addMiddleware(this.sagaMiddleware);
        addPlugin(reduxClient);
    }

    apply(clientHandler) {
        clientHandler
            .hooks
            .reduxInitialState
            .tapPromise("ReduxInitialState", async ({getInitialState, setInitialState}) => {
                const initialState = Object.assign({}, getInitialState(), appInitialState);
                setInitialState(initialState);
            });

        clientHandler
            .hooks
            .beforeRender
            .tapPromise("RunSagaMiddleware", async () => {
                return this.sagaMiddleware.run(mySaga);
            });
    }
}
