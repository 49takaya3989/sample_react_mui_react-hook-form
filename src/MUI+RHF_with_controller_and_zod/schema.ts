import { z } from 'zod'

/**
 * errorMessage
 * zod のバリデーションメッセージ一覧
 */
export const errorMessage = {
  text: { min: 'テキストを入力してください。' },
  number: {
    refine: {
      isRequired: '数値を入力してください。',
      isPositive: '有効な数値を入力してください。',
    },
  },
  select: { min: '選択してください。' },
  checkbox: {
    refine: { isChecked: 'チェックしてください。' },
  },
  checkboxes: {
    refine: { isAtLeastOne: '少なくとも1つは選択してください。' },
  },
  radio: { min: '任意の項目を選択してください。' },
  date: {
    min: '日付を入力してください。',
    refine: { isFutureDate: '有効な日付を入力してください。' },
  },
  textarea: { min: 'テキストを入力してください。' },
}

/**
 * schema
 * form のスキーマを定義
 */
export const schema = z.object({
  nullAbleText: z.string(),
  text: z.string().min(1, { message: errorMessage.text.min }),
  nullAbleNumber: z.string(), // TextField の value が string 扱いなため、string として定義
  number: z
    .string() // TextField の value が string 扱いなため、string として定義
    .refine((val) => val !== '', {
      message: errorMessage.number.refine.isRequired,
    })
    .refine((val) => Number(val) >= 1, {
      message: errorMessage.number.refine.isPositive,
    }),
  nullAbleSelect: z.string(),
  select: z.string().min(1, { message: errorMessage.select.min }),
  nullAbleCheckbox: z.boolean(),
  checkbox: z.boolean().refine((val) => val === true, {
    message: errorMessage.checkbox.refine.isChecked,
  }),
  nullAbleCheckboxes: z.array(z.string()),
  checkboxes: z.array(z.string()).refine((vals) => vals.length > 0, {
    message: errorMessage.checkboxes.refine.isAtLeastOne,
  }),
  nullAbleRadio: z.string(),
  radio: z.string().min(1, { message: errorMessage.radio.min }),
  nullAbleDate: z.string(),
  date: z
    .string()
    .refine((val) => new Date(val).getTime() >= new Date().getTime(), {
      message: errorMessage.date.refine.isFutureDate,
    }),
  nullAbleTextarea: z.string(),
  textarea: z.string().min(1, { message: errorMessage.textarea.min }),
})

/**
 * schema の型生成
 */
export type Schema = z.infer<typeof schema>
