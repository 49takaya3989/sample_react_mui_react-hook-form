import {render, screen} from '@testing-library/react'
import MuiRhfWithControllerAndZod from '../index';

describe('ボタンの活性非活性', () => {
  it('未入力のとき', async () => {
    render(<MuiRhfWithControllerAndZod />)
    screen.debug();
    expect(screen.getByTestId('formButton')).toBeDisabled();
  });
})