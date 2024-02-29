import stl from "./App.module.css";
import supabase from "./supabase";
import { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";

function App() {
  const [logoData, setLogoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogoData = async () => {
      try {
        const { data, error } = await supabase
          .from("logo_samenstellen")
          .select(
            "id,datum,prijs_schatting,langste_zijde,soort_led,kleur_led,achterplaat_type,achterplaat_vorm,montage,naam,email,beschrijving,verhouding,file_format"
          );

        if (error) {
          throw error;
        }

        setLogoData(data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching logo data:", error.message);
      }
    };

    fetchLogoData();
  }, []);

  const handleDownload = async (fileFormat, id) => {
    let imgString = "";

    try {
      const { data, error } = await supabase
        .from("logo_samenstellen")
        .select("afbeelding64")
        .eq("id", id);

      imgString = data[0].afbeelding64;

      if (error) {
        throw new Error(error);
      }
    } catch (error) {
      console.error("Error fetching logo data:", error.message);
    }

    const dataURL = `data:${fileFormat};base64,${imgString}`;

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
        {loading && (
          <div className={stl.ripple}>
            <div></div>
            <div></div>
          </div>
        )}

        {!loading && (
          <>
            {logoData
              .sort((a, b) => b.id - a.id)
              .map((logo, index) => (
                <li key={index} className={stl.order}>
                  <span className={stl.dateSpan}>
                    {logo.datum.slice(0, 10)}
                  </span>
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
                    {/* <img
                      src={`data:${logo.file_format};base64,${logo.afbeelding64}`}
                      className={stl.orderImg}
                      alt={`Order ${logo.id}`}
                    /> */}

                    <button
                      className={stl.dlBtn}
                      onClick={() => handleDownload(logo.file_format, logo.id)}
                    >
                      <FiDownload />
                    </button>
                  </div>
                </li>
              ))}
          </>
        )}
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
