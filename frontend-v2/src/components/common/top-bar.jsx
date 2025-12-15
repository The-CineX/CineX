function TopBar() {
  return (
    <aside className="py-4 topbar text-black text-center relative z-10">
      Don't Have An Account?{' '}
      <a
        href="https://www.pixelrocket.store"
        className="underline hover:no-underline"
      >
        Create Account
      </a>
    </aside>
  );
}

export default TopBar;
