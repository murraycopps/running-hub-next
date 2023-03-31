import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { outTime } from "@/scripts";
import LoginData from "@/scripts/LoginData";
import Image from "next/image";
import IntensityChart from "@/components/Strava/IntensityChart";
import IntensityCard from "../IntensityCard";

export default function ProfileCard({
  data,
  stats,
  activities,
}: {
  data: any;
  stats: any;
  activities: any;
}) {
  const [showYear, setShowYear] = useState(false);
  const [usedStats, setUsedStats] = useState([] as any);

  const router = useRouter();
  useEffect(() => {
    console.log(data.profile);
    if (!stats) return;
    setUsedStats(showYear ? stats.ytd_run_totals : stats.all_run_totals);
  }, [stats, showYear]);

  return (
    <div className="z-10 grid w-full grid-cols-2 p-8 place-items-center bg-faded-base-500">
      <div className="flex flex-row items-center justify-center gap-8">
        <Image
          src={data.profile}
          className="object-cover rounded-full sm:w-36 sm:h-36 w-28 h-28"
          alt="Profile Picture"
          width={192}
          height={192}
        />
        <div className="flex flex-col">
          <h1 className="w-full text-2xl font-bold text-center sm:text-4xl sm:mb-4">
            {data.firstname} {data.lastname}
          </h1>
          <div className="flex flex-row justify-center gap-4 text-center sm:gap-8">
            <div>
              Followers:
              <p className="text-2xl font-bold">{data.follower_count}</p>
            </div>
            <div>
              Friends:
              <p className="text-2xl font-bold">{data.friend_count}</p>
            </div>
          </div>
        </div>
      </div>
      <IntensityChart activities={activities} />
    </div>
  );
}