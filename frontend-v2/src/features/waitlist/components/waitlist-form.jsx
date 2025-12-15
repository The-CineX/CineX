import { useState } from 'react';

function WaitlistForm() {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    userType: 'investor', // 'investor' or 'filmmaker'
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, you would send this to your backend
      console.log('Waitlist submission:', formData);
      
      setSubmitted(true);
      setFormData({ email: '', fullName: '', userType: 'investor' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('Failed to join waitlist. Please try again.');
      console.error('Submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-20 lg:pt-24 pb-24">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-16 text-center">
            <span className="inline-block mb-4 text-sm text-yellow-400 font-medium tracking-tighter">
              Early Access
            </span>
            <h1 className="font-heading mb-8 text-7xl lg:text-8xl text-white tracking-tighter">
              Join the Waitlist
            </h1>
            <p className="text-gray-300 text-lg">
              Be the first to access CineX when we launch. Get exclusive updates and early-bird benefits.
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-gradient-radial-dark border border-gray-900/30 rounded-3xl p-8 lg:p-12">
            {submitted ? (
              // Success Message
              <div className="text-center py-12">
                <div className="mb-6 flex justify-center">
                  <svg className="w-16 h-16 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl text-white font-bold mb-2">Welcome to CineX!</h3>
                <p className="text-gray-300 text-lg">
                  We've added you to our waitlist. Check your email for updates!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                {/* Full Name Field */}
                <div>
                  <label htmlFor="fullName" className="block text-sm text-gray-300 font-medium mb-3">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-6 py-3 bg-gray-900/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-300 font-medium mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full px-6 py-3 bg-gray-900/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                  />
                </div>

                {/* User Type Selection */}
                <div>
                  <label className="block text-sm text-gray-300 font-medium mb-3">
                    I'm interested as a...
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="userType"
                        value="investor"
                        checked={formData.userType === 'investor'}
                        onChange={handleChange}
                        className="w-4 h-4 text-yellow-400 bg-gray-900/30 border-gray-700 focus:ring-2 focus:ring-yellow-400"
                      />
                      <span className="ml-3 text-gray-300">Investor</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="userType"
                        value="filmmaker"
                        checked={formData.userType === 'filmmaker'}
                        onChange={handleChange}
                        className="w-4 h-4 text-yellow-400 bg-gray-900/30 border-gray-700 focus:ring-2 focus:ring-yellow-400"
                      />
                      <span className="ml-3 text-gray-300">Filmmaker</span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-8 bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 text-black font-bold rounded-lg transition duration-300 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Joining...
                    </>
                  ) : (
                    'Join the Waitlist'
                  )}
                </button>

                {/* Privacy Notice */}
                <p className="text-xs text-gray-400 text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WaitlistForm;
