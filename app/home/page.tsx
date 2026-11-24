import HomeCarousel from "../components/home-carousel";
import FounderComponent from "../components/founder";
import ContractingComponent from "../components/contracting";
import AboutComponent from "../components/about";
import PhilosophyComponent from "../components/philosophyComponent";
import AboutContinuedComponent from "../components/aboutContinued";
import ShippingComponent from "../components/shipping";
import ExpertiseComponent from "../components/expertise";
import ContactComponent from "../components/contact";

export default function HomePage() {
    return (
        <div className="">
            <div className="bg-[#101c24] py-4">
                <HomeCarousel />
            </div>
            <FounderComponent />
            <ContractingComponent />
            <AboutComponent />
            <PhilosophyComponent />         
            <AboutContinuedComponent />
            <ShippingComponent />
            <ExpertiseComponent />
            <ContactComponent />
        </div>
    );
}
