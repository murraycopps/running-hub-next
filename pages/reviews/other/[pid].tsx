import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {other} from "@/scripts/other";
import {Other} from "@/scripts/types";
import PageWrapper from "@/components/PageWrapper";
import Stars from "@/components/Reviews/Stars";
import PageCard from "@/components/Reviews/Overview";
import SpecCard from "@/components/Reviews/SpecCard";
import FeaturesCard from "@/components/Reviews/Featuers";


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

        <PageWrapper page={item?.name || "Shoe"} className="flex flex-col justify-center h-screen overflow-y-auto w-screen px-32 py-16 item-center">
            {item ? (
                <div className="w-full h-full p-4 rounded-lg ">
                    <PageCard item={item}/>

                    <h1 className="flex justify-center w-full text-4xl slanted font-medium bg-ronchi-500 text-white p-4">Specs</h1>
                    <div className="flex flex-col h-full p-4 col-span-2">
                        <div className="p-4 text-xl font-medium text-center text-white grid grid-cols-4 gap-12">

                            {/*<SpecsCard item={itemm}/>*/}
                            <SpecCard info={item.brand} title={"Brand"}/>
                            <SpecCard info={item.use} title={"Best Use"}/>


                            {item?.features && item.features.length > 0 && (
                                <FeaturesCard features={item.features} />
                            )}
                        </div>
                        <h1 className="flex justify-center w-full text-4xl slanted font-medium bg-ronchi-500 text-white p-4">Review</h1>
                        <ReviewTextCard article={item}/>
                    </div>
                </div>
            ) : (
                <p>Sorry, no shoe found</p>
            )}


        </PageWrapper>
    )

}