import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, Min, Max } from "class-validator";

export class PaginationDto {
    @ApiProperty({ default: 1, description: 'Page number for pagination' })
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    @Min(1)
    page: number;
  
    @ApiProperty({ default: 10, description: 'Number of todos per page' })
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    @Min(1)
    @Max(50)
    pageSize: number;
  }
  