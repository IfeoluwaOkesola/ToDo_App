import { ApiProperty } from '@nestjs/swagger'; // Import Swagger decorators
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsDateString,
  Validate,
  IsIn,
} from 'class-validator'; // Validation decorators
import { IsFutureDate } from 'src/shared/utils/validator';

export class CreateTodoDto {
  @ApiProperty({
    description: 'The title of the Todo task',
    example: 'Buy groceries',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'A detailed description of the Todo task',
    example: 'Buy milk, eggs, and bread',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'The due date for the Todo task',
    example: '2025-01-10',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  @Validate(IsFutureDate)
  dueDate: string;
}



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
