import { CardDashboard } from "@/components/admin/Card"
import { Button } from "@/components/ui/button"

export const CategoryDashboard = () => {

    return (
        <div className="flex flex-col gap-y-6">
            <div className="flex justify-end items-center">
                <Button variant="primary" className="h-10!">
                    + Add New Item
                </Button>
            </div>
            <CardDashboard title="Category List">
                <div></div>
            </CardDashboard>
        </div>
    )
}