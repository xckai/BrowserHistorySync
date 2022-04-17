import { default as axios } from 'axios';
import { mockedServiceDataAble } from '../Common/MockDataDecorator';
class DemoServiceCls {
  @mockedServiceDataAble({ enable: true })
  getDemoList() {
    return axios.get('/api/rpaexaminfo/getuserrpaexamlist', {
      params: {
        pageIndex: 1,
        pageSize: 1000
      }
    });
  }
}
export const DemoService = new DemoServiceCls();
