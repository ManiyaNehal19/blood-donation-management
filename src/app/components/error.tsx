const ErrorAlert = ({ message }:{message:string}) => {
  return (
    <div className="fixed top-0 left-0 w-full bg-red-500 text-white text-center py-2 font-medium z-50">
      {message}
    </div>
  );
};

export default ErrorAlert;
