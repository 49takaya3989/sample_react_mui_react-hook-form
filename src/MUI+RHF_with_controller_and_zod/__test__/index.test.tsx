import { render, screen, within } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import MuiRhfWithControllerAndZod from '../index'
import { errorMessage } from '../schema'

describe('初期状態', () => {
  beforeEach(() => {
    render(<MuiRhfWithControllerAndZod />)
  })

  it('送信ボタンが非活性', async () => {
    expect(screen.getByTestId('formButton')).toBeDisabled()
  })

  it('バリデーションメッセージが全て非表示', async () => {
    expect(screen.queryByText(errorMessage.text.min)).not.toBeInTheDocument()
    expect(
      screen.queryByText(errorMessage.number.refine.isRequired)
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(errorMessage.number.refine.isPositive)
    ).not.toBeInTheDocument()
    expect(screen.queryByText(errorMessage.select.min)).not.toBeInTheDocument()
    expect(
      screen.queryByText(errorMessage.checkbox.refine.isChecked)
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(errorMessage.checkboxes.refine.isAtLeastOne)
    ).not.toBeInTheDocument()
    expect(screen.queryByText(errorMessage.radio.min)).not.toBeInTheDocument()
    expect(screen.queryByText(errorMessage.date.min)).not.toBeInTheDocument()
    expect(
      screen.queryByText(errorMessage.date.refine.isFutureDate)
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(errorMessage.textarea.min)
    ).not.toBeInTheDocument()
  })
})

describe('入力バリデーション', () => {
  describe('テキスト', () => {
    describe('ラベル：テキスト', () => {
      let user: UserEvent

      beforeEach(() => {
        user = userEvent.setup()
        render(<MuiRhfWithControllerAndZod />)
      })

      it('入力後、値を削除してもバリデーションメッセージが表示されない', async () => {
        const inputEl = screen.getByTestId('nullAbleText')

        await user.click(inputEl)
        await user.tab()
        expect(
          screen.queryByText(errorMessage.text.min)
        ).not.toBeInTheDocument()
      })
    })

    describe('ラベル：テキスト（必須）', () => {
      let user: UserEvent

      beforeEach(() => {
        user = userEvent.setup()
        render(<MuiRhfWithControllerAndZod />)
      })

      it('入力後、値を削除し、focus を外すと、必須のバリデーションメッセージが表示される', async () => {
        const inputEl = screen.getByTestId('text')

        await user.click(inputEl)
        await user.tab()
        expect(screen.queryByText(errorMessage.text.min)).toBeInTheDocument()
      })
      it('バリデーションメッセージが表示された状態で、1文字以上入力し、focus を外すとバリデーションメッセージが非表示になる', async () => {
        const inputEl = screen.getByTestId('text')

        await user.click(inputEl)
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.text.min)
        ).toBeInTheDocument()
        await user.type(inputEl, 't')
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.text.min)
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('数値', () => {
    describe('ラベル：数値', () => {
      let user: UserEvent

      beforeEach(() => {
        user = userEvent.setup()
        render(<MuiRhfWithControllerAndZod />)
      })

      it('focus を外す、もしくは 0 を入力しても、バリデーションメッセージが表示されない', async () => {
        const inputEl = screen.getByTestId('nullAbleNumber')

        await user.click(inputEl)
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.number.refine.isRequired)
        ).not.toBeInTheDocument()

        await user.type(inputEl, '0')
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.number.refine.isPositive)
        ).not.toBeInTheDocument()
      })
    })

    describe('ラベル：数値（必須）', () => {
      let user: UserEvent

      beforeEach(() => {
        user = userEvent.setup()
        render(<MuiRhfWithControllerAndZod />)
      })

      it('入力後、値を削除し、focus を外すと、必須のバリデーションメッセージが表示される', async () => {
        const inputEl = screen.getByTestId('number')

        await user.click(inputEl)
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.number.refine.isRequired)
        ).toBeInTheDocument()
      })
      it('0を入力後、focus を外すと、正の整数用のバリデーションメッセージが表示される', async () => {
        const inputEl = screen.getByTestId('number')

        await user.type(inputEl, '0')
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.number.refine.isPositive)
        ).toBeInTheDocument()
      })
      it('負の整数を入力後、focus を外すと、正の整数用のバリデーションメッセージが表示される', async () => {
        const inputEl = screen.getByTestId('number')

        await user.type(inputEl, '-1')
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.number.refine.isPositive)
        ).toBeInTheDocument()
      })
      it('必須のバリデーションメッセージが表示された状態で、負の整数を入力し、focus を外すと必須のバリデーションメッセージが正の整数用のバリデーションメッセージに変更される', async () => {
        const inputEl = screen.getByTestId('number')

        await user.click(inputEl)
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.number.refine.isRequired)
        ).toBeInTheDocument()
        await user.type(inputEl, '0')
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.number.refine.isPositive)
        ).toBeInTheDocument()
      })
      it('必須のバリデーションメッセージが表示された状態で、正の整数を入力し、focus を外すとバリデーションメッセージが非表示される', async () => {
        const inputEl = screen.getByTestId('number')

        await user.click(inputEl)
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.number.refine.isRequired)
        ).toBeInTheDocument()
        await user.type(inputEl, '1')
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.number.refine.isPositive)
        ).not.toBeInTheDocument()
      })
      it('正の整数用のバリデーションメッセージが表示された状態で、正の整数を入力し、focus を外すとバリデーションメッセージが非表示される', async () => {
        const inputEl = screen.getByTestId('number')

        await user.type(inputEl, '0')
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.number.refine.isPositive)
        ).toBeInTheDocument()
        await user.type(inputEl, '1')
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.number.refine.isPositive)
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('セレクト', () => {
    describe('ラベル：セレクト', () => {
      let user: UserEvent

      beforeEach(() => {
        user = userEvent.setup()
        render(<MuiRhfWithControllerAndZod />)
      })

      it('任意の値を選択後、"選択してください"を選択し、 focus を外してもてもバリデーションメッセージが表示されない', async () => {
        // <Select /> のトリガーは combobox
        // 複数ある場合のために within を挟む
        const selectBoxEl = within(
          screen.getByTestId('nullAbleSelect')
        ).getByRole('combobox')

        await user.click(selectBoxEl)
        await user.tab()
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.select.min)
        ).not.toBeInTheDocument()
      })
    })

    describe('ラベル：セレクト（必須）', () => {
      let user: UserEvent

      beforeEach(() => {
        user = userEvent.setup()
        render(<MuiRhfWithControllerAndZod />)
      })

      it('任意の値を選択後、"選択してください"を選択し、 focus を外したらバリデーションメッセージが表示される', async () => {
        // <Select /> のトリガーは combobox
        // 複数ある場合のために within を挟む
        const selectBoxEl = within(screen.getByTestId('select')).getByRole(
          'combobox'
        )

        await user.click(selectBoxEl)
        await user.tab()
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.select.min)
        ).toBeInTheDocument()

        await user.click(selectBoxEl)
        await user.click(
          await screen.getByRole('option', { name: 'セレクト1' })
        )
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.select.min)
        ).not.toBeInTheDocument()
        await user.click(selectBoxEl)
        await user.click(
          await screen.getByRole('option', { name: '選択してください' })
        )
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.select.min)
        ).toBeInTheDocument()
      })
      it('バリデーションメッセージが表示された状態で、任意の値を選択後、"選択してください"以外の任意の値を選択し、 focus を外したらバリデーションメッセージが表示されない', async () => {
        // <Select /> のトリガーは combobox
        // 複数ある場合のために within を挟む
        const selectBoxEl = within(screen.getByTestId('select')).getByRole(
          'combobox'
        )

        await user.click(selectBoxEl)
        await user.tab()
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.select.min)
        ).toBeInTheDocument()
        await user.click(selectBoxEl)
        await user.click(
          await screen.getByRole('option', { name: 'セレクト1' })
        )
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.select.min)
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('チェックボックス', () => {
    describe('ラベル：チェックボックス', () => {
      let user: UserEvent

      beforeEach(() => {
        user = userEvent.setup()
        render(<MuiRhfWithControllerAndZod />)
      })

      it('2回クリックし、 focus を外してもバリデーションメッセージが表示されない', async () => {
        const inputEl = screen.getByTestId('nullAbleCheckbox')

        await user.dblClick(inputEl)
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.checkbox.refine.isChecked)
        ).not.toBeInTheDocument()
      })
    })

    describe('ラベル：チェックボックス（必須）', () => {
      let user: UserEvent

      beforeEach(() => {
        user = userEvent.setup()
        render(<MuiRhfWithControllerAndZod />)
      })

      it('2回クリックし、 focus を外すとバリデーションメッセージが表示される', async () => {
        const inputEl = screen.getByTestId('checkbox')

        await user.dblClick(inputEl)
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.checkbox.refine.isChecked)
        ).toBeInTheDocument()
      })
      it('バリデーションメッセージが表示された状態で、1回クリックし、 focus を外したらバリデーションメッセージが表示されない', async () => {
        const inputEl = screen.getByTestId('checkbox')

        await user.dblClick(inputEl)
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.checkbox.refine.isChecked)
        ).toBeInTheDocument()
        await user.click(inputEl)
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.checkbox.refine.isChecked)
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('複数チェックボックス', () => {
    describe('ラベル：複数チェックボックス', () => {
      let user: UserEvent

      beforeEach(() => {
        user = userEvent.setup()
        render(<MuiRhfWithControllerAndZod />)
      })

      it('任意のチェックボックスを2回クリックし、 focus を外してもバリデーションメッセージが表示されない', async () => {
        const inputEl = screen.getByTestId('nullAbleCheckboxes0')

        await user.dblClick(inputEl)
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.checkboxes.refine.isAtLeastOne)
        ).not.toBeInTheDocument()
      })
    })

    describe('ラベル：複数チェックボックス（必須）', () => {
      let user: UserEvent

      beforeEach(() => {
        user = userEvent.setup()
        render(<MuiRhfWithControllerAndZod />)
      })

      it('任意のチェックボックスを2回クリックし、 focus を外してもバリデーションメッセージが表示される', async () => {
        const inputEl = screen.getByTestId('checkboxes0')

        await user.dblClick(inputEl)
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.checkboxes.refine.isAtLeastOne)
        ).toBeInTheDocument()
      })
      it('バリデーションメッセージが表示された状態で、任意のチェックスを1回クリックし、 focus を外したらバリデーションメッセージが表示されない', async () => {
        const inputEl = screen.getByTestId('checkboxes0')

        await user.dblClick(inputEl)
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.checkboxes.refine.isAtLeastOne)
        ).toBeInTheDocument()
        await user.click(inputEl)
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.checkboxes.refine.isAtLeastOne)
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('日程', () => {
    describe('ラベル：日程', () => {
      let user: UserEvent

      beforeEach(() => {
        user = userEvent.setup()
        render(<MuiRhfWithControllerAndZod />)
      })

      it('カレンダーモーダルを開いてから閉じても、バリデーションメッセージが表示されない', async () => {
        const calIcon = within(screen.getByTestId('nullAbleDate')).getByRole(
          'button'
        )

        await user.dblClick(calIcon)
        await expect(
          screen.queryByText(errorMessage.date.refine.isFutureDate)
        ).not.toBeInTheDocument()
      })
    })

    describe('ラベル：日程（必須）', () => {
      let user: UserEvent

      beforeEach(() => {
        user = userEvent.setup()
        render(<MuiRhfWithControllerAndZod />)
      })

      it('カレンダーモーダルを開いてから閉じると、バリデーションメッセージが表示される', async () => {
        const calIcon = within(screen.getByTestId('date')).getByRole('button')

        await user.dblClick(calIcon)
        await expect(
          screen.queryByText(errorMessage.date.refine.isFutureDate)
        ).toBeInTheDocument()
      })
      it('過去月を入力したら、バリデーションメッセージが表示される', async () => {
        const inputEl = within(screen.getByTestId('date')).getByRole('textbox')

        await user.type(inputEl, '2024/03/01')
        await expect(
          screen.queryByText(errorMessage.date.refine.isFutureDate)
        ).toBeInTheDocument()
      })
      it('バリデーションメッセージが表示された状態で、未来月を入力後、バリデーションメッセージが表示されない', async () => {
        const calIcon = within(screen.getByTestId('date')).getByRole('button')
        const inputEl = within(screen.getByTestId('date')).getByRole('textbox')

        await user.dblClick(calIcon)
        await expect(
          screen.queryByText(errorMessage.date.refine.isFutureDate)
        ).toBeInTheDocument()
        await user.type(inputEl, '2024/04/01')
        await expect(
          screen.queryByText(errorMessage.date.refine.isFutureDate)
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('テキストエリア', () => {
    describe('ラベル：テキストエリア', () => {
      let user: UserEvent

      beforeEach(() => {
        user = userEvent.setup()
        render(<MuiRhfWithControllerAndZod />)
      })

      it('一度 focus を当てて、外してもバリデーションメッセージが表示されない', async () => {
        const inputEl = screen.getByTestId('nullAbleTextarea')

        await user.click(inputEl)
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.textarea.min)
        ).not.toBeInTheDocument()
      })
    })

    describe('ラベル：テキストエリア（必須）', () => {
      let user: UserEvent

      beforeEach(() => {
        user = userEvent.setup()
        render(<MuiRhfWithControllerAndZod />)
      })

      it('一度 focus を当てて、外したらバリデーションメッセージが表示される', async () => {
        const inputEl = screen.getByTestId('textarea')

        await user.click(inputEl)
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.textarea.min)
        ).toBeInTheDocument()
      })
      it('バリデーションメッセージが表示された状態で、任意の値を入力後、 focus を外したらバリデーションメッセージが表示されない', async () => {
        const inputEl = screen.getByTestId('textarea')

        await user.click(inputEl)
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.textarea.min)
        ).toBeInTheDocument()
        await user.type(inputEl, 'test')
        await user.tab()
        await expect(
          screen.queryByText(errorMessage.textarea.min)
        ).not.toBeInTheDocument()
      })
    })
  })
})
