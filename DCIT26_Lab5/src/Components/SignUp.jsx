import logo from '../assets/Images/logo.png'

export const SignUp = ({
    signUpData,
    setSignUpData,
    submitSignUp,
    setFormView,
    errorMessage,
    successMessage,
    setErrorMessage,
    setSuccessMessage
}) => {
    return (
        <>
            <title>Sign Up</title>
            
            <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
                <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                    <div className="flex justify-center">
                        <img
                            src={logo}
                            className="rounded-full w-24 h-24 md:w-32 md:h-32 object-cover"
                            alt="logo"
                        />
                    </div>

                    <h2
                        className="text-white text-3xl md:text-4xl tracking-[-0.03em] drop-shadow-lg leading-tight font-vibes max-w-md"
                        style={{
                            textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
                            fontFamily: "cursive"
                        }}
                    >
                        Register now and be part of something amazing!
                    </h2>
                </div>

                <div className="w-full max-w-xs">
                    <form onSubmit={submitSignUp}>
                        <div className="flex flex-col justify-center w-full">
                            <label className="text-white mb-1 text-sm">
                                Enter your Name
                            </label>

                            <input
                                type="text"
                                value={signUpData.name}
                                onChange={(e) =>
                                    setSignUpData({
                                        ...signUpData,
                                        name: e.target.value
                                    })
                                }
                                className="bg-white p-3 px-4 rounded-lg w-full text-black mb-4 outline-none shadow-md"
                                placeholder="Name"
                            />

                            <label className="text-white mb-1 text-sm">
                                Enter your Email
                            </label>

                            <input
                                type="email"
                                value={signUpData.email}
                                onChange={(e) =>
                                    setSignUpData({
                                        ...signUpData,
                                        email: e.target.value
                                    })
                                }
                                className="bg-white p-3 px-4 rounded-lg w-full text-black mb-4 outline-none shadow-md"
                                placeholder="Email"
                            />

                            <label className="text-white mb-1 text-sm">
                                Enter your Username
                            </label>

                            <input
                                type="text"
                                value={signUpData.username}
                                onChange={(e) =>
                                    setSignUpData({
                                        ...signUpData,
                                        username: e.target.value
                                    })
                                }
                                className="bg-white p-3 px-4 rounded-lg w-full text-black mb-4 outline-none shadow-md"
                                placeholder="Username"
                            />

                            <label className="text-white mb-1 text-sm">
                                Enter your Password
                            </label>

                            <input
                                type="password"
                                value={signUpData.password}
                                maxLength={10}
                                onChange={(e) =>
                                    setSignUpData({
                                        ...signUpData,
                                        password: e.target.value
                                    })
                                }
                                className="bg-white p-3 px-4 rounded-lg w-full text-black mb-4 outline-none shadow-md"
                                placeholder="Password"
                            />

                            <label className="text-white mb-1 text-sm">Re-enter your Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={signUpData.confirmPassword}
                                maxLength={10}
                                onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                                className="bg-white p-3 px-4 rounded-lg w-full text-black mb-4 outline-none shadow-md"
                                placeholder="Confirm Password"
                            />

                            <label className="text-white mb-1 text-sm">
                                Enter your Phone Number
                            </label>

                            <input
                                type="text"
                                value={signUpData.phone}
                                onChange={(e) =>
                                    setSignUpData({
                                        ...signUpData,
                                        phone: e.target.value
                                    })
                                }
                                className="bg-white p-3 px-4 rounded-lg w-full text-black mb-4 outline-none shadow-md"
                                placeholder="Phone Number"
                            />

                            {errorMessage && (
                                <div className="bg-red-500/20 border border-red-400 text-red-200 text-sm p-3 rounded-md mb-4">
                                    {errorMessage}
                                </div>
                            )}

                            {successMessage && (
                                <div className="bg-green-500/20 border border-green-400 text-green-200 text-sm p-3 rounded-md mb-4">
                                    {successMessage}
                                </div>
                            )}

                            <div className="flex flex-row pt-2 gap-2">
                                <button
                                    type="submit"
                                    className="bg-[#8f703a] w-full cursor-pointer transition duration-200 rounded-sm p-3 text-white"
                                >
                                    Sign Up
                                </button>

                                <button
                                    type="button"
                                    className="bg-[#624d2d] w-full cursor-pointer transition duration-200 rounded-sm p-3 text-white"
                                    onClick={() => {
                                        setFormView("signin");
                                        setErrorMessage('');
                                        setSuccessMessage('');
                                    }}
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}