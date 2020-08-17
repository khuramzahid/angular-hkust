import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from '../shared/dish';
@Pipe({
  name: 'menuFilter'
})
export class MenuFilterPipe implements PipeTransform {

  transform(value: Dish[], filterString: string): any {
    debugger;
    let filteredMenu;
    if(filterString == null || filterString == "")
      return value;
    filteredMenu = value.filter((dish) => (dish.name.toLowerCase().indexOf(filterString.toLowerCase()) != -1));
    return filteredMenu;
  }
  // Angular team doesn't recommend filtering using pipes.

}
