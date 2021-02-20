import { Pipe, PipeTransform } from '@angular/core';
import { FuseUtils } from '@fuse/utils';

@Pipe({name: 'arrFilter'})
export class ArrFilterPipe implements PipeTransform
{
    transform(items: any[], callback: (item: any) => boolean): any {
        if (!items || !callback) {
            return items;
        }
        return items.filter(item => callback(item));
    }
}
