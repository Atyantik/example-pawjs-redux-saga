import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { decrementCounter, incrementCounter } from './actions';
import styles from './home.css';

export default @connect(state => ({
  counterValue: _.get(state.counter, 'count', 0),
}))
class Home extends Component {
    static propTypes = {
      dispatch: PropTypes.func,
      counterValue: PropTypes.number,
    };

    static defaultProps = {
      dispatch: () => {},
      counterValue: 0,
    };

    incrementCounter(e) {
      const { dispatch } = this.props;
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      dispatch(incrementCounter());
    }

    asyncCounter(e, type) {
      const { dispatch } = this.props;
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      dispatch({ type });
    }

    decrementCounter(e) {
      const { dispatch } = this.props;
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      dispatch(decrementCounter());
    }

    render() {
      const { counterValue } = this.props;
      return (
        <div className={styles.container}>
          <div className={styles.mw850}>
            <h1 className={styles.title}>Redux counter</h1>
            <div className={styles.row}>
              <div className={styles.col6md}>
                <div className={styles.row}>
                  <div className={styles.col6}>
                    <div>
                      <button type="button" onClick={e => this.incrementCounter(e)} className={styles.btn}>
                                            Increment sync counter
                      </button>
                    </div>
                    <div>
                      <button type="button" onClick={e => this.asyncCounter(e, 'INCREMENT_ASYNC')} className={styles.btn}>
                                            Increment async counter
                      </button>
                    </div>
                  </div>
                  <div className={styles.col6}>
                    <div>
                      <button type="button" onClick={e => this.decrementCounter(e)} className={styles.btn}>
                                            Decrement sync counter
                      </button>
                    </div>
                    <div>
                      <button type="button" onClick={e => this.asyncCounter(e, 'DECREMENT_ASYNC')} className={styles.btn}>
                                            Decrement async counter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.col6md}>
                <div className={styles.value}>
                  {counterValue}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.mt}>
            <a
              href="https://github.com/Atyantik/example-pawjs-redux-saga.git"
              className={classNames(styles.btn, styles.black)}
            >
                        View source code
            </a>
          </div>
        </div>
      );
    }
}
