import Image from "next/image";
import GSA from "../../public/NewGSALogo.png";
import DVBE from "../../public/DVBE_1792472.png";
import HubZone from "../../public/hubzone.png";
import SDVOSB from "../../public/SDVOSB.png";
import NASPO from "../../public/naspo-logo.svg";

export default function CredentialsComponent() {
    return (
        <div className="bg-linear-to-r from-slate-400/25 via-slate-200/20 to-blue-600/25 flex flex-col md:flex-row items-center justify-center py-4">
            
                <div className="px-4">
                    <Image 
                        src={ GSA } 
                        alt="GSA Logo" 
                        className="w-38.75"
                    />
                </div>
                
                <div className="p-4">
                    <Image 
                        src={ DVBE } 
                        alt="GSA Logo" 
                        className="w-48.75"
                    />
                </div>
                
                <div className="px-4">
                    <Image 
                        src={ HubZone } 
                        alt="GSA Logo" 
                        className="w-76.25"
                    />
                </div>
                
                <div className="px-4">
                    <Image 
                        src={ SDVOSB } 
                        alt="GSA Logo"
                        className="w-38.75" 
                        />
                </div>
                
                <div className="px-4">
                    <Image 
                        src={ NASPO } 
                        alt="GSA Logo" 
                        className="w-48.75"
                        
                        />
                </div>
            
        </div>
    );
}
