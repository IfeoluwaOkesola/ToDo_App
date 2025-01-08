import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsFutureDate', async: false })
export class IsFutureDate implements ValidatorConstraintInterface {
  validate(date: string, args: ValidationArguments) {
    const inputDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ignore time portion for comparison
    return inputDate >= today;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Due date must be a future date.';
  }
}
