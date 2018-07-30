import { Component, OnInit } from '@angular/core';
import { UserVehicle } from '../../../models/app.models';
import { TechdevsAccountService } from '../../../services/techdevs-account.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'my-vehicle',
  templateUrl: './my-vehicle.page.html',
  styleUrls: ['./my-vehicle.page.scss'],
})
export class MyVehiclePage implements OnInit {

  loading: boolean;
  vehicle: UserVehicle;
  registration: string;

  constructor(
    private accountService: TechdevsAccountService,
    private route: ActivatedRoute
  ) {
    this.registration = this.route.snapshot.params['registration'];
    console.log("registration ", this.registration);
  }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.loading = true;
    const profile = await this.accountService.getUserProfile().toPromise();
    this.vehicle = profile.userData.myVehicles.filter(v => v.registration === this.registration)[0];
    console.log("Vehicle", this.vehicle);
    this.loading = false;
  }

}
