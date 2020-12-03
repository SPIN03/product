import { Category } from "src/entity/prodata.entity";
import { EntityRepository, Repository } from "typeorm";


@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> { }