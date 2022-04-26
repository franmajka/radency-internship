export type Signature<
  Func extends (...args: any) => any
> = Func extends (...args: infer Props) => infer Ret
  ? (...args: Props) => Ret
  : never;
