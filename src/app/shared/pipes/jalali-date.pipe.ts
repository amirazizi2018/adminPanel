import { Pipe, PipeTransform } from '@angular/core';
import moment from "moment-jalaali";

@Pipe({
	name: 'jalaliDate',
	standalone: true
})
export class JalaliDatePipe implements PipeTransform {

	transform(value: string | Date, withTime: boolean = false): string {
		if (!value) return '';

		const format = withTime ? 'jYYYY/jMM/jDD HH:mm' : 'jYYYY/jMM/jDD';
		return moment(value).format(format);
	}

}
