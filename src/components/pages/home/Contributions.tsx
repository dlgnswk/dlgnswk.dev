import { useGithubContributions } from "@/apis/queries/useGithubContributions";

const getColorByCount = (count: number): string => {
  if (count === 0) return "#ebedf0";
  if (count <= 3) return "#9be9a8";
  if (count <= 6) return "#40c463";
  if (count <= 9) return "#30a14e";
  return "#216e39";
};

export function Contributions() {
  const { data } = useGithubContributions("dlgnswk");
  const yearData = data?.yearContributions;

  return (
    <div className="flex">
      {yearData.map((weekData) => (
        <div key={weekData.days[0].date}>
          {weekData.days.map((dayData) => (
            <div
              key={dayData.date}
              className="w-3 h-3 rounded-sm border-2 border-gray-200"
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
