import { Component, OnInit } from '@angular/core';
import { PackageModel } from 'src/app/interface/user.mode';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {
  
  packages: PackageModel[] = [];
  constructor() { }

  ngOnInit(): void {
  }
  open(id:number){}
  delete(id:number){}
  exportExcel(){}
}
