import { Section } from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { GoMail } from "react-icons/go";

export const NewsLetter = () => {
    return (
        <Section wrapperClassName="bg-primary h-[35vh] flex justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 justify-around w-full items-center text-white">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-bold">Join our newsletter</h1>
                    <p className="text-sm">Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and the latest trends.</p>
                    {/* Action */}
                    <div className="grid grid-cols-[8%_1fr] items-center px-2 bg-white rounded-sm text-black py-2 gap-2.5 w-full md:w-[75%] mt-2">
                        <div className="w-full flex justify-center items-center">
                            <GoMail size={24} />
                        </div>
                        <div className="flex flex-nowrap gap-x-2">
                            <Input className="h-10 p-0 border-none focus-visible:ring-0" placeholder="Your Email" />
                            <Button size="lg" className="bg-primary py-1 px-2 rounded-sm text-white w-24">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="hidden md:flex flex-nowrap gap-x-2 items-center justify-end">
                    <img src="" alt="" />
                </div>
            </div>
        </Section>
    )
}