import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class IsFutureDate implements ValidatorConstraintInterface {
    validate(date: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
