import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custompipe'
})
export class CustompipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    //debugger;
    return args[0] + " " + value + " " + args[1];
  }

}

// ng g pipe pipes/custompipe