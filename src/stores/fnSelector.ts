import { pick } from 'lodash-es';

export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export const fnSelector =
  <TStore extends object, K extends NestedKeyOf<TStore>>(arrKey: Array<K>) =>
  (state: TStore) =>
    pick<TStore>(state, arrKey);
