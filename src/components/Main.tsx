import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Page } from "./Page";
import { Separator } from "@/components/ui/separator";

export const Main = () => {
  return (
    <>
      <Table>
        <TableBody>
          <TableRow className="h-20">
            <TableCell>
              <div className="p-4">
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
          <TableRow className="h-20">
            <TableCell>
              <div className="p-4">
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
      <Separator className="mb-4" />
      <Page />
    </>
  );
};
