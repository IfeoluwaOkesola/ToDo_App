import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsInt,
  Min,
  Max,
  IsNumber,
  IsNotEmpty,
  IsIn,
  IsBoolean,
} from 'class-validator';

export class GetTodosDto {
  @ApiProperty({
    required: false,
    description: 'Search term for the todo title or description',
  })
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty({
    description:
      'Order the todos by due date. Accepted values: ASC for ascending, DESC for descending',
    example: 'ASC',
    required: false,
    enum: ['ASC', 'DESC'],
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'], { message: 'Order must be either ASC or DESC' })
  order?: 'ASC' | 'DESC';

  @ApiProperty({
    description:
      'Filter todos by status. "active" means not completed, "inactive" means completed.',
    example: 'active',
    required: false,
    enum: ['active', 'inactive'],
  })
  @IsOptional()
  @IsIn(['active', 'inactive'], {
    message: 'Status must be either active or inactive',
  })
  status?: 'active' | 'inactive';
}

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
