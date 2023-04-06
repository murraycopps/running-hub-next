import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {other} from "@/scripts/other";
import {Other} from "@/scripts/types";
import PageWrapper from "@/components/PageWrapper";
import Stars from "@/components/Reviews/Stars";
import PageCard from "@/components/Reviews/PageCard";
import SpecsCard from "@/components/Reviews/SpecsCard";
import FeaturesCard from "@/components/Reviews/FeatuersCard";
import ReviewTextCard from "@/components/Reviews/ReviewTextCard";


export default function ShoesPage() {
    const router = useRouter();
    const {pid} = router.query;
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

        <PageWrapper page={item?.name || "other"} className="flex flex-col justify-center min-h-screen mx-32 my-4 item-center">
            {item ? (
                <div className="w-4/5 h-full p-4 m-4 rounded-lg grid grid-cols-3 bg-slate-400 min-w-fit">
                   <PageCard item={item}/>

                    <div className="flex flex-col h-full p-4 col-span-2">
                        <div className="flex flex-wrap p-4 m-4 text-xl font-medium text-center text-white border-4 border-solid rounded-lg grid-cols-5 gap-6 leading-6 justify-evenly flex-2 bg-slate-400 border-base">
                            <SpecsCard item={item}/>
                            {/* div with dispkayt fkex to display optional features */}
                            {item?.features && item.features.length > 0 && (
                            <FeaturesCard features={item.features} />
                        )}

                        </div>

                        <ReviewTextCard article={item} />
                    </div>
                </div>
            ) : (
                <p>Sorry, no shoe found</p>
            )}


        </PageWrapper>
    )

}