import { useMemo } from "react";

export const DOTS = "...";

export const usePagination = ({
  siblingCount = 1,
  currentPage,
  totalPageCount,
}) => {
  const paginationRange = useMemo(() => {
    //our core logic
    const totalPageNumbers = siblingCount + 5;

    // State 1: if the number of pages is less than the page numbers
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    // Calculating the left and right sibling index
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    // calculate where to show dots left, right, or both sides
    // we don't show dots when there is just one page number to be inserted between the sibling and the page limit
    const shoudShowLeftDots = leftSiblingIndex > 2;
    const shoudShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    // State 2: we show only right dots
    if (!shoudShowLeftDots && shoudShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    // State3: we show only left dots
    if (shoudShowLeftDots && !shoudShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );

      return [firstPageIndex, DOTS, ...rightRange];
    }

    // State4: we show dots on both sides
    if (shoudShowLeftDots && shoudShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, middleRange, DOTS, lastPageIndex];
    }
  }, [siblingCount, currentPage, totalPageCount]);

  return paginationRange;
};

function range(start, end) {
  const length = end - start + 1;

  return Array.from({ length }, (value, index) => index + start);
}
