import MenuItem from "./";
import { render, screen, fireEvent } from '@testing-library/react';

test('exclude item', () => {
    render(
        <MenuItem />
    )
    const item = screen.getByTestId('item');
    //click item
    fireEvent.click(item);

    expect(item.className).toContain('excluded');
})