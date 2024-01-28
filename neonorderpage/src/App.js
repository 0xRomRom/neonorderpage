import stl from "./App.module.css";
import supabase from "./supabase";
import { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";

function App() {
  const [logoData, setLogoData] = useState([]);

  useEffect(() => {
    const fetchLogoData = async () => {
      try {
        const { data, error } = await supabase
          .from("logo_samenstellen")
          .select("*");

        if (error) {
          throw error;
        }
        console.log(data);
        setLogoData(data || []);
      } catch (error) {
        console.error("Error fetching logo data:", error.message);
      }
    };

    fetchLogoData();
  }, []);

  const handleDownload = (fileFormat, base64String) => {
    const dataURL = `data:${fileFormat};base64,${base64String}`;

    const a = document.createElement("a");
    a.href = dataURL;
    a.download = `Logo_${new Date().toISOString()}.${fileFormat.split("/")[1]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className={stl.app}>
      <h1 className={stl.ordersHero}>Orders</h1>

      <ul className={stl.orderList}>
        {logoData
          .sort((a, b) => a.id - b.id)
          .map((logo, index) => (
            <li key={index} className={stl.order}>
              <span className={stl.dateSpan}>{logo.datum.slice(0, 10)}</span>
              <h2 className={stl.orderIdTitle}>Order ID: {logo.id}</h2>

              {renderRow("Naam", logo.naam)}
              {renderRow("Email", logo.email)}
              {renderRow("Beschrijving", logo.beschrijving)}
              {renderRow("Achterplaat Type", logo.achterplaat_type)}
              {renderRow("Achterplaat Vorm", logo.achterplaat_vorm)}
              {renderRow("Kleur LED", logo.kleur_led)}
              {renderRow("Soort LED", logo.soort_led)}
              {renderRow("Langste zijde", logo.langste_zijde)}
              {renderRow("Verhouding", logo.verhouding)}
              {renderRow("Montage", logo.montage)}
              {renderRow("Prijs schatting", logo.prijs_schatting)}

              <div className={stl.downloadRow}>
                <img
                  src={`data:${logo.file_format};base64,${logo.afbeelding64}`}
                  className={stl.orderImg}
                  alt={`Order ${logo.id} Image`}
                />

                <button
                  className={stl.dlBtn}
                  onClick={() =>
                    handleDownload(logo.file_format, logo.afbeelding64)
                  }
                >
                  <FiDownload />
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

function renderRow(label, value) {
  return (
    <div className={stl.row}>
      <span className={stl.pre}>{label}</span>
      <span className={stl.after}>{value}</span>
    </div>
  );
}

export default App;
