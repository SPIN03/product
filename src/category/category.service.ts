import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
    constructor(private readonly cetegory: CategoryRepository) { }

    async getCategory() {

        try {
            const find = await this.cetegory.find()
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
