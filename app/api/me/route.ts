import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    // Get authenticated user from session cookie
    const supabase = createSupabaseServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ role: null });
    }

    // Use service role to bypass RLS and read profile
    const adminClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.SUPABASE_SERVICE_ROLE_KEY || ""
    );

    const { data: profile } = await adminClient
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    return NextResponse.json({ role: profile?.role ?? "member", userId: user.id });
  } catch {
    return NextResponse.json({ role: null });
  }
}
