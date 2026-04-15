import { Col1, Col2Row1, Col2Row2, Col3Row1, Col3Row2 } from "./BentoContents";

export function BentoGrid() {
  return (
    <div className="mt-4 grid w-full grid-cols-2 p-4 lg:min-h-130 lg:grid-cols-3">
      {/* first col */}
      <Col1 />
      {/* 2ndCol */}
      <div className="col-span-1 grid min-h-120 grid-rows-[60%_40%]">
        {/* 2nd colRow1 */}
        <Col2Row1 />
        {/* 2nd colRow2 */}
        <Col2Row2 />
      </div>
      {/* 3rd col */}
      <div className="grid min-h-120 md:col-span-2 md:grid-rows-[35%_65%] lg:col-span-1">
        {/* 3rd Row1 */}
        <Col3Row1 />

        {/* 3rd Row2 */}
        <Col3Row2 />
      </div>
    </div>
  );
}
