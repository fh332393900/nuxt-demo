export {};

// 全局类型
declare global {
  // 公共响应类型
  interface CommonRes<T = any> {
    code: number;
    data: T;
    msg: string;
  }
}
