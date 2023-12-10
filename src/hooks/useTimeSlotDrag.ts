import { range } from 'lodash';
import { useEffect, useState } from 'react';

type ModeType = 'straight' | 'diagonal';
type ConfigType = { [key in 'onMouseDown' | 'onMouseEnter' | 'OnMouseUp']?: () => void };

function SignWithZero(number: number, nullish = 1) {
  return Math.sign(number) ? Math.sign(number) : nullish;
}

export default function useTimeSlotDrag(
  init: boolean[][],
  mode: ModeType = 'straight',
  { onMouseDown, onMouseEnter, OnMouseUp }: ConfigType = {},
) {
  const [cells, setCells] = useState(init); //control the whole dragging status
  const [prevCells, setPrevCells] = useState(init); //record the previous status of this-time dragging
  const [start, setStart] = useState<[number, number] | undefined>(undefined); //control the starting point of dragging
  const [dragStart, setDragStart] = useState(false); //control whether it is being dragged

  useEffect(() => {
    if (!dragStart) {
      setPrevCells(cells);
    }
  }, [cells, dragStart]);

  const resetTimeSlot = () => {
    setPrevCells(init);
    setCells(init);
  };

  useEffect(() => {
    setCells((prev) => (prev.flat().length === init.flat().length ? prev : init));
  }, [init]);

  const handleUnitMouseDown = (x: number, y: number) => {
    if (mode === 'straight') {
      resetTimeSlot();
    }
    onMouseDown?.();
    setDragStart(true);
    setCells((prev) =>
      prev.map((column, columnIndex) =>
        columnIndex === x ? column.map((row, rowIndex) => (rowIndex === y ? !row : row)) : column,
      ),
    );
    setStart([x, y]);
  };

  const handleUnitMouseEnter = (x: number, y: number) => {
    if (dragStart && start) {
      setCells(
        prevCells.map((column, columnIndex) =>
          (mode === 'straight' && columnIndex === start[0]) ||
          (mode === 'diagonal' &&
            range(x, start[0] + SignWithZero(start[0] - x), SignWithZero(start[0] - x)).includes(
              columnIndex,
            ))
            ? column.map((row, rowIndex) =>
                range(
                  y,
                  start[1] + SignWithZero(start[1] - y),
                  SignWithZero(start[1] - y),
                ).includes(rowIndex)
                  ? cells[start[0]][start[1]]
                  : row,
              )
            : column,
        ),
      );
      onMouseEnter?.();
    }
  };

  useEffect(() => {
    const handleUnitMouseUp = () => {
      setDragStart(false);
      OnMouseUp?.();
    };
    window.addEventListener('mouseup', handleUnitMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleUnitMouseUp);
    };
  }, [OnMouseUp]);

  return { cells, setCells, handleUnitMouseDown, handleUnitMouseEnter, resetTimeSlot };
}
