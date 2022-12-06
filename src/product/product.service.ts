import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDTO } from './dtos/create-product.dto';
import { FilterProductDTO } from './dtos/filter-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
    constructor(@InjectModel("Product") private readonly ProductModel:Model<ProductDocument>){}

    async getAllProducts():Promise<Product[]>{
        const products = await this.ProductModel.find().exec();
        return products;
    }

    async getProduct(id:string):Promise<Product>{
        const product = await this.ProductModel.findById(id).exec();
        return product;
    }

    async getFilteredProducts(filterProductDTO:FilterProductDTO):Promise<Product[]>{
        const {category,search} = filterProductDTO;
        let products = await this.getAllProducts();

        if(search){
            products = products.filter(product=>product.name.includes(search) || product.description.includes(search))
        }

        if(category){
            products = products.filter(product=> product.category === category)
        }
        return products;
    }

    async addProduct(createProductDTO:CreateProductDTO):Promise<Product>{
        const newProduct = await this.ProductModel.create(createProductDTO);
        return newProduct.save();
    }

    async updateProduct(id:string,createProductDTO:CreateProductDTO):Promise<Product>{
        const updatedProduct = await this.ProductModel.findByIdAndUpdate(id,createProductDTO,{new:true})
        return updatedProduct
    }

    async deleteProduct(id: string): Promise<any> {
        const deletedProduct = await this.ProductModel.findByIdAndRemove(id);
        return deletedProduct;
      }
}
