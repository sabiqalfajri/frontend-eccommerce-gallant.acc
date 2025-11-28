import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { FaXTwitter } from "react-icons/fa6"
import { FaTelegramPlane } from "react-icons/fa";
import { Section } from "@/components/common/Section";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, PhoneCall, Mail } from 'lucide-react';

export const Contact = () => {
    return (
        <Section>
            <div className="flex flex-col justify-center items-center px-0 md:px-24">
                <div className="w-fit flex flex-col items-center my-5">
                    <h1 className="font-bold text-[19px] md:text-2xl">Contact</h1>
                    <p className="w-full md:w-[70%] text-center text-[13px] md:text-sm mt-1.5 md:mt-2.5">
                        Need help with your order or want to know more about our products? Feel free to reach out to us anytime — our support team is happy to assist you.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row md:flex-nowrap justify-center gap-10 w-full mt-5">
                    <div className="order-1 px-1 md:px-4">
                        <form className="mt-3 flex flex-col gap-4">
                            <div className="flex flex-nowrap gap-2 md:gap-4 w-full">
                                <div className="flex flex-col gap-2 w-full">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input type="text" id="firstName" placeholder="Ex. John Doe" className="border p-2 w-full text-sm" />
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input type="text" id="lastName" placeholder="Ex. john@example.com" className="border p-2 w-full text-sm" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" placeholder="Ex. john@example.com" className="border p-2 w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input type="text" id="phone" placeholder="Enter Phone Number" className="border p-2 w-full text-sm" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" placeholder="Enter your message here..." className="border p-2 w-full text-sm h-24" />
                            </div>
                            <Button variant="primary" className="w-full mt-1.5">
                                Send Message
                            </Button>
                        </form>
                    </div>
                    <div className="order-2 flex flex-col gap-4">
                            <div>
                                <h1 className="font-semibold">Chat with us</h1>
                                <div className="flex flex-col gap-2 mt-3">
                                    <div className="flex flex-wrap items-center gap-2 text-sm">
                                        <FaTelegramPlane size={20} />
                                        <p className="underline">Message use on Telegram</p>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 text-sm">
                                        <FaXTwitter size={19} />
                                        <p className="underline">Message use on Telegram</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h1 className="font-semibold">Contact us</h1>
                                <div className="flex flex-col gap-2 mt-3">
                                    <div className="flex flex-wrap items-center gap-2 text-sm">
                                        <PhoneCall size={18} />
                                        <p className="underline">+6289630519380</p>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 text-sm">
                                        <Mail size={18} />
                                        <p className="underline">contact@example.com</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h1 className="font-semibold">Visit us</h1>
                                <p className="text-sm mt-1">Monday-Friday: 10.00 - 20.00</p>
                                <p className="text-sm">Saturday-Sunday: Closed</p>
                                <div className="flex flex-nowrap gap-2 items-center mt-2">
                                    <MapPin size={18} />
                                    <p className="w-[80%] md:w-60 text-sm">Jl. Stasiun, Gambarsari, Kec. Banyumas, Kabupaten Banyumas, Jawa Tengah</p>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </Section>
    )
}