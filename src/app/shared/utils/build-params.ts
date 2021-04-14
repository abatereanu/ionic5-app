import { HttpParams } from '@angular/common/http';


export function buildParams(params: any) {
  if (!params || typeof params !== 'object') {
    return null;
  }

  let target = new HttpParams();
  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (typeof value !== 'undefined' && value !== null) {
      target = target.append(key, value.toString());
    }
  });
  return target;
}
