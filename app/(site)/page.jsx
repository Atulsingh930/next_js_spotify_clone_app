import { getHomePageDetails } from "@/services/HomeDetails";
import PageContent from "./components/PageContent";

export default async function Home() {
    try {
        const result = await getHomePageDetails();
        //console.log(1)
        if(result) {
            //console.log('result')
            return <PageContent homePageDetails={result}/>;
        }
    } catch (error) {
        //console.error(error);
    }
}
