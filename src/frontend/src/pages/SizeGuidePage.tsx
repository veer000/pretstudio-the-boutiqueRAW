const sizeData = [
  {
    size: "XS",
    us: "0-2",
    uk: "4-6",
    chest: "31-32",
    waist: "24-25",
    hips: "33-34",
    kameezLength: "50-52",
  },
  {
    size: "S",
    us: "4-6",
    uk: "8-10",
    chest: "33-34",
    waist: "26-27",
    hips: "35-36",
    kameezLength: "52-53",
  },
  {
    size: "M",
    us: "8-10",
    uk: "12-14",
    chest: "35-36",
    waist: "28-30",
    hips: "37-38",
    kameezLength: "53-54",
  },
  {
    size: "L",
    us: "12-14",
    uk: "16-18",
    chest: "37-38",
    waist: "31-33",
    hips: "39-40",
    kameezLength: "54-55",
  },
  {
    size: "XL",
    us: "16",
    uk: "20",
    chest: "39-41",
    waist: "34-36",
    hips: "41-43",
    kameezLength: "55-56",
  },
  {
    size: "XXL",
    us: "18-20",
    uk: "22-24",
    chest: "42-44",
    waist: "37-39",
    hips: "44-46",
    kameezLength: "56-57",
  },
  {
    size: "3XL",
    us: "22-24",
    uk: "26-28",
    chest: "45-47",
    waist: "40-42",
    hips: "47-49",
    kameezLength: "57-58",
  },
];

const measurementSteps = [
  {
    step: "Chest",
    desc: "Measure around the fullest part of your chest, keeping the tape parallel to the floor.",
  },
  {
    step: "Waist",
    desc: "Measure around your natural waistline, the narrowest part of your torso.",
  },
  {
    step: "Hips",
    desc: "Measure around the fullest part of your hips, about 7-9 inches below your waistline.",
  },
  {
    step: "Kameez Length",
    desc: "Measure from the top of your shoulder to where you want the hem to fall.",
  },
];

const brandNotes = [
  { brand: "Sapphire", note: "True to size. Standard Pakistani sizing." },
  {
    brand: "Khaadi",
    note: "Runs slightly larger. Consider sizing down for slim fit.",
  },
  {
    brand: "Maria B",
    note: "Fitted silhouettes — size up if in between sizes.",
  },
  {
    brand: "Gul Ahmed",
    note: "True to size for unstitched; check stitching instructions for stitched.",
  },
  {
    brand: "Bonanza Satrangi",
    note: "Generous sizing — true to size or size down.",
  },
  {
    brand: "Asim Jofa",
    note: "Semi-fitted — true to size. Check measurements for formal pieces.",
  },
];

export default function SizeGuidePage() {
  return (
    <main className="min-h-screen">
      <div className="bg-emerald-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            Find Your Perfect Fit
          </span>
          <h1 className="font-heading text-4xl font-bold mt-2">Size Guide</h1>
          <p className="text-emerald-100 mt-2">
            All measurements in inches unless noted
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* How to Measure */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl font-bold mb-6">
            How to Measure
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {measurementSteps.map((item, stepIndex) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-5 border border-border flex gap-4"
              >
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700 font-bold flex-shrink-0">
                  {stepIndex + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.step}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Size Chart */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl font-bold mb-4">
            PretStudio Size Chart
          </h2>
          <p className="text-muted-foreground text-sm mb-4">
            All measurements in inches. If you're between sizes, we recommend
            sizing up.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-2xl overflow-hidden">
              <thead>
                <tr className="bg-emerald-700 text-white">
                  <th className="px-4 py-3 text-left">Size</th>
                  <th className="px-4 py-3">US Size</th>
                  <th className="px-4 py-3">UK Size</th>
                  <th className="px-4 py-3">Chest</th>
                  <th className="px-4 py-3">Waist</th>
                  <th className="px-4 py-3">Hips</th>
                  <th className="px-4 py-3">Kameez Length</th>
                </tr>
              </thead>
              <tbody>
                {sizeData.map((row, rowIndex) => (
                  <tr
                    key={row.size}
                    className={
                      rowIndex % 2 === 0 ? "bg-white" : "bg-emerald-50"
                    }
                  >
                    <td className="px-4 py-3 font-bold text-emerald-700">
                      {row.size}
                    </td>
                    <td className="px-4 py-3 text-center text-muted-foreground">
                      {row.us}
                    </td>
                    <td className="px-4 py-3 text-center text-muted-foreground">
                      {row.uk}
                    </td>
                    <td className="px-4 py-3 text-center">{row.chest}"</td>
                    <td className="px-4 py-3 text-center">{row.waist}"</td>
                    <td className="px-4 py-3 text-center">{row.hips}"</td>
                    <td className="px-4 py-3 text-center">
                      {row.kameezLength}"
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Brand Notes */}
        <section>
          <h2 className="font-heading text-2xl font-bold mb-4">
            Brand-Specific Notes
          </h2>
          <div className="space-y-3">
            {brandNotes.map((item) => (
              <div
                key={item.brand}
                className="flex gap-3 bg-white rounded-xl p-4 border border-border"
              >
                <span className="font-bold text-emerald-700 text-sm w-32 flex-shrink-0">
                  {item.brand}
                </span>
                <span className="text-sm text-muted-foreground">
                  {item.note}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
