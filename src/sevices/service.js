import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as Constants from './constants';


const initState = {
  showPage: false,
  count: 0,
};

class DataService {
  constructor() {

    this.init();
  }

  init() {
    this._state = new BehaviorSubject(initState);
    // this.test = new Subject()
    // this.test.next('tr');
    //
    // this.test.subscribe((res) => console.log(res));
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

export default new DataService();