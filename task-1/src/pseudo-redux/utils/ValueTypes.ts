export type ValueTypes<T> = T | (
  T extends object ? (
    T extends any[] ? (
      ValueTypes<T[number]>
    ) : (
      ValueTypes<T[keyof T]>
    )
  ) : never
);
