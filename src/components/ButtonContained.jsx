
const ButtonContained = ({ type, text, func }) => {
  return (
    <div>
      <button
        type={type}
        onClick={func}
        className="inline-flex text-white bg-brown-500 border border-brown-500 py-2 px-6 focus:outline-none hover:border-brown-600 hover:bg-brown-600 rounded"
      >
        {text}
      </button>
    </div>
  );
};

export default ButtonContained;
