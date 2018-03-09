import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  observable$: Observable<any>;
  subscription: Subscription;

  ngOnInit () {
    this.observable$ = Observable.create((observer) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();
    });

    this.subscription = this.observable$.subscribe(
      value => console.log(value),
      err => { },
      () => console.log('this is the end')
    );
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }
}
