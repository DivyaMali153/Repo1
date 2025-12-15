import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type KakaKaku = { काका: string; काकू: string };
type BahinPahune = { बहिण: string; पाहुणे: string };

interface Biodata {
  नाव: string;
  जन्मतारीख: string;
  जन्मवेळ: string;
  जन्मस्थळ: string;
  जन्मवार: string;
  शिक्षण: string;
  वर्ण: string;
  कुळ: string;
  गोत्र: string;
  मामाकुळ: string;
  मोबाईल: string;
  वडील: string;
  आई: string;
  आजी: string;
  आजोबा: string;

  काका: KakaKaku[];
  बहिणी: BahinPahune[];
  भाऊ: string[];
  मामा: string[];
  इतर: string[];

  पत्ता: string;
}

export default function BiodataFormMarathi() {
  const [showPreview, setShowPreview] = useState(false);

  const [data, setData] = useState<Biodata>({
    नाव: "",
    जन्मतारीख: "",
    जन्मवेळ: "",
    जन्मस्थळ: "",
    जन्मवार: "",
    शिक्षण: "",
    वर्ण: "",
    कुळ: "",
    गोत्र: "",
    मामाकुळ: "",
    मोबाईल: "",
    वडील: "",
    आई: "",
    आजी: "",
    आजोबा: "",

    काका: [{ काका: "", काकू: "" }],
    बहिणी: [{ बहिण: "", पाहुणे: "" }],
    भाऊ: [""],
    मामा: [""],
    इतर: [""],

    पत्ता: ""
  });

  const handleChange = <K extends keyof Biodata>(key: K, value: Biodata[K]) => {
    setData((prev) => ({ ...prev, [key]: value } as Biodata));
  };

  // used for simple string arrays (भाऊ, मामा, इतर)
  const handleArrayChange = (key: keyof Biodata, index: number, value: string) => {
    const current = data[key];
    if (Array.isArray(current) && (typeof current[0] === "string" || current.length === 0)) {
      const updated = [...(current as string[])];
      updated[index] = value;
      setData((prev) => ({ ...prev, [key]: updated } as Biodata));
    }
  };

  const handleKakaKakuChange = (index: number, field: keyof KakaKaku, value: string) => {
    const updated = data.काका.map((item) => ({ ...item }));
    updated[index] = { ...updated[index], [field]: value };
    setData((prev) => ({ ...prev, काका: updated } as Biodata));
  };

  const addKakaKaku = () => {
    setData((prev) => ({ ...prev, काका: [...prev.काका, { काका: "", काकू: "" }] } as Biodata));
  };

  const handleBahiniPahuneChange = (index: number, field: keyof BahinPahune, value: string) => {
    const updated = data.बहिणी.map((item) => ({ ...item }));
    updated[index] = { ...updated[index], [field]: value };
    setData((prev) => ({ ...prev, बहिणी: updated } as Biodata));
  };

  const addBahiniPahune = () => {
    setData((prev) => ({ ...prev, बहिणी: [...prev.बहिणी, { बहिण: "", पाहुणे: "" }] } as Biodata));
  };

  const addField = (key: "भाऊ" | "मामा" | "इतर") => {
    setData((prev) => ({ ...prev, [key]: [...(prev[key] as string[]), ""] } as Biodata));
  };

  const downloadPDF = () => {
    const input = document.getElementById("biodata-preview") as HTMLElement | null;
    if (!input) return;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      const width = 210;
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("Marathi_Biodata.pdf");
    });
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px",
    marginBottom: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  };

  const sectionStyle: React.CSSProperties = { marginBottom: "12px" };

  const simpleFields: [string, keyof Biodata][] = [
    ["नाव", "नाव"],
    ["जन्म तारीख", "जन्मतारीख"],
    ["जन्म वेळ", "जन्मवेळ"],
    ["जन्म स्थळ", "जन्मस्थळ"],
    ["जन्म वार", "जन्मवार"],
    ["शिक्षण", "शिक्षण"],
    ["वर्ण", "वर्ण"],
    ["कुळ", "कुळ"],
    ["गोत्र", "गोत्र"],
    ["मामाकुळ", "मामाकुळ"],
    ["मोबाईल नंबर", "मोबाईल"],
    ["वडिलांचे नाव", "वडील"],
    ["आईचे नाव", "आई"],
    ["आजीचे नाव", "आजी"],
    ["आजोबांचे नाव", "आजोबा"]
  ];

  return (
    <div style={{ padding: "20px" }}>

      {/* FORM */}
      {!showPreview && (
        <div
          style={{
            maxWidth: "650px",
            margin: "auto",
            padding: "20px",
            borderRadius: "12px",
            backgroundImage: "url('./src/Biodata/flower.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div style={{ background: "rgba(255,255,255,0.9)", padding: "20px", borderRadius: "10px" }}>

            {/* GANPATI */}
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <img
                src="./src/Biodata/ganpati.jpg"
                alt="Ganpati"
                style={{ width: "90px", height: "100px", borderRadius: "50%" }}
              />
            </div>

            <h2 style={{ textAlign: "center" }}>मराठी बायोडाटा फॉर्म</h2>

            {simpleFields.map(([label, key]) => (
              <input
                key={String(key)}
                placeholder={label}
                value={String(data[key] ?? "")}
                onChange={(e) => handleChange(key, e.target.value as any)}
                style={inputStyle}
              />
            ))}

            {/* KAKA / KAKU */}
            <div style={sectionStyle}>
              <strong>काका / काकू</strong>
              {data.काका.map((pair, i) => (
                <div key={i}>
                  <input
                    placeholder="काका नाव"
                    value={pair.काका}
                    onChange={(e) => handleKakaKakuChange(i, "काका", e.target.value)}
                    style={inputStyle}
                  />
                  <input
                    placeholder="काकू नाव"
                    value={pair.काकू}
                    onChange={(e) => handleKakaKakuChange(i, "काकू", e.target.value)}
                    style={inputStyle}
                  />
                </div>
              ))}
              <button onClick={addKakaKaku}>➕ आणखी जोडा</button>
            </div>

            {/* BAHIN / PAHUNE */}
            <div style={sectionStyle}>
              <strong>बहिण / पाहुणे</strong>
              {data.बहिणी.map((pair, i) => (
                <div key={i}>
                  <input
                    placeholder="बहिणीचे नाव"
                    value={pair.बहिण}
                    onChange={(e) => handleBahiniPahuneChange(i, "बहिण", e.target.value)}
                    style={inputStyle}
                  />
                  <input
                    placeholder="पाहुण्याचे नाव"
                    value={pair.पाहुणे}
                    onChange={(e) => handleBahiniPahuneChange(i, "पाहुणे", e.target.value)}
                    style={inputStyle}
                  />
                </div>
              ))}
              <button onClick={addBahiniPahune}>➕ आणखी जोडा</button>
            </div>

            {/* SIMPLE ARRAYS */}
            {(["भाऊ", "मामा", "इतर"] as (keyof Biodata)[]).map((section) => (
              <div key={String(section)} style={sectionStyle}>
                <strong>{section}</strong>
                {((data[section] as string[]) || []).map((val, i) => (
                  <input
                    key={i}
                    value={val}
                    placeholder={`${section} नाव`}
                    onChange={(e) => handleArrayChange(section, i, e.target.value)}
                    style={inputStyle}
                  />
                ))}
                <button onClick={() => addField(section as "भाऊ" | "मामा" | "इतर")}>➕ आणखी जोडा</button>
              </div>
            ))}

            {/* ADDRESS – LAST */}
            <input
              placeholder="संपूर्ण पत्ता"
              value={data.पत्ता}
              onChange={(e) => handleChange("पत्ता", e.target.value)}
              style={inputStyle}
            />

            <button
              onClick={() => setShowPreview(true)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "10px",
                background: "#d63384",
                color: "#fff",
                border: "none",
                borderRadius: "8px"
              }}
            >
              बायोडाटा तयार करा
            </button>
          </div>
        </div>
      )}

      {/* PREVIEW */}
      {showPreview && (
        <>
          <div
            id="biodata-preview"
            style={{
              maxWidth: "780px",
              margin: "20px auto",
              padding: "25px",
              border: "10px solid #f9c2d7",
              backgroundImage: "url('./src/Biodata/flower.jpg')",
              backgroundSize: "cover"
            }}
          >
            <div style={{ background: "rgba(255,255,255,0.57)", padding: "20px" }}>

              {/* GANPATI */}
              <div style={{ textAlign: "center", marginBottom: "8px" }}>
                <img
                  src="./src/Biodata/ganpati.jpg"
                  alt="Ganpati"
                  style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                />
              </div>

              <h4 style={{ textAlign: "center" }}>|| श्री गणेशाय नम: ||</h4>
              <h2 style={{ textAlign: "center" }}>बायोडाटा</h2>

              {(Object.entries(data) as [keyof Biodata, Biodata[keyof Biodata]][]).map(([key, val]) => {
                if (Array.isArray(val)) {
                  if (key === "काका") {
                    const arr = val as KakaKaku[];
                    return arr.map((p, i) => (
                      <p key={`${String(key)}-${i}`}><b>काका:</b> {p.काका} | <b>काकू:</b> {p.काकू}</p>
                    ));
                  }
                  if (key === "बहिणी") {
                    const arr = val as BahinPahune[];
                    return arr.map((p, i) => (
                      <p key={`${String(key)}-${i}`}><b>बहिण:</b> {p.बहिण} | <b>पाहुणे:</b> {p.पाहुणे}</p>
                    ));
                  }

                  const arr = val as string[];
                  return arr.filter(Boolean).map((v, i) => (
                    <p key={`${String(key)}-${i}`}><b>{key}:</b> {v}</p>
                  ));
                }

                return <p key={String(key)}><b>{key}:</b> {String(val)}</p>;
              })}

              {data.पत्ता && (
                <p>
                  <b>पत्ता:</b> {data.पत्ता}
                </p>
              )}
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <button onClick={downloadPDF}>📄 PDF डाउनलोड करा</button>
          </div>
        </>
      )}
    </div>
  );
}
