const PrimaryBtn = ({ children, ...props }:any) => {
  return (
    <button
      {...props}
      className="bg-black py-3 px-8 rounded-3xl text-white text-base font-bold w-full transition duration-600 ease-in-out hover:bg-primary-dark ">
      {children}
    </button>
  );
};

export default PrimaryBtn;
