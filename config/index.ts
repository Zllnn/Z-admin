interface Config {
  development: {
    baseURL: string;
  };
  beta: {
    baseURL: string;
  };
  release: {
    baseURL: string;
  };
}

const config: Config = {
  development: {
    baseURL: '/api'  //开发代理地址
  },
  beta: {
    baseURL: '' // 测试接口域名
  },
  release: {
    baseURL: '' // 正式接口域名
  }
}

export default config
