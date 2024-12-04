import stl from "./App.module.css";
import supabase from "./supabase";
import { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";

function App() {
  const [logoData, setLogoData] = useState([]);
  const [configData, setConfigData] = useState([]);
  const [formLoading, setFormLoading] = useState(true);
  const [configLoading, setConfigLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Form");

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
        setFormLoading(false);
      } catch (error) {
        console.error("Error fetching logo data:", error.message);
      }
    };

    fetchLogoData();
  }, []);

  useEffect(() => {
    if (activeTab === "Config" && configData.length === 0) {
      const fetchConfigData = async () => {
        try {
          const { data, error } = await supabase
            .from("textconfigurator")
            .select(
              "id,datum,text,lettertype,kleur,lengte,achterpaneel_kleur,achterpaneel_vorm,montage_methode,opmerkingen,prijs"
            );

          if (error) {
            throw error;
          }
          console.log(data);
          setConfigData(data || []);
          setConfigLoading(false);
        } catch (error) {
          console.error("Error fetching logo data:", error.message);
        }
      };

      fetchConfigData();
    }
  }, [activeTab]);

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

      <div className={stl.tabs}>
        <button
          className={activeTab === "Form" ? stl.activeCta : ""}
          onClick={() => setActiveTab("Form")}
        >
          Bestel Formulier
        </button>
        <button
          className={activeTab === "Config" ? stl.activeCta : ""}
          onClick={() => setActiveTab("Config")}
        >
          Text Configurator
        </button>
      </div>

      {activeTab === "Form" && (
        <>
          {formLoading ? (
            <div className={stl.ripple}>
              <div></div>
              <div></div>
            </div>
          ) : (
            <table className={stl.table}>
              <thead>
                <tr>
                  <th>Datum</th>
                  <th>Naam</th>
                  <th>Email</th>
                  <th>Beschrijving</th>
                  <th>Type</th>
                  <th>Vorm</th>
                  <th>LED</th>
                  <th>Type</th>
                  <th>Langste</th>
                  <th>Verhouding</th>
                  <th>Montage</th>
                  <th>Schatting</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {logoData
                  .sort((a, b) => b.id - a.id)
                  .map((logo) => (
                    <tr key={logo.id}>
                      <td>{logo.datum.slice(0, 10)}</td>
                      <td>{logo.naam}</td>
                      <td>{logo.email}</td>
                      <td className={!logo.beschrijving ? stl.gray : ""}>
                        {logo.beschrijving || "Geen"}
                      </td>
                      <td>{logo.achterplaat_type}</td>
                      <td>{logo.achterplaat_vorm}</td>
                      <td
                        className={logo.kleur_led === "N.v.t." ? stl.gray : ""}
                      >
                        {logo.kleur_led}
                      </td>
                      <td>{logo.soort_led}</td>
                      <td>{logo.langste_zijde}</td>
                      <td className={!logo.verhouding ? stl.gray : ""}>
                        {logo.verhouding || "Geen"}
                      </td>
                      <td>{logo.montage}</td>
                      <td>€{logo.prijs_schatting},-</td>
                      <td>
                        <button
                          className={stl.dlBtn}
                          onClick={() =>
                            handleDownload(logo.file_format, logo.id)
                          }
                        >
                          <FiDownload />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </>
      )}
      {activeTab === "Config" && (
        <>
          {configLoading ? (
            <div className={stl.ripple}>
              <div></div>
              <div></div>
            </div>
          ) : (
            <table className={stl.table}>
              <thead>
                <tr>
                  <th>Datum</th>
                  <th>Text</th>
                  <th>Lettertype</th>
                  <th>Opmerkingen</th>
                  <th>Lengte</th>
                  <th>Paneel Kleur</th>
                  <th>Paneel Vorm</th>
                  <th>Montage</th>
                  <th>Kleur</th>
                  <th>Prijs</th>
                </tr>
              </thead>
              <tbody>
                {configData
                  .sort((a, b) => b.id - a.id)
                  .map((logo) => (
                    <tr key={logo.id}>
                      <td>{logo.datum.slice(0, 10)}</td>
                      <td>{logo.text}</td>
                      <td>{logo.lettertype}</td>
                      <td className={!logo.opmerkingen ? stl.gray : ""}>
                        {logo.opmerkingen || "Geen"}
                      </td>
                      <td>{logo.lengte}cm</td>
                      <td>{logo.achterpaneel_kleur}</td>
                      <td>{logo.achterpaneel_vorm}</td>
                      <td>{logo.montage_methode}</td>
                      <td>{logo.kleur}</td>
                      <td>€{logo.prijs},-</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

export default App;
