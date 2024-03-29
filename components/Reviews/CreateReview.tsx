import ReviewsHand from "@/scripts/ReviewsHand";
import {ChangeEvent, SyntheticEvent, useEffect, useRef, useState} from "react";
import LoginData from "@/scripts/LoginData";
import Link from "next/link";
import {useRouter} from "next/router";

export default function CreateReview({id}: { id: string}) {
    const [reviewText, setReviewText] = useState("");
    const [title, setTitle] = useState("");
    const inputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setReviewText(e.target.value);
    }
    const [rating, setRating] = useState(-1);
    const ref = useRef<HTMLFormElement>(null);
    const router = useRouter();

const [loggedIn, setLoggedIn] = useState(false);
    const route = router.route.replace("[pid]", router.query.pid as string)
    useEffect(() => {
        const checkIfLoggedIn = async () => {
            await LoginData.getStorage();
            setLoggedIn(LoginData.isLoggedIn());
        };
        checkIfLoggedIn();
    }, []);

const addReview = async (e: SyntheticEvent) => {
    e.preventDefault();
    // get the title and author from the form
    const formDate = new FormData(e.target as HTMLFormElement);
    const title = formDate.get("title")?.toString() || "";
    const author = formDate.get("author")?.toString() || "";

if(!LoginData.isLoggedIn()){
    alert("You must be logged in to add a review");
    return;
}

    const review = {
        id,
        title,
        author: LoginData.getUsername(),
        review: reviewText,
        rating


    }
    console.log(review);
    if (!title || !reviewText || rating < 0 || rating > 5) {
        console.log("invalid review");
        return;

    }
    ReviewsHand.addReview(review);
//     clear the form`
    setReviewText("");
    setRating(0);
    if (ref.current) {
        ref.current.reset();
    }
    router.reload();
    //
    // const state = {
    //     chars_left: 200,
    // }
    //
    // const handleCharCount = (event: { target: { value: string | any[]; }; }) => {
    //     const charCount = event.target.value.length;
    //     const charLeft = 140 - charCount;
    //     this.setState({chars_left: charLeft});
    //
    // }
}

    return (

        <div className="relative flex flex-col items-center justify-center gap-2 card-slant-lg lg:col-end-5 lg:col-start-3 lg:row-start-1 lg:row-end-3">
            {!loggedIn && (
                <div className="absolute inset-0 z-10 grid place-items-center">

                <Link href={`/login?route=${route}`} className="w-40 px-8 py-4 text-2xl text-center  rounded-xl hover:rounded-3xl transition-all-300 bg-rose-500 hover:bg-rose-600">Login</Link>
                </div>


            )}

        <div
            className={` ${!loggedIn && "blur-sm"} flex flex-col gap-2 px-20 py-4 w-full  bg-wisteria-600 `}>

            <form onSubmit={addReview} className="flex flex-col items-center gap-4 p-8 justify-evenly sm:w-full" ref={ref}>

                <h2 className="text-4xl font-semibold text-center">Create Review</h2>

                <input type="text" name="title" id="title" required maxLength={50}
                       onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                       className="w-full p-2 text-xl placeholder-gray-300 border-2 rounded-md  bg-wisteria-600 border-wisteria-500"
                       placeholder="Title"/>
                {/*<span className="charLeft ">*/}
                {/*              {50 - title.length} characters*/}
                {/*              </span>*/}
                {title.length >= 50 && <span className="text-red-500">Title must be less than 50 characters</span>}

                <textarea value={reviewText}
                          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setReviewText(e.target.value)}
                          maxLength={250} required
                          className="w-full h-32 p-2 text-xl placeholder-gray-300 border-2 rounded-md bg-wisteria-600 border-wisteria-500"
                          placeholder="Write your review here..."></textarea>
                          <span className="charLeft ">
                              {250 - reviewText.length} characters
                              </span>

                <div className="flex flex-col items-center justify-center gap-2">
                    {/*<label htmlFor="rating" className="text-xl font-medium">Rating:</label>*/}
                    <StarRating rating={rating} setRating={setRating}/>
                </div>
                <button type="submit"
                        className="px-20 py-4 text-2xl font-semibold text-white border-2 rounded-md  bg-ronchi-500 border-ronchi-400">Submit
                </button>

            </form>
        </div>
        </div>
    )
}

const StarRating = ({rating, setRating}: {rating: number; setRating: (rating: number) => void} ) =>(
    <div className="flex flex-row items-center justify-center gap-2">
        {[1,2,3,4,5].map((num) =>(
            <button key={num} onClick={() => setRating(num)} type="button" className={`text-4xl ${num <= rating ? "text-yellow-500" : "text-gray-200"}`}>★</button>
        ))}
    </div>

)