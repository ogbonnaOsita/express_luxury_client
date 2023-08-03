const ButtonOutlined = ({ type, text, func }) => {
  return (
    <div>
      <button
        type={type}
        onClick={func}
        className="inline-flex text-brown-500 border border-brown-500 py-2 px-6 focus:outline-none hover:text-white hover:bg-brown-500 rounded"
      >
        {text}
      </button>
    </div>
  );
};

export default ButtonOutlined;
