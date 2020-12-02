import { EntityRepository, Repository } from "typeorm";
import { productdata,product_log } from "src/entity/prodata.entity";

@EntityRepository(productdata)
export class SkuRepository extends Repository<productdata> {}

@EntityRepository(product_log)
export class SkulogRepository extends Repository<product_log> {}