import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/providers/services/products/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  file:any;
  productId:any
  isSubmitted = false
  isFailed=false
  choosing=false
  clicked=false
  clicked2=false
  imageSrc:any
  myForm=new FormGroup({
    shortName:new FormControl(''),
    longName:new FormControl(''),
    price:new FormControl(''),
    inventoryQuantity:new FormControl(''),
    description:new FormControl(''),
    specifications:new FormControl(''),
    discount:new FormGroup({
      name:new FormControl(''),
      description:new FormControl(''),
      percent:new FormControl(''),
      active:new FormControl(''),
    })
  })

  constructor(private _products:ProductsService,private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this.productId=this._route.snapshot.params['productId']
    this._products.getSingleProduct(this.productId).subscribe(
      data=>{
        this.myForm.patchValue(data.data)
        console.log(data)
      },
      err=>console.log(err),

    )
  }
  handleEdit(){
    this._products.editProduct(this.myForm.value,this.productId).subscribe(
      (res)=>{
        console.log(res);
        this.showToast()
      },
      (err)=>{
        console.log(err)
      },
      ()=>{
        console.log('done')
      }
    )

  }
  
handleChange(event:any){
  const reader = new FileReader();
  if(event.target.files && event.target.files.length) {
    this.file=event.target.files[0]
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.imageSrc = reader.result as string;
      this.myForm.patchValue({
        fileSource: reader.result
      });
    };
    this.choosing=true
  }
}
uploadImage(){
  const data=new FormData();
  data.append('img',this.file,this.file.name)
  this._products.uploadImage(data,this._route.snapshot.params['productId']).subscribe(
    data=>{
      console.log(data)
      this.showToast2()
      this.choosing=false
    },
    err=>console.log(err),
    ()=>{
      console.log('done')
    }
  )
  }
  showToast(){
    this.clicked=true
    setTimeout(
      ()=>this.clicked=false 
      , 5000);
}
  showToast2(){
    this.clicked2=true
    setTimeout(
      ()=>this.clicked2=false 
      , 5000);
}

}
