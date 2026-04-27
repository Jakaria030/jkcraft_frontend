const Row = ({ label, children }) => (
    <div className="flex items-center justify-between gap-2">
        <label className="text-sm w-28 flex-shrink-0 font-medium text-gray-600">{label}</label>
        {children}
    </div>
);

export default Row;