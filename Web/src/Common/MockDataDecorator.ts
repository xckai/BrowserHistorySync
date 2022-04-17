import { forEach } from 'lodash';
import { MockedData } from './MockData';
const isDevMode = process.env.NODE_ENV == 'development';
export function mockedServiceDataAble(option: { enable: boolean; serviceAlias?: string } = { enable: true, serviceAlias: '' }) {
  const enableMockData = option.enable;
  const serviceAlias = option.serviceAlias || '';
  return function (target: Record<string, any>, propertyKey: string, descriptor?: PropertyDescriptor): any {
    // eslint-disable-next-line no-param-reassign
    target[propertyKey] = promiseWrapper(propertyKey, target[propertyKey], isDevMode && enableMockData, serviceAlias, target.constructor?.name);
    if (descriptor && descriptor.value) {
      descriptor.value = target[propertyKey];
    }
  };
}
function promiseWrapper(propertyKey: string, func: Promise<any>, perferMockData = true, serviceAlias: string, className: string) {
  if (perferMockData) {
    window.console && window.console.warn && window.console.warn(`${className}:${propertyKey} using mocked data (${serviceAlias || propertyKey})!`);
    return function (...args: any[]) {
      return Promise.resolve(getData(serviceAlias || propertyKey, args));
    };
  } else {
    return func;
  }
}
function getData(serviceName: string, args: any[]) {
  const mockDataCollection = [MockedData];
  let data = undefined;
  forEach(mockDataCollection, (item: any) => {
    if (item[serviceName] != undefined) {
      data = item[serviceName];
    }
  });
  return data as any;
}
