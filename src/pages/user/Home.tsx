import { BestSellers } from "@/components/user/home/BestSellers";
import { CategoryHome } from "@/components/user/home/CategoryHome";
import { HomeBanner } from "@/components/user/home/HomeBanner";
import { NewArrivals } from "@/components/user/home/NewArrivals";
import { NewsLetter } from "@/components/user/home/NewsLetter";
import { ServiceHighlights } from "@/components/user/home/ServiceHighlights";
import { useToken } from "@/hooks/universal/useToken";

export const Home = () => {
    const { token } = useToken();
    console.log("Token di Home:", token);

    return (
        <div className="flex flex-col gap-y-12 justify-center items-center">
            <HomeBanner />
            <CategoryHome />
            <NewArrivals />
            <BestSellers />
            <NewsLetter />
            <ServiceHighlights />
        </div>
    )
}