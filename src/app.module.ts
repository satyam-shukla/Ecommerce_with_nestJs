import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Import the  mongoose module 
import { ProductModule } from './product/product.module'; //Import a product module
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';


@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost:27017/store"),//setup a database
  ProductModule, UserModule, AuthModule, CartModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
