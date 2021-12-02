import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/providers/services/products/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  isFailed=false
  enteredCat=false
  isSubmitted = false
  clicked=false
  myForm=new FormGroup({
    shortName:new FormControl('',[Validators.required]),
    longName:new FormControl('',[Validators.required]),
    price:new FormControl('',[Validators.required]),
    category:new FormControl('',[Validators.required]),
    category1:new FormControl(''),
    category2:new FormControl(''),
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
  constructor(private _products:ProductsService) { }
  ngOnInit(): void {
  }
  get shortName(){return this.myForm.get('shortName')}
  get longName(){return this.myForm.get('longName')}
  get price(){return this.myForm.get('price')}
  get quantity(){return this.myForm.get('inventoryQuantity')}
  get description(){return this.myForm.get('description')}
  get category(){return this.myForm.get('category')}

handleAdd(): void {
  console.log(this.myForm.value)
  if(this.myForm.value.discount.active=='') {
    this.myForm.value.discount.active=false
  }
  if(this.myForm.value.category1!=''){
    this.myForm.value.category=[
      {name:this.myForm.value.category},
      {name:this.myForm.value.category1}
    ]
  }
  else if(this.myForm.value.category2!=''){
    this.myForm.value.category=this.myForm.value.category.push(
      {name:this.myForm.value.category2}
      )
  }
this._products.addProduct(this.myForm.value).subscribe(
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
    this.myForm.reset()
  }
)
}
showToast(){
    this.clicked=true
    setTimeout(
      ()=>this.clicked=false 
      , 5000);
    
}

}
