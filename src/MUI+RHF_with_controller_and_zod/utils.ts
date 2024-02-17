import { ZodObject, z } from 'zod';

/**
 * initFormVal
 * zod schema から useForm の defaultValue を作成する関数
 * zod で .default() メソッドはあるが、RHF の再レンダリングの最適化されないためこの関数が必要
 */
export const initFormVal = <T extends z.ZodRawShape>(schema: ZodObject<T>) => {
  return Object.entries(schema.shape).reduce<Record<string, unknown>>((acc, [key, val]) => {
    if (val instanceof z.ZodString) {
      acc[key] = ""
    } else if (val instanceof z.ZodNumber) {
      acc[key] = null
    } else if (val instanceof z.ZodBoolean) {
      acc[key] = false
    } else if (val instanceof z.ZodArray) {
      acc[key] = []
    } else if (val instanceof z.ZodEffects) {
      if (
        val._def.schema instanceof z.ZodString ||
        val._def.schema._def.schema instanceof z.ZodString
      ) {
        acc[key] = ""
      } else if (val._def.schema instanceof z.ZodArray) {
        acc[key] = []
      } else if (val._def.schema instanceof z.ZodBoolean) {
        acc[key] = false
      }
    } else {
      acc[key] = undefined
    }

    return acc
  }, {});
};