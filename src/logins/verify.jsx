import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const VerifyAccount = () => {
  return (
    <>
      {/* Pages: Sign In: Boxed */}

      {/* Page Container */}
      <div
        id="page-container"
        className="flex flex-col mx-auto w-full min-w-[320px] bg-gray-100"
      >
        {/* Page Content */}
        <main id="page-content" className="flex flex-auto flex-col max-w-full lg:h-[59.8vh]">
          <div className=" h-full flex items-center justify-center relative overflow-hidden max-w-10xl mx-auto p-4 lg:p-8 w-full">
            {/* Sign In Section */}
            <section className="py-6 w-full max-w-xl">
              {/* Header */}
              {/* <header className="mb-5 text-center">
                <h1 className="text-2xl font-bold inline-flex items-center mb-2 space-x-2">
                  <span>Password Recovery</span>
                </h1>
                <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Please enter your correct email address
                </h2>
              </header> */}
              {/* END Header */}

              {/* Sign In Form */}
              <div className="flex flex-col rounded-lg shadow-sm bg-white overflow-hidden">
                <div className="p-5 md:px-16 md:py-12 grow">
                  <div className="flex flex-col items-center text-center">
                    <img src="/assets/success.png" className="h-[60px] mb-3" />
                    <h4 className="font-semibold text-base">
                      Account created successfully!
                    </h4>
                    <p className="text-sm my-1">
                      A confirmation email has been sent to you
                    </p>
                    <p className="text-sm">
                      Please check your email to verify your account
                    </p>
                    <Link
                      to="/"
                      className=" mt-3 font-medium rounded-md px-6 py-2 bg-brown-500 text-white hover:bg-brown-600"
                    >
                      Homepage
                    </Link>
                  </div>
                </div>
              </div>
              {/* END Sign In Form */}
            </section>
            {/* END Sign In Section */}
          </div>
        </main>
        {/* END Page Content */}
      </div>
      {/* END Page Container */}

      {/* END Pages: Sign In: Boxed */}
      <Footer />
    </>
  );
};

export default VerifyAccount;
