import { Component, OnInit } from '@angular/core';
import { PackageModel } from 'src/app/interface/user.mode';
import { CommonService } from 'src/app/services/common.service';
import { PackagesService } from '../../services/packages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {
  
  packages: PackageModel[] = [];
  constructor(private packagesService: PackagesService,    
    private util: CommonService,
    private route: Router) { }

  ngOnInit(): void {
    this.getPackages();
  }
  open(id: number) {
    this.route.navigate([`/frmPackage/${id}`]);
  }
  delete(id:number){}

  exportExcel() {    
    this.util.exportExcel('paquetes', this.packages);
  }

  getPackages() {
    this.packagesService.getAllPackages().subscribe((data) => {
      this.packages = data;
    });
  }

}
