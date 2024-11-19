import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Page } from "./Page";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { useGithubContributions } from "@/apis/queries/useGithubContributions";

export const Main = () => {
  const {
    data: githubData,
    isLoading,
    error,
  } = useGithubContributions("dlgnswk");

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Activities</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <div>로딩 중...</div>}
          {error && <div>에러가 발생했습니다: {error.message}</div>}
          {githubData && (
            <div>
              총 컨트리뷰션: {githubData.totalContributions}
              {/* 여기에 원하는 데이터 표시 */}
            </div>
          )}
        </CardContent>
      </Card>
      <Table>
        <TableBody>
          <TableRow className="h-20">
            <TableCell>
              <div className="p-4">
                <div className="mb-2.5 text-xl font-bold">
                  React Query 시작하기
                </div>
                <p className="mt-2.5 text-base font-normal">
                  이번에 새로운 프로젝트를 시작하면서 React Query를 도입하게
                  되었다. React에서 데이터의 응답...
                </p>
                <p className="mt-1.5 text-sm font-normal text-gray-500">
                  24.11.17 (일)
                </p>
              </div>
            </TableCell>
          </TableRow>
          <TableRow className="h-20">
            <TableCell>
              <div className="p-4">
                <div className="mb-2.5 text-xl font-bold">
                  StoryBook 시작하기
                </div>
                <p className="mt-2.5 text-base font-normal">
                  React, Angular, Vue 등의 분리된 UI 컴포넌트를 체계적이고
                  효율적으로 구축할 수 있는 UI 컴포넌트 개발 도구다. UI 컴포넌트
                  라이브러리의 문서화(documentation)를 위해 사용할 수도...
                </p>
                <p className="mt-1.5 text-sm font-normal text-gray-500">
                  24.11.17 (일)
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
