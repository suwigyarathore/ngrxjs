import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  observable$: Observable<any>;
  subject$: Subject<any>;
  replaySubject$: ReplaySubject<any>;
  subscription: Subscription;
  subjectSubscription: Subscription;
  replaySubjectSubscription: Subscription;

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

    this.subject$ = new Subject();
    this.subjectSubscription = this.subject$.subscribe(x => console.log('Subject Subscription', x));
    this.subject$.next(1);
    this.subject$.next(4);


    this.replaySubject$ = new ReplaySubject();
    this.replaySubjectSubscription = this.replaySubject$.subscribe(x => console.log('Replay Subject Subscription', x));
    this.replaySubject$.next(1);
    this.replaySubject$.next(4);
    this.replaySubject$.subscribe(x => console.log('Replay Subject Second Subscription', x));
    this.replaySubject$.next(20);

    //this.takeOperator();
    //this.mapOperator();
    //this.filterOperator();
    //this.mergeOperator();
    this.switchMapOperator();
  }

  takeOperator () {
    const numbers$ = Observable.interval(1000).take(5);
    numbers$.subscribe(x => console.log(x));
  }

  mapOperator () {
    const numbers$ = Observable.interval(1000);
    numbers$
      .take(5)
      .map(x => x * 10)
      .subscribe(x => console.log(x));
  }

  filterOperator () {
    const numbers$ = Observable.interval(1000);
    numbers$
      .take(5)
      .filter(x => x % 2 === 0)
      .subscribe(x => console.log(x));
  }

  mergeOperator () {
    const numbers$ = Observable.interval(1000);
    const letters$ = Observable.of('a', 'b', 'c', 'd', 'e');
    letters$.mergeMap(x => numbers$.take(5).map(i => i + x))
      .subscribe(x => console.log(x));
  }

  switchMapOperator () {
    const numbers$ = Observable.interval(1000);
    const letters$ = Observable.of('a', 'b', 'c', 'd', 'e');
    letters$.switchMap(x => numbers$.take(5).map(i => i + x))
      .subscribe(x => console.log(x));
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
    this.subjectSubscription.unsubscribe();
  }
}
