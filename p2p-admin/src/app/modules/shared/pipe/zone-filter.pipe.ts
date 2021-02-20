import { Pipe, PipeTransform } from '@angular/core';
import { Zone } from 'app/modules/zone/zone.modal';

@Pipe({
  name: 'zoneFilter'
})
export class ZoneFilterPipe implements PipeTransform {

  transform(value: Zone[], ...args: string[]): Zone[] {
    if (!value  || args.length === 0) {
      return value;
    }
    if (args.length > 2) {
      return value.filter(z => (z.zoneType === args[0] && z[args[1]] === args[2]));
    } else {
      return value.filter(z => (z.zoneType === args[0]));
    }
    
  }

}
