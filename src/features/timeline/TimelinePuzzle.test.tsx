import { fireEvent, render } from '@testing-library/react-native';

import { TimelinePuzzle, type TimelineDisplayItem } from '@/features/timeline/TimelinePuzzle';

const items: readonly TimelineDisplayItem[] = [
  { id: 'a', time: '21:04', title: 'Görev', body: 'Görev kabul edildi' },
  { id: 'b', time: '21:07', title: 'Bakım', body: 'Bakım istendi' },
];

describe('TimelinePuzzle accessible controls', () => {
  it('moves an item without drag and submits', async () => {
    const onMove = jest.fn();
    const onSubmit = jest.fn();
    const screen = await render(
      <TimelinePuzzle items={items} onMove={onMove} onSubmit={onSubmit} submitLabel="Kontrol et" />,
    );
    await fireEvent.press(screen.getByLabelText('Görev aşağı taşı'));
    expect(onMove).toHaveBeenCalledWith(0, 1);
    await fireEvent.press(screen.getByText('Kontrol et'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
