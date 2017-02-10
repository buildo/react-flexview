type Many<T> = T | T[];

declare module 'lodash/omit' {
  declare function omit(object: Object, ...props: Array<Many<$Subtype<string>>>): Object;
  declare var exports: typeof omit;
}

declare module 'lodash/pick' {
  declare function pick(object: Object, ...props: Array<Many<$Subtype<string>>>): Object;
  declare var exports: typeof pick;
}
