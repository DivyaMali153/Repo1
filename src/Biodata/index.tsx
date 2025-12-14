import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/* ================= TYPES ================= */

type KakaKaku = {
  काका: string;
  काकू: string;
};

type BahiniPahune = {
  बहिण: string;
  पाहुणे: string;
};

type SimpleArrayKeys = "भाऊ" | "मामा" | "इतर";

type BiodataState = {
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
  बहिणी: BahiniPahune[];
  भाऊ: string[];
  मामा: string[];
  इतर: string[];

  पत्ता: string;
};

/* ================= COMPONENT ================= */

export default function BiodataFormMarathi() {
  const [showPreview, setShowPreview] = useState(false);

  const [data, setData] = useState<BiodataState>({
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

  /* ================= HANDLERS ================= */

  const handleChange = <K extends keyof BiodataState>(
    key: K,
    value: BiodataState[K]
  ) => {
    setData({ ...data, [key]: value });
  };

  const handleArrayChange = (
    key: SimpleArrayKeys,
    index: number,
    value: string
  ) => {
    const updated = [...data[key]];
    updated[index] = value;
    setData({ ...data, [key]: updated });
  };

  const addField = (key: SimpleArrayKeys) => {
    setData({ ...data, [key]: [...data[key], ""] });
  };

  const handleKakaKakuChange = (
    index: number,
    field: keyof KakaKaku,
    value: string
  ) => {
    const updated = [...data.काका];
    updated[index][field] = value;
    setData({ ...data, काका: updated });
  };

  const addKakaKaku = () => {
    setData({
      ...data,
      काका: [...data.काका, { काका: "", काकू: "" }]
    });
  };

  const handleBahiniPahuneChange = (
    index: number,
    field: keyof BahiniPahune,
    value: string
  ) => {
    const updated = [...data.बहिणी];
    updated[index][field] = value;
    setData({ ...data, बहिणी: updated });
  };

  const addBahiniPahune = () => {
    setData({
      ...data,
      बहिणी: [...data.बहिणी, { बहिण: "", पाहुणे: "" }]
    });
  };

  const downloadPDF = () => {
    const input = document.getElementById("biodata-preview");
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

  /* ================= STYLES ================= */

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  };

  const sectionStyle = { marginBottom: "12px" };

  /* ================= JSX ================= */

  return (
    <div style={{ padding: "20px" }}>
      {/* FORM */}
      {!showPreview && (
        <div style={{ maxWidth: "650px", margin: "auto" }}>
          <h2 style={{ textAlign: "center" }}>मराठी बायोडाटा फॉर्म</h2>

          {([
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
          ] as [string, keyof BiodataState][]).map(([label, key]) => (
            <input
              key={String(key)}
              placeholder={label}
              value={data[key] as string}
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
                  onChange={(e) =>
                    handleKakaKakuChange(i, "काका", e.target.value)
                  }
                  style={inputStyle}
                />
                <input
                  placeholder="काकू नाव"
                  value={pair.काकू}
                  onChange={(e) =>
                    handleKakaKakuChange(i, "काकू", e.target.value)
                  }
                  style={inputStyle}
                />
              </div>
            ))}
            <button onClick={addKakaKaku}>➕ आणखी जोडा</button>
          </div>

          {/* BAHINI / PAHUNE */}
          <div style={sectionStyle}>
            <strong>बहिण / पाहुणे</strong>
            {data.बहिणी.map((pair, i) => (
              <div key={i}>
                <input
                  placeholder="बहिणीचे नाव"
                  value={pair.बहिण}
                  onChange={(e) =>
                    handleBahiniPahuneChange(i, "बहिण", e.target.value)
                  }
                  style={inputStyle}
                />
                <input
                  placeholder="पाहुण्याचे नाव"
                  value={pair.पाहुणे}
                  onChange={(e) =>
                    handleBahiniPahuneChange(i, "पाहुणे", e.target.value)
                  }
                  style={inputStyle}
                />
              </div>
            ))}
            <button onClick={addBahiniPahune}>➕ आणखी जोडा</button>
          </div>

          {/* SIMPLE ARRAYS */}
          {(["भाऊ", "मामा", "इतर"] as SimpleArrayKeys[]).map((section) => (
            <div key={section} style={sectionStyle}>
              <strong>{section}</strong>
              {data[section].map((val, i) => (
                <input
                  key={i}
                  value={val}
                  onChange={(e) =>
                    handleArrayChange(section, i, e.target.value)
                  }
                  style={inputStyle}
                />
              ))}
              <button onClick={() => addField(section)}>➕ आणखी जोडा</button>
            </div>
          ))}

          <input
            placeholder="संपूर्ण पत्ता"
            value={data.पत्ता}
            onChange={(e) => handleChange("पत्ता", e.target.value)}
            style={inputStyle}
          />

          <button
            onClick={() => setShowPreview(true)}
            style={{ width: "100%", padding: "12px", marginTop: "10px" }}
          >
            बायोडाटा तयार करा
          </button>
        </div>
      )}

      {/* PREVIEW */}
      {showPreview && (
        <>
          <div id="biodata-preview" style={{ padding: "20px" }}>
            {(Object.entries(data) as [
              keyof BiodataState,
              BiodataState[keyof BiodataState]
            ][]).map(([key, val]) =>
              Array.isArray(val) ? (
                key === "काका" ? (
                  (val as KakaKaku[]).map((p, i) => (
                    <p key={i}>
                      <b>काका:</b> {p.काका} | <b>काकू:</b> {p.काकू}
                    </p>
                  ))
                ) : key === "बहिणी" ? (
                  (val as BahiniPahune[]).map((p, i) => (
                    <p key={i}>
                      <b>बहिण:</b> {p.बहिण} | <b>पाहुणे:</b> {p.पाहुणे}
                    </p>
                  ))
                ) : (
                  (val as string[]).map(
                    (v, i) =>
                      v && (
                        <p key={i}>
                          <b>{key}:</b> {v}
                        </p>
                      )
                  )
                )
              ) : (
                <p key={String(key)}>
                  <b>{key}:</b> {val}
                </p>
              )
            )}
          </div>

          <div style={{ textAlign: "center" }}>
            <button onClick={downloadPDF}>📄 PDF डाउनलोड करा</button>
          </div>
        </>
      )}
    </div>
  );
}
