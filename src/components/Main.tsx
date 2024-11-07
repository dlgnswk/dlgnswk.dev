import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Page } from "./Page";

export const Main = () => {
  return (
    <div className="px-4">
      <Table>
        <TableBody>
          <TableRow className="h-20">
            <TableCell>
              <div>
                <div className="mb-2 text-4xl font-bold">
                  React Query 시작하기
                </div>
                <p className="mt-2 text-lg font-normal">
                  이번에 새로운 프로젝트를 시작하면서 React Query를 도입하게
                  되었다. React에서 데이터의 응답...
                </p>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Page />
    </div>
  );
};
