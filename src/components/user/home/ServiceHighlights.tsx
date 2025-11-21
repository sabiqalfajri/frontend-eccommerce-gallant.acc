import { LiaShippingFastSolid } from "react-icons/lia";
import { GrSecure } from "react-icons/gr";
import { BsGem } from "react-icons/bs";
import { Section } from "@/components/common/Section";

export const ServiceHighlights = () => {
    const services = [
        { 
            icon: <BsGem size={23} />, 
            title: 'Best Material', 
            description: 'We use only premium and durable materials to ensure long-lasting quality in product.' 
        },
        { 
            icon: <LiaShippingFastSolid size={24} />, 
            title: 'Free Shipping', 
            description: 'Enjoy free nationwide shipping for all orders over $50—fast, reliable, and safe delivery.' 
        },
        { 
            icon: <GrSecure size={24} />, 
            title: 'Secure Payment', 
            description: 'Your payments are encrypted and protected with industry-leading security standards.'
        },
    ]

    return (
        <Section>
            <div className="flex flex-wrap justify-center items-center gap-5 md:gap-10">
                {services.map((serv) => (
                    <div className="w-70 flex flex-col justify-start items-center gap-y-2">
                        <div className="text-primary">
                            {serv.icon}
                        </div>
                        <h1 className="font-semibold">{serv.title}</h1>
                        <p className="text-sm text-center">{serv.description}</p>
                    </div>
                ))}
            </div>
        </Section>
    )
}