function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#fff8f3]">
      <main className="max-w-md mx-auto p-5">
        {children}
      </main>
    </div>
  );
}

export default Layout;