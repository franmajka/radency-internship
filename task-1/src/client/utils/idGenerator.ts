type IdGenerator = {
  (): Generator<number, void>

  gen?: Generator<number, void>,
  get id(): number
};

function* _idGenerator() {
  for (let i = 1;; i++) yield i;
}

Object.defineProperty(_idGenerator, 'id', {
  get(this: IdGenerator): number {
    if (!this.gen) this.gen = this();

    return this.gen.next().value!;
  }
})

export const idGenerator = _idGenerator as IdGenerator;
