import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';

import { ProductCreateDto } from '../dto/sku-create.dto';
import { SkuService } from './sku.service';

@Controller('sku')
export class SkuController {
    constructor(private skuservice: SkuService) { }

    @Get('getproduct')
    async getproduct() {
        return this.skuservice.getProduct();
    }
    @Get('search')
    async searchdata(@Query() query) {
        return this.skuservice.searchdata(query);
    }
    @Get(':id/getlog')
    @UsePipes(new ValidationPipe())
    async getLog(@Param('id', ParseIntPipe) id: number) {
        return this.skuservice.getLog(id);
    }



    @Post('addproduct')
    @UsePipes(new ValidationPipe())
    async addUser(@Body() body: ProductCreateDto) {
        return this.skuservice.addProduct(body);
    }

    @Patch(':id/updateproduct')
    @UsePipes(new ValidationPipe())
    async updateproduct(@Body() body: ProductCreateDto, @Param('id', ParseIntPipe) id: number) {
        return this.skuservice.updateProduct(id, body)
    }
    @Delete(':id/delete')
    @UsePipes(new ValidationPipe())
    async deleteproduct(@Param('id', ParseIntPipe) id: number
    ) {
        return this.skuservice.deleteProduct(id)
    }

}


