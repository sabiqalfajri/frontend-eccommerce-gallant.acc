interface SectionProps {
    children: React.ReactNode;
    wrapperClassName?: string;
    containerClassName?: string;
}

export const Section = ({
    children,
    wrapperClassName,
    containerClassName
}: SectionProps) => {
    return (
        <section className={`w-full px-2.5 md:px-16 py-3 ${wrapperClassName}`}>
            <div className={`container mx-auto ${containerClassName}`}>
                {children}
            </div>
        </section>
    )
}