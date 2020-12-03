import { Optional } from "@nestjs/common";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ProductCreateDto {
    @IsString()
    @IsNotEmpty()
    sku: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    price:number;

    @IsString()
    @IsOptional()
    note:string;

    // @IsString()
    // @IsOptional()
    // email:string
}