const ErrorCard = ({ message }) => {
    return (
        <p className="text-sm text-red-500 text-center bg-red-100 py-2 rounded-md mt-4">
            {message}
        </p>
    );
};

export default ErrorCard;