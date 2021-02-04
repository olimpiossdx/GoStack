export default interface ICacheProvider<T = any> {
  save(key: string, value: T): Promise<void>;
  recover<T>(key: string): Promise<T | null>;
  invalidate(key: string): Promise<void>;
};
