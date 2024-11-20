import { useGithubContributions } from "@/apis/queries/useGithubContributions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const getColorByCount = (count: number): string => {
  if (count === 0) return "#ebedf0";
  if (count <= 3) return "#9be9a8";
  if (count <= 6) return "#40c463";
  if (count <= 9) return "#30a14e";
  return "#216e39";
};

export function Contributions2D() {
  const { data } = useGithubContributions("dlgnswk");
  const yearData = data?.yearContributions;

  return (
    <div className="flex gap-0.5 justify-center my-16">
      {yearData.map((weekData) => (
        <div key={weekData.days[0].date} className="flex flex-col gap-0.5">
          {weekData.days.map((dayData) => (
            <TooltipProvider key={dayData.date}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="w-2 h-2 md:w-3 md:h-3 lg:w-5 lg:h-5 rounded-sm border-[1px] border-gray-200"
                    style={{ backgroundColor: getColorByCount(dayData.count) }}
                  ></div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{dayData.date}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      ))}
    </div>
  );
}
