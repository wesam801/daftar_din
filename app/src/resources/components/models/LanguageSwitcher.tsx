import { useState } from "react";

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState<"en" | "ar">("en");

  return (
    <div>
      <button onClick={() => setLanguage("en")}>English</button>
      <button onClick={() => setLanguage("ar")}>العربية</button>
    </div>
  );
}
