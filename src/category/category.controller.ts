import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private Categoryservice: CategoryService) { }

    @Get('getcategory')
    async getproduct() {
        return this.Categoryservice.getCategory();
    }
}
