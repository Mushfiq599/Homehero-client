export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button onClick={toggleTheme} className="btn btn-secondary">
      {dark ? 'Light' : 'Dark'}
    </button>
  );
}