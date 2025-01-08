import { ApiProperty } from '@nestjs/swagger'; // Import Swagger decorators
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsDateString,
  Validate,
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
