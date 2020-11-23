import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { debounceTime } from 'rxjs/operators';
import { AlertService } from '@app/_services';

@Component({ selector: 'alert', templateUrl: 'alert.component.html' })
export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.getAlert$()
            .subscribe(message => {
                this.message = message;
            });

        this.subscription = this.alertService.getAlert$()
            .pipe(
                debounceTime(5000)
            )
            .subscribe(() => { this.message = null });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}