export default function OverviewLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full w-full px-4">
            {children}
        </div>
    );
}
