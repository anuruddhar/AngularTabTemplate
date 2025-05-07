import { Component, OnInit } from '@angular/core';
import { SwUpdate, VersionReadyEvent  } from '@angular/service-worker';
import { ConfirmationService } from 'primeng/api';
import { CheckForUpdateService } from './core/services/check-for-update.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(
        private swUpdate: SwUpdate,
        private checkForUpdateService: CheckForUpdateService,
        private confirmationService: ConfirmationService) { }

    ngOnInit() {
        // this.swUpdate.available
        //     .subscribe(update => {
        //         this.confirmationService.confirm({
        //             message: 'New version found! May I reload to fetch the new version?',
        //             accept: () => {
        //                 this.swUpdate.activateUpdate().then(() => document.location.reload());
        //             }
        //         });
        //     });

            this.swUpdate.versionUpdates.pipe(
                //filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')
              ).subscribe(event => {
                this.confirmationService.confirm({
                    message: 'New version found! May I reload to fetch the new version?',
                    accept: () => {
                        this.swUpdate.activateUpdate().then(() => document.location.reload());
                    }
                });
              });
    }
}
