// eslint-disable-next-line import/no-named-default
import { default as _slugify } from "slugify";

export const slugify = (str: string) => {
  return _slugify(str, {
    lower: true,
    trim: true,
  });
};
