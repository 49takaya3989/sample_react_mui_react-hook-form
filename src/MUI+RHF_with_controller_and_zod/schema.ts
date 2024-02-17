import { z } from 'zod';

/**
 * schema
 * form のスキーマを定義
 */
export const schema = z.object({
  nullAbleText: z.string(),
  text: z
    .string()
    .min(1, {message: 'テキストを入力してください。'}),
  nullAbleNumber: z.string(), // TextField の value が string 扱いなため、string として定義
  number: z
    .string() // TextField の value が string 扱いなため、string として定義
    .refine(
      val => val !== '',
      {message: "数値を入力してください。"}
    )
    .refine(
      val => Number(val) >= 0,
      {message: "有効な数値を入力してください。"}
    ),
  nullAbleSelect: z.string(),
  select: z
    .string()
    .min(1, {message: '選択してください。'}),
  nullAbleCheckboxes: z.array(z.string()),
  checkboxes: z
    .array(z.string())
    .refine(
      vals => vals.length > 0,
      {message: '少なくとも1つは選択してください。'}
    ),
  nullAbleCheckbox: z.boolean(),
  checkbox: z
    .boolean()
    .refine(
      val => val === true,
      { message: "チェックしてください。"}
    ),
  nullAbleRadio: z.string(),
  radio: z
    .string()
    .min(1, {message: '任意の項目を選択してください。'}),
  nullAbleDate: z.string(),
  date: z
    .string()
    .min(1, {message: '日付を入力してください。'})
    .refine(
      val => new Date(val) > new Date(),
      {message: "有効な日付を入力してください。"}
    ),
  nullAbleTextarea: z.string(),
  textarea: z
    .string()
    .min(1, {message: 'テキストを入力してください。'}),
});

/**
 * schema の型生成
 */
export type Schema = z.infer<typeof schema>;
