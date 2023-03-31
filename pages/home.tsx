import Link from "next/link";
import Image from "next/image";
import PageWrapper from "@/components/PageWrapper";
import ShoeList from "@/components/HomePage/ShoeList";
import { shoes } from "@/scripts/shoes";
import { clothes } from "@/scripts/clothes";
import { other } from "@/scripts/other";
import { Item } from "@/scripts/types";
import ShoeCard from "@/components/Reviews/ShoeCard";
import Stars from "@/components/Reviews/Stars";
import { useEffect, useState } from "react";
import PacingCard from "@/components/HomePage/PacingCard";
import VdotCard from "@/components/HomePage/VdotCard";
import QuoteCard from "@/components/HomePage/QuoteCard";
import LinkCard from "@/components/HomePage/LinkCard";
import SlantedTitle from "@/components/HomePage/SlantedTitle";
import ItemCard from "@/components/Reviews/ItemCard";
import IntensityCard from "@/components/IntensityCard";
import {shoeslistrace} from "@/scripts/shoelist";
import {shoeslisttrain} from "@/scripts/shoelist";
// import Map from "@/components/Map";

import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('../components/Map'), {
  ssr: false,
});

const items = [
  { item: shoes[0], des: "Best Racer" },
  { item: shoes[1], des: "Best Track" },
  { item: shoes[5], des: "Best Trail" },
  { item: shoes[6], des: "Best Road" },
  { item: clothes[4], des: "Best Bottom" },
  { item: clothes[1], des: "Best Top" },
  // {item: other[0], des: "Best Watch"},
];

export default function HomePage() {
  const [randomItems, setRandomItems] = useState(
    [] as { item: Item; des: string }[]
  );

  useEffect(() => {
    setRandomItems(items.sort(() => Math.random() - 0.5));
    // make an interval that shifts the list
    // const interval = setInterval(() => {
    //     setRandomItems((prev) => {
    //         const newItems = [...prev];
    //         newItems.push(newItems.shift() as { item: Item; des: string });
    //         return newItems;
    //     });
    // }, 5000);
  }, []);

  return (
    <PageWrapper
      page="Home"
      className="flex flex-col items-center min-h-screen gap-16 p-16 text-center"
    >
      <h1 className="text-4xl font-bold">Welcome to my website!</h1>
      <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-3">
        <LinkCard
          title="Strava"
          description="Connect to Strava and view your stats"
          link="/strava/login"
          img="/review-cards/strava-icon.png"
        />
        <LinkCard
          title="Tools"
          description="Tools to help you with your running"
          link="/tools"
          img="/review-cards/clock-icon.svg"
        />
        <LinkCard
          title="Reviews"
          description="Reviews of running shoes and gear"
          link="/reviews"
          img="/review-cards/shoe.webp"
        />
      </div>
        <SlantedTitle title="Our Quotes" />
        <div className="grid w-full grid-cols-1 gap-4 place-items-center sm:grid-cols-2 lg:grid-cols-3">
          {/* <ShoeList shoes={shoeslistrace} /> */}
          <QuoteCard />
           {/* <ShoeList shoes={shoeslisttrain} /> */}
        </div>
      <SlantedTitle title="Our Reviews" />
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {randomItems.slice(0, 4).map(({ item, des }, i) => (
          <ItemCard item={item} des={des} key={i} />
        ))}
      </div>
      <SlantedTitle title="Our Tools" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <PacingCard />
        <VdotCard />
      </div>

      <IntensityCard />
        <MapWithNoSSR />
    </PageWrapper>
  );
}
const myMap = {
    "id": "a8793724789",
    "summary_polyline": "slj}Fn}~nLJOB@@GES?a@[eABUDA`@DNSRi@VQ~Ao@TOXa@Z_Ah@iAhCLn@Gh@Up@_@zBiAVKl@Qf@?XHJDb@^^Vf@h@l@x@p@l@Zf@\\`@rBvBb@TJAPMRc@Pi@|@{C^yBx@gDLkALk@NeAFaBW{E[cCQ{Bi@wDG_A[gCE}@@y@Nk@JSd@a@xAwBHEZc@j@{@|@mA\\[`@Sx@g@x@}@VI~AgAx@e@LQ~@eBn@k@f@U~@WnAWp@E\\BRDr@Sx@EpCc@x@ChC]xAe@h@@b@GL?t@Id@Cj@K`CWVKZAt@Oj@S^S\\_@Dm@@q@Iq@Ae@@eDEW@aAG{@CuCCwD@]DMRQ`@EfDFnDA^DqAQyCFcCFi@DYFIJE`@JvBCtBHdA?rAH|A@lBGxABRFbBKh@CBa@V_A\\mBRa@PI@m@De@JgAHSDiFh@aC`@e@De@@[DOF@Bc@A_@D}@Tw@LgBBOJSBQ?iATo@Ti@Xc@^[\\KPa@j@c@`@qBvAc@d@_@Zy@h@mAbA_@b@e@x@gArAk@~@}A`BUp@CXBXLv@\\pAd@rDNt@TjCHZBXA?@SECF^@vAPhBDbBDp@AhAOjBa@zAKr@S|@g@pCIt@{BnFUROSQq@_@[kBqBYe@k@i@k@w@qBwA]Qa@Ck@JuC~AqB`Aa@Dm@C",
    "resource_state": 2
  };