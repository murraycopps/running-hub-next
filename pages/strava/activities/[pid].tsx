import PageWrapper from "@/components/PageWrapper";
import StreamCard from "@/components/StravaPage/SingleRun/StreamCard";
import Laps from "@/components/StravaPage/SingleRun/Laps";
import SegmentsCommentsCard from "@/components/StravaPage/SingleRun/SegmentCommentCard";
import StatsCards from "@/components/StravaPage/SingleRun/StatsCards";
import {
  getActivity,
  getActivityComments,
  getActivityStream,
} from "@/lib/strava";
import LoginData from "@/scripts/LoginData";
import { Comment, DetailedRun, Stream } from "@/scripts/singleRunTypes";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const MapWithNoSSR = dynamic(() => import("@/components/StravaPage/Map"), {
  ssr: false,
});

const choseStreams = (streams: Stream[]) => {
  const orderOfPreference = [
    "heartrate",
    "altitude",
    "velocity_smooth",
    "cadence",
    "temp",
    "grade_smooth",
  ];
  // get top 2
  const top2: Stream[] = [];

  orderOfPreference.forEach((type) => {
    if (top2.length === 2) return;
    const stream = streams.find((stream) => stream.type === type);
    if (stream) top2.push(stream);
  });
  return top2;
};

export default function ActivityPage() {
  const [activity, setActivity] = useState<DetailedRun>();
  const router = useRouter();
  const [imperialSplit, setImperialSplit] = useState(false);
  const [detailedType, setDetailedType] = useState<"laps" | "splits" | "none">(
    "none"
  );
  const [allSegments, setAllSegments] = useState(false);
  const [allEfforts, setAllEfforts] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [streams, setStreams] = useState<Stream[]>([]);

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      if (LoginData.isLoggedIn()) return;
      await LoginData.getStorage();
      if (!LoginData.isLoggedIn()) {
        router.push("/strava/login");
      }
    };
    checkIfLoggedIn();

    const { pid } = router.query;
    if (!pid || typeof pid !== "string") return;
    const getDetailedActivity = async () => {
      // check local storage
      const { data, expirationTime, comments, streams } = JSON.parse(
        localStorage.getItem(pid) || "{}"
      );
      if (
        data &&
        comments &&
        streams &&
        expirationTime &&
        Date.now() < expirationTime
      ) {
        setActivity(data);
        setComments(comments);
        setStreams(choseStreams(streams));
        return;
      }

      const response = await getActivityStream(pid);
      setStreams(choseStreams(response));

      const res = await getActivity(pid);
      const com = await getActivityComments(pid);

      if (!res || !com || !response) {
        console.log("Error getting activity");
        router.push("/strava/");
        return;
      }

      setActivity(res);
      setComments(com);

      localStorage.setItem(
        pid,
        JSON.stringify({
          data: res,
          expirationTime: Date.now() + 1000 * 60 * 60 * 24 * 7,
          comments: com,
          streams: response,
        })
      );
    };
    getDetailedActivity();
  }, [router]);

  if (!activity)
    return (
      <PageWrapper
        page="Activity"
        className="flex flex-col items-center justify-center h-screen p-8 "
      >
        <h1 className="text-4xl font-bold">Loading...</h1>
      </PageWrapper>
    );

  return (
    <PageWrapper
      page={activity?.name || "Activity"}
      className="flex flex-col items-center justify-start min-h-screen gap-16 p-8 pt-16 overflow-x-hidden text-center sm:pt-8 sm:p-16"
    >
      <div className="flex items-center w-full justify-evenly">
        <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">{activity?.name}</h1>
        <p className="text-xl md:text-2xl">
          {new Date(activity.start_date_local).toLocaleDateString() +
            " " +
            new Date(activity.start_date_local).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            })}
        </p>
      </div>
      {activity.map.summary_polyline !== null &&
        activity.map.summary_polyline !== "" && (
          <div className="w-full md:px-16 lg:px-36">
            <div className="w-full overflow-hidden aspect-video rounded-3xl">
              <MapWithNoSSR map={activity.map} detailed />
            </div>
          </div>
        )}
      <div className="flex flex-row items-start justify-start w-full gap-4 sm:gap-8 md:px-16 lg:px-36">
        <p className="p-4 text-lg text-left text-black bg-gray-300 rounded-2xl grow min-h-20">
          {activity.description || "No Description"}
        </p>
        <div className="flex flex-col h-20 pt-4 text-black bg-gray-300 rounded-full aspect-square place-items-center">
          <p className="text-3xl">{activity.kudos_count}</p>
          <p className="text-xs">Kudos</p>
        </div>
      </div>

      <StatsCards
        activity={activity}
        streamTypes={[
          streams.map((str) => str.type)[0],
          streams.map((str) => str.type)[1],
        ]}
      />

      <Laps
        activity={activity}
        imperialSplit={imperialSplit}
        setImperialSplit={setImperialSplit}
        detailedType={detailedType}
        setDetailedType={setDetailedType}
      />
      {streams.length === 2 && (
        <div className="grid w-full gap-4 p-4 md:grid-cols-2 place-items-center">
          <StreamCard stream={streams[0]} activity={activity} />
          <StreamCard stream={streams[1]} activity={activity} />
        </div>
      )}

      <SegmentsCommentsCard
        activity={activity}
        comments={comments}
        allEfforts={allEfforts}
        setAllEfforts={setAllEfforts}
        allSegments={allSegments}
        setAllSegments={setAllSegments}
      />
    </PageWrapper>
  );
}
