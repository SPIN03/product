import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { SkuRepository } from 'src/sku/sku.repository';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
    constructor(private readonly cetegory: CategoryRepository) { }

    async getCategory() {

        try {
            const find = await this.cetegory.find()
            // console.log(find)
            // const product = await this.product.find({ where: { CategoryId: find } })
            // console.log(product)
            if (!find) throw new Error('no data');
            return {
                success: true,
                data: find
            }

        } catch (error) {
            throw new NotFoundException({
                success: false,
                message: error.message,
            });
        }

    }
}
