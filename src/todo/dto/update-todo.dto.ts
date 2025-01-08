import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
  Validate,
} from 'class-validator';
import { IsFutureDate } from 'src/shared/utils/validator';

export class UpdateTodoDto {
  @ApiProperty({
    description: 'The title of the todo item.',
    example: 'Buy groceries',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'The description of the todo item.',
    example: 'Buy milk, eggs, and bread.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The due date of the todo item.',
    example: '2025-01-10',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  @Validate(IsFutureDate)
  dueDate?: string;
}
