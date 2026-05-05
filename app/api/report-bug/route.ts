import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY || "placeholder");
  try {
    const { description, name } = await req.json();

    if (!description?.trim()) {
      return NextResponse.json({ error: "Description required" }, { status: 400 });
    }

    const reporter = typeof name === "string" && name.trim() ? name.trim() : "(anonymous)";

    await resend.emails.send({
      from: "Bhaduri Lab App <onboarding@resend.dev>",
      to: "elisafazzari815@gmail.com",
      subject: "Bhaduri Lab App — Bug Report",
      text: `A bug was reported on bhaduri-lab.elisafazzari.com.\n\nFrom: ${reporter}\n\n${description}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Bug report error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
