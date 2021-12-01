import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/providers/services/admin/admin.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  file:any;
  isFailed=false
  // class1='d-none'
  clicked=false
  imageSrc:any
  myForm=new FormGroup({
    shortName:new FormControl('',[Validators.required]),
    longName:new FormControl('',[Validators.required,]),
    price:new FormControl('',[Validators.required]),
    inventoryQuantity:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required]),
    specifications:new FormControl(''),
    discount:new FormGroup({
      name:new FormControl(''),
      description:new FormControl(''),
      percent:new FormControl(''),
      active:new FormControl(''),
    })
  })
  constructor(private _admin:AdminService) { }

  ngOnInit(): void {
  }
handleAdd(): void {
  if(this.myForm.value.discount.active=='') {
    this.myForm.value.discount.active=false
  }
this._admin.addProduct(this.myForm.value).subscribe(
  data => {
console.log(data)
this.showToast()
  },
  err=>{
console.log(err)
this.isFailed=true
setTimeout(()=>{
  this.isFailed=false
},3000)

  },
  () => {
console.log("done")
  }
)
}
// handleChange(event:any){
//   const reader = new FileReader();
//   if(event.target.files && event.target.files.length) {
//     const [file] = event.target.files;
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       this.imageSrc = reader.result as string;
//       this.myForm.patchValue({
//         fileSource: reader.result
//       });
//     };
//   }
// }
showToast(){
    this.clicked=true
    setTimeout(
      ()=>this.clicked=false 
      , 5000);
    
}

}
