import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as Constants from './constants';


const initState = {
  showPage: false,
  count: 0,
};

export class DataService {
  constructor() {

    this.init();
  }

  init() {
    this._state = new BehaviorSubject(initState);
  }

  setPageState(val) {
    this._state.next(
        {
          ...this._state.getValue(),
          showPage: val
        }
      );
  }

  setCountState(type) {
    this._state.next(
        {
          ...this._state.getValue(),
          count: type === Constants.INCREASE ? ++this._state.getValue().count : --this._state.getValue().count,
        }
      );
  }

  get state() {
    return this._state.asObservable();
  }
}