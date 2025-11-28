import { Section } from "@/components/common/Section"

export const About = () => {
    // const services = [
    //     {
    //         icon: '',
    //         title: '',
    //         desc: ''
    //     },
    //     {
    //         icon: '',
    //         title: '',
    //         desc: ''
    //     },
    //     {
    //         icon: '',
    //         title: '',
    //         desc: ''
    //     },
    //     {
    //         icon: '',
    //         title: '',
    //         desc: ''
    //     },
    // ];

    return (
        <Section>
            <div className="flex flex-col justify-center items-center px-0 md:px-24">
                <div className="w-fit flex flex-col items-center my-5">
                    <h1 className="font-bold text-[19px] md:text-2xl">About</h1>
                    <p className="w-full md:w-[70%] text-center text-[13px] md:text-sm mt-1.5 md:mt-2.5">
                        At our core, we believe in quality, authenticity, and trust. Every product we offer is thoughtfully selected to ensure you receive only the best. Your satisfaction is our top priority.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row md:flex-nowrap justify-center gap-10 w-full mt-5">
                   
                </div>
                <div className="w-fit flex flex-col items-center my-5">
                    <h1 className="font-bold text-[19px] md:text-2xl">Why choose us</h1>
                    <p className="w-full md:w-[70%] text-center text-[13px] md:text-sm mt-1.5 md:mt-2.5">
                        At our core, we believe in quality, authenticity, and trust. Every product we offer is thoughtfully selected to ensure you receive only the best. Your satisfaction is our top priority.
                    </p>
                    <div className="grid grid-cols-2">

                    </div>
                </div>
            </div>
        </Section>
    )
}