import * as Rxjs from 'rxjs';

class App {
  constructor() {
    this.initInternal();
  }
  
  initInternal() {
    this.count = 1;

    this.plus = this.loadElement('plus');
    this.minus = this.loadElement('minus');

    this.decrease();

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
      .subscribe(() => this.increase());

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
      .subscribe(() => this.decrease());
  }

  increase() {
    this.loadElement('result').innerText = `Result ${++this.count}`;
  }

  decrease() {
    this.loadElement('result').innerText = `Result ${--this.count}`;
  }
  
  loadElement(id) {
    return document.getElementById(id);
  }
}

new App();