import * as Rxjs from 'rxjs';

import { DataService } from '../sevices/service';
import * as Constants from '../sevices/constants';
import { UtilsService } from '../sevices/utils';

export class App {
  constructor() {
    this.initInternal();
  }
  
  initInternal() {
    this.service = new DataService();
    this.service.state
      .filter(() => !!this.result)
      .subscribe(res => this.updateCount(res.count));

    this.plus = UtilsService.loadElement('plus');
    this.minus = UtilsService.loadElement('minus');

    this.result = UtilsService.loadElement('result');

    /*
      Plus action
     */
    Rxjs.Observable
      .combineLatest(
        Rxjs.Observable.fromEvent(this.plus, 'click')
          .startWith(true),
        Rxjs.Observable.fromEvent(document, 'keydown')
          .filter(event => event.keyCode === 187)
          .startWith(true))
      .subscribe(() => this.service.setCountState('decrease'));

    /*
      Minus action
     */
    Rxjs.Observable
      .combineLatest(
        Rxjs.Observable.fromEvent(document, 'keydown')
          .filter(event => event.keyCode === 189)
          .startWith(true),
        Rxjs.Observable.fromEvent(this.minus, 'click')
          .startWith(true))
      .subscribe(() => this.service.setCountState(Constants.INCREASE));
  }

  updateCount(res) {
    this.result.innerText = `Result ${res}`;
  }
}