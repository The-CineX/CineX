import { Link } from 'react-router-dom';
import { getRouteByName } from '@app/router';

/**
 * Main site footer with links and branding
 */
function Footer() {
  return (
    <>
      {/* Learn to Code CTA Section */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="relative pt-20 px-4 bg-gray-900/20 overflow-hidden rounded-6xl">
            <div className="text-center md:max-w-xl mx-auto pb-20">
              <span className="inline-block mb-4 text-sm text-yellow-400 font-medium tracking-tighter">
                Join CineX Today
              </span>
              <h2 className="font-heading mb-6 text-7xl text-white tracking-8xl">
                Ready to launch a public campaign or form a private Co-EP funding pool?
              </h2>
              <a
                className="mb-8 text-gray-300 relative z-10 hover:text-white transition-colors duration-200"
                href="https://cinex.app/register"
                target="_blank"
                rel="noopener noreferrer"
              >
                cinex.app/register
              </a>
              <img
                className="absolute -bottom-24 right-0 z-0"
                src="/images/lines2.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-50 overflow-hidden">
        <div className="py-14 bg-black rounded-b-7xl"></div>
        <div className="py-24">
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap justify-center -m-8 mb-28">
              <div className="w-full md:w-1/2 lg:w-4/12 p-8">
                <div className="md:max-w-xs">
                  <img className="mb-7" src="/images/logo-dark.png" alt="" />
                  <p className="text-gray-400 font-medium">
                    Decentralized Crowdfunding and Collaborative Private Pools for the next generation of cinema, powered by Stacks.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-2/12 p-8">
                <h3 className="mb-6 text-lg text-black font-medium">Quick Links</h3>
                <ul>
                  <li className="mb-2.5">
                    <Link
                      className="inline-block text-lg font-medium text-gray-400 hover:text-black transition duration-300"
                      to={getRouteByName('active-pools')}
                    >
                      Active Pools
                    </Link>
                  </li>
                  <li className="mb-2.5">
                    <Link
                      className="inline-block text-lg font-medium text-gray-400 hover:text-black transition duration-300"
                      to={getRouteByName('waitlist')}
                    >
                      Waitlist
                    </Link>
                  </li>
                  <li className="mb-2.5">
                    <Link
                      className="inline-block text-lg font-medium text-gray-400 hover:text-black transition duration-300"
                      to={getRouteByName('about')}
                    >
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link
                       className="inline-block text-lg font-medium text-gray-400 hover:text-black transition duration-300"
                      to={getRouteByName('contact')}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-1/2 lg:flex-1 p-8">
                <div className="flex flex-wrap -m-2">
                  <div className="w-full p-2">
                    <a className="block py-5 px-8 bg-white rounded-full" href="#">
                      <div className="flex flex-wrap items-center -m-2">
                        <div className="w-auto p-2">
                          <img src="/images/footers/twitter.svg" alt="" />
                        </div>
                        <div className="flex-1 p-2">
                          <p className="text-black">Follow us on Twitter for updates</p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="w-full p-2">
                    <a className="block py-5 px-8 bg-white rounded-full" href="#">
                      <div className="flex flex-wrap items-center -m-2">
                        <div className="w-auto p-2">
                          <img src="/images/footers/instagram.svg" alt="" />
                        </div>
                        <div className="flex-1 p-2">
                          <p className="text-black">Follow us on Instagram for updates</p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="w-full p-2">
                    <a className="block py-5 px-8 bg-white rounded-full" href="#">
                      <div className="flex flex-wrap items-center -m-2">
                        <div className="w-auto p-2">
                          <img src="/images/footers/tiktok.svg" alt="" />
                        </div>
                        <div className="flex-1 p-2">
                          <p className="text-black">Follow us on TikTok for updates</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-between -m-2">
              <div className="w-auto p-2">
                <p className="inline-block text-sm font-medium text-black/60">© {new Date().getFullYear()} CineX</p>
              </div>
              <div className="w-auto p-2">
                <div className="flex flex-wrap items-center -m-2 sm:-m-7">
                  <div className="w-auto p-2 sm:p-7">
                    <a className="inline-block text-sm text-black/60 hover:text-black font-medium transition duration-300" href="#">
                      Terms of Use
                    </a>
                  </div>
                  <div className="w-auto p-2 sm:p-7">
                    <a className="inline-block text-sm text-black/60 hover:text-black font-medium transition duration-300" href="#">
                      Privacy Policy
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
