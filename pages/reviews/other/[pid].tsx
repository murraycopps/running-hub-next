import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { other } from "@/scripts/other";
import { Other } from "@/scripts/types";
import PageWrapper from "@/components/PageWrapper";
import Overview from "@/components/Reviews/Overview";
import SpecCard from "@/components/Reviews/SpecCard";
import FeaturesCard from "@/components/Reviews/Featuers";
import Stars from "@/components/Reviews/Stars";
import ReviewCard from "@/components/Reviews/Review";

export default function ShoesPage() {
  const router = useRouter();
  const { pid } = router.query;
  const [item, setItem] = useState(null as Other | null);
  useEffect(() => {
    if (pid) {
      const item = other.find((other) => other.id == pid);
      if (!item) {
        router.back();
        return;
      }
      setItem(item);
    }
  }, [pid]);

  return (
    <PageWrapper
      page={item?.name || "Shoe"}
      className="flex flex-col justify-center w-screen min-h-screen px-32 py-16 overflow-x-hidden item-center"
    >
      {item ? (
        <div className="w-full h-full p-4 rounded-lg ">
          <Overview item={item} />

          <h1 className="flex justify-center w-full p-4 text-4xl font-medium text-white slanted bg-ronchi-500">
            Specs
          </h1>
          <div className="flex flex-col h-full col-span-2 p-4">
            <div className="grid grid-cols-4 gap-12 p-4 text-xl font-medium text-center text-white">
              {/*<SpecsCard item={itemm}/>*/}
              <SpecCard info={item.brand} title={"Brand"} />
              <SpecCard info={item.use} title={"Best Use"} />

              {item?.features && item.features.length > 0 && (
                <FeaturesCard features={item.features} />
              )}
            </div>
            <h1 className="flex justify-center w-full p-4 text-4xl font-medium text-white slanted bg-ronchi-500">
              Review
            </h1>
            <p className="text-xl text-center text-white">{item.review}</p>
          </div>
          <h1 className="flex justify-center w-full p-4 text-4xl font-medium text-white slanted bg-ronchi-500">
            User Reviews
          </h1>
          <div className="grid grid-cols-4 gap-4">
            {item.reviews.length > 0 ? item.reviews.map((review, i) => (
                <ReviewCard review={review} key={i}/>
            )) : (
                <p className="text-xl text-center text-white">No reviews yet</p>
            )}
          </div>
        </div>
      ) : (
        <p>Sorry, no shoe found</p>
      )}
    </PageWrapper>
  );
}
