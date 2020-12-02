import { Module } from '@nestjs/common';
import { SkuController } from './sku.controller';
import { SkuService } from './sku.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkuRepository,SkulogRepository } from './sku.repository';

@Module({
  providers: [SkuService],
  controllers:[SkuController],
  imports:[TypeOrmModule.forFeature([SkuRepository]),TypeOrmModule.forFeature([SkulogRepository])]
})
export class SkuModule {}
