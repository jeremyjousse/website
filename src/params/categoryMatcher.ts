/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param: string) {
  return /^cuisine|development$/.test(param);
}
