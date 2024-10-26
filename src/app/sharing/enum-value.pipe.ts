import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'enumValue',
    standalone: true
})
export class EnumValuePipe implements PipeTransform {
    transform(value: string, enumObj: any): string {
        return enumObj[value];
    }
}