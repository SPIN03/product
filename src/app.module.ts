import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { orm_config } from './orm.config';
import { SkuModule } from './sku/sku.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';


@Module({ 
  controllers: [ ],
  providers: [],
  imports: [SkuModule,TypeOrmModule.forRoot(orm_config), UsersModule, CategoryModule],
})
export class AppModule {}
