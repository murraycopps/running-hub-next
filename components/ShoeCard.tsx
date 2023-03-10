import { Shoe } from "@/scripts/types";
import Link from "next/link";

export default function Reviews({shoe} : {shoe: Shoe}) {

    return (
        <section className="text-white rounded-lg bg-slate-400 w-128">
            <div className="flex items-center m-5">
                <Link className="w-full no-underline " href="/shoes/{shoe.id}">
                    <div className="shoe">
                        <div className="flex-col items-center mx-auto my-0">
                            <h2 className="shoeblockTitle">{shoe.name}</h2>
                            <img className="object-cover w-full h-64 my-16 "src={shoe.img} alt={shoe.name} height="300" width="300"/>
                        </div>
                        <span className="box-content block w-full h-0 m-2 border-solid border-y-2 border-dark"/>

                        <div className="flex w-full justify-evenly">
                            <div>
                                <p><span className="text-xs font-bold">Price:</span></p>
                                <p className="m-0 text-xl ">${shoe.price}</p>
                            </div>

                            <div>
                                <p><span className="text-xs font-bold">Best Use:</span></p>
                                <p className="m-0 text-xl ">{shoe.bestUse}</p>
                            </div>

                            <div>
                                <p><span className="text-xs font-bold">Surface:</span></p>
                                <p className="m-0 text-xl ">{shoe.surface}</p>
                            </div>

                            <div>
                                <p><span className="text-xs font-bold">Rating:</span></p>
                                <p className="m-0 text-xl "><span className="text-yellow-500">{shoe.rating}</span></p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    )
}