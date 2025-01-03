import { jsPDF } from "jspdf";

export async function POST(req){
  try {
    const { text } = await req.json();

    if (!text) {
      return new Response(JSON.stringify({ error: "Text input is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const doc = new jsPDF();
    doc.text(text, 10, 10);
    const pdfBuffer = doc.output("arraybuffer");

    return new Response(
      JSON.stringify({
        pdf: Buffer.from(pdfBuffer).toString("base64"),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating PDF:", error.message);
    return new Response(
      JSON.stringify({ error: "Failed to generate PDF" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
