import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { ProductCreateDto } from '../dto/sku-create.dto';
import { SkuRepository, SkulogRepository } from './sku.repository';
import { productdata, product_log } from 'src/entity/prodata.entity';


@Injectable()
export class SkuService {
    constructor(private readonly product: SkuRepository, private readonly log: SkulogRepository) { }

    async getProduct() {
        try {
            const datafind = await this.product.find()
            if (!datafind) throw new Error('no data');
            return {
                success: true,
                data: datafind
            }

        } catch (error) {
            throw new NotFoundException({
                success: false,
                message: error.message,
            });
        }
    }

    async getLog(id: number) {
        try {

            const find = await this.log.find({ where: { id_product: id } })
            if (!find) throw new Error('no log data ');

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

    async searchdata(query: any) {
        try {
            console.log(query)
            const { sku, price } = query
            const data = await getConnection()
                .getRepository(productdata)
                .createQueryBuilder("product")
                .where("product.sku like :sku", { sku: `%${sku}%` })
                // .orWhere("product.price like :price", { price: `%${price}%` })
                .getMany();
            return {
                success: true,
                data: data
            }

        } catch (error) {
            throw new NotFoundException({
                success: false,
                message: error.message,
            });
        }


    }

    async addProduct(body: ProductCreateDto) {
        try {
            const product = new productdata()
            const productlog = new product_log()
            const { sku, price, note, categoryid, quantity } = body;
            const findproduct = await this.product.findOne({ where: { sku: sku } })
            if (findproduct) throw new Error('มีชื่อซ้ำ');
            product.sku = sku
            product.price = price
            product.quantity = quantity
            // product.CategoryId = categoryid
            product.note = note
            await product.save();
            productlog.productid = product
            productlog.sku_updated = sku
            productlog.price_updated = price
            productlog.quantity_updated = quantity
            productlog.note_updated = note
            await productlog.save();

            return {
                success: true,
                message: 'add success.',

            };

        } catch (error) {

            throw new BadRequestException({
                success: false,
                message: error.message,
            });

        }
    }
    async updateProduct(id: number, body: ProductCreateDto) {
        try {
            const productlog = new product_log()
            const { sku, price, note, categoryid, quantity } = body;
            const find = await this.product.findOne({ where: { id: id } })
            if (!find) throw new Error('not found.');
            if (find.quantity + quantity < 0) throw new Error('สินค้าไม่พอ');
            find.sku = sku
            find.price = price
            find.quantity = find.quantity + quantity
            // find.CategoryId = categoryid
            find.note = note
            await find.save()
            productlog.productid = find;
            productlog.sku_updated = sku
            productlog.price_updated = price
            productlog.quantity_updated = quantity
            productlog.note_updated = note
            await productlog.save()
            return {
                success: true,
                message: 'updated success.',
                data: productdata
            };

        } catch (error) {
            throw new BadRequestException({
                success: false,
                message: error.message,
            })
        }


    }



    async deleteProduct(id: number) {
        try {
            const find = await this.product.findOne({ where: { id: id } })
            if (!find) throw new Error('id not found.');
            await getConnection()
                .createQueryBuilder()
                .delete()
                .from(productdata)
                .where("id = :id", { id: id })
                .execute();

            await getConnection()
                .createQueryBuilder()
                .delete()
                .from(product_log)
                .where("id_product = :id_product", { id_product: id })
                .execute();

            return {
                success: true,
                message: 'delete success.'
            };


        } catch (error) {
            throw new BadRequestException({
                success: false,
                message: error.message,
            });
        }
    }
}
