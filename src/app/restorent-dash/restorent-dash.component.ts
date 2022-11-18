import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './restaurent.model';

@Component({
  selector: 'app-restorent-dash',
  templateUrl: './restorent-dash.component.html',
  styleUrls: ['./restorent-dash.component.scss']
})
export class RestorentDashComponent implements OnInit {
  displayStyle = "none";
  formValue!: FormGroup;
  restorentModalObj: RestaurantData = new RestaurantData;
  allRestaurantData: any;
  showAdd!:boolean;
  showbtn!:boolean;
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    });
    this.getAllData();

  }
  clickResto(){
    this.formValue.reset();
    this.showAdd=true;
    this.showbtn=false;
    this.openPopup();
  }
  // now subscribing data which maped via subscribe
  addResto() {
    this.restorentModalObj.name = this.formValue.value.name;
    this.restorentModalObj.email = this.formValue.value.email;
    this.restorentModalObj.mobile = this.formValue.value.mobile;
    this.restorentModalObj.address = this.formValue.value.address;
    this.restorentModalObj.services = this.formValue.value.services;

    this.api.postRestorent(this.restorentModalObj).subscribe(res => {
      console.log(res);
      alert("your record is successfully submited")
      this.formValue.reset();
      this.closePopup();
      this.getAllData();
    }, err => {
      alert("please check the details")
    })
  }
  getAllData() {
    this.api.getRestorent().subscribe(res => {
      this.allRestaurantData = res;
    })
  }
  getDelete(data: any) {
    this.api.deleteRestorent(data.id).subscribe(res => {
      alert("your data sucessfully delete")
    })
    this.getAllData()
  }
  onEditResto(data: any) {
    this.showAdd=false;
    this.showbtn=true;
    this.openPopup()
    this.restorentModalObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }
  updateResto() {
    this.restorentModalObj.name = this.formValue.value.name;
    this.restorentModalObj.email = this.formValue.value.email;
    this.restorentModalObj.mobile = this.formValue.value.mobile;
    this.restorentModalObj.address = this.formValue.value.address;
    this.restorentModalObj.services = this.formValue.value.services;
    this.api.updateRestorent(this.restorentModalObj, this.restorentModalObj.id).subscribe(res=>{
      alert("your data is successfully update");
      this.formValue.reset();
      this.closePopup();
      this.getAllData();
    })
  }
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

}

