import { useWindowSize } from "@/hooks/universal/useWindowSize"
import { AccountMobileLayout } from "./AccountMobileLayout";
import { AccountDesktopLayout } from "./AccountDesktopLayout";
import { NavbarUser } from "@/components/user/NavbarUser";

export const UserAccountLayout = () => {
    const { isMobile } = useWindowSize();

    return (
        <>
            <NavbarUser />
            {isMobile ? <AccountMobileLayout /> : <AccountDesktopLayout />}
        </>
    )
}