import * as Rxjs from 'rxjs';

import service from '../sevices/service';
import * as Constants from '../sevices/constants';
import { UtilsService } from '../sevices/utils';

export class App {
  constructor() {
    this.initInternal();
  }
  
  initInternal() {
    this.service = service;
    this.service.state
      .filter(() => !!this.result)
      .subscribe(res => {
        console.log(res);
        this.updateCount(res.count)
      });

    this.plus = UtilsService.loadElement('plus');
    this.minus = UtilsService.loadElement('minus');

    this.result = UtilsService.loadElement('result');
    
    
    // test
    
    // const trend = new Rxjs.BehaviorSubject(true);
    // console.log(1);
    // trend
    //   .debounceTime(0)
    //   .subscribe((res) => console.log(res));
    // Rxjs.Observable
    //   .interval(2000)
    //   .subscribe((res) => console.log(res, 'rxjs'));

    // let count = 0;
    // setInterval(() => count++, 2000);
    // setInterval(() => console.log(count, 'setinterval'), 2004);
    
    console.log(1);
    this.service.state
      .subscribe(res => console.log(22))
    Rxjs.Observable.fromPromise(Promise.resolve(true))
      .startWith(2)
      .subscribe(() => console.log(2))
    // Promise.resolve(true)
    //   .then(() => console.log(2));
    console.log(3);
    /*
      Plus action
     */
    Rxjs.Observable
      .combineLatest(
        Rxjs.Observable.fromEvent(this.plus, 'click')
          .startWith(true),
        Rxjs.Observable.fromEvent(document, 'keydown')
          .filter(event => event.keyCode === 187 || event.keyCode === 109)
          .startWith(true))
      .subscribe(() => this.service.setCountState('decrease'));

    /*
      Minus action
     */
    Rxjs.Observable
      .combineLatest(
        Rxjs.Observable.fromEvent(document, 'keydown')
          .filter(event => event.keyCode === 189 || event.keyCode === 107)
          .startWith(true),
        Rxjs.Observable.fromEvent(this.minus, 'click')
          .startWith(true))
      .subscribe(() => this.service.setCountState(Constants.INCREASE));
  }

  updateCount(res) {
    this.result.innerText = `Result ${res}`;
  }
}