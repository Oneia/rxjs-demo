import * as Rxjs from 'rxjs';

import {DataService} from '../sevices/service';
import {UtilsService} from '../sevices/utils';

export class Sidebar {
  constructor() {
    this.initInternal();
  }

  initInternal() {
    this.service = new DataService();

    this.body = document.body;
    this.toggle = UtilsService.loadElement('toggle');
    
    this.service.state
      .subscribe(({showPage}) => this.toggleStatusShowPage(showPage));

    Rxjs.Observable.fromEvent(this.toggle, 'click')
      .subscribe(() => this.service.setPageState(!this.showPage ))
  }

  toggleStatusShowPage(val) {
    this.showPage = val;
    this.body.style.backgroundColor = val && 'rgba(0, 0, 0, .3)' || '#fff';
    this.toggle.innerText = val && 'off' || 'on';
  }
}