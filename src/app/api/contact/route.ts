import { NextResponse } from "next/server";
import { sendContactMessage } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    let body: any = null;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Geçersiz istek formatı." }, { status: 400 });
    }

    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const subject = typeof body?.subject === "string" ? body.subject.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Lütfen adınızı ve soyadınızı giriniz." }, { status: 400 });
    }

    if (!email || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json({ error: "Lütfen geçerli bir e-posta adresi giriniz." }, { status: 400 });
    }

    if (!subject || subject.length < 3) {
      return NextResponse.json({ error: "Lütfen bir konu belirtiniz." }, { status: 400 });
    }

    if (!message || message.length < 10) {
      return NextResponse.json({ error: "Mesajınız en az 10 karakter olmalıdır." }, { status: 400 });
    }

    // Send email via server-side transporter
    await sendContactMessage({ name, email, subject, message });

    return NextResponse.json({ success: true, message: "Mesajınız başarıyla iletildi. En kısa sürede geri dönüş yapacağız." });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Mesaj iletilirken bir hata oluştu. Lütfen doğrudan otizeka@gmail.com adresine yazınız." }, { status: 500 });
  }
}
