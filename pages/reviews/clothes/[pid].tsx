import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {clothes} from "@/scripts/clothes";
import {Clothes} from "@/scripts/types";
import PageWrapper from "@/components/PageWrapper";
import FeaturesCard from "@/components/Reviews/Featuers";
import Overview from "@/components/Reviews/Overview";
import SpecCard from "@/components/Reviews/SpecCard";
import Stars from "@/components/Reviews/Stars";
import CreateReview from "@/components/Reviews/CreateReview";
import ReviewCard from "@/components/Reviews/Review";

export default function ShoesPage() {
    const router = useRouter();
    const {pid} = router.query;
    const [article, setArticle] = useState(null as Clothes | null);
    useEffect(() => {
        if (pid) {
            const article = clothes.find((article) => article.id == pid);
            if (!article) {
                router.back();
                return;
            }
            setArticle(article);
        }
    }, [pid]);
    if (!article) return <p>Sorry, no shoe found</p>


    return (
        <PageWrapper
            page={article.name || "Shoe"}
            className="flex flex-col w-screen min-h-screen gap-8 p-4 overflow-x-hidden sm:p-8 md:p-16 lg:px-32 item-center"
        >
            <Overview item={article}/>

            <h2 className="flex justify-center w-full p-4 text-3xl font-medium text-white sm:text-4xl slanted bg-ronchi-500">
                Specs/Review
            </h2>
            <div className="flex flex-col gap-8 px-8 lg:px-16">
                <div className="flex flex-wrap gap-8 px-8 text-xl font-medium text-center text-white justify-evenly">
                    {/*<SpecsCard item={article}/>*/}
                    <SpecCard info={article.brand} title={"Brand"}/>
                    <SpecCard info={article.use} title={"Best Use"}/>

                    {article?.features && article.features.length > 0 && (
                        <FeaturesCard features={article.features}/>
                    )}
                </div>
                {/*<h1 className="flex justify-center w-full p-4 text-4xl font-medium text-white slanted bg-ronchi-500">*/}
                {/*  Review*/}
                {/*</h1>*/}
                <p className="text-lg text-center text-white whitespace-pre-wrap sm:text-2xl">{article.review}</p>

            </div>
            <h2 className="flex justify-center w-full p-4 text-3xl font-medium text-white sm:text-4xl slanted bg-ronchi-500">
                User Reviews
            </h2>
            <div className="grid grid-cols-4 gap-4">
                {article.reviews.length > 0 ? article.reviews.map((review, i) => (
                    <ReviewCard review={review} key={i}/>
                )) : (
                    <p className="text-xl text-center text-white">No reviews yet</p>
                )}

                <CreateReview id={article.id} />
            </div>

        </PageWrapper>
    );
}
