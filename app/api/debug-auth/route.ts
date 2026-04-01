import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: NextRequest) {
  const results: Record<string, unknown> = {};

  // 1. What cookies does the server see?
  const cookieNames = req.cookies.getAll().map((c) => c.name);
  results.cookies = cookieNames;

  // 2. Try getUser() via SSR client
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.auth.getUser();
    results.getUser = { userId: data?.user?.id ?? null, email: data?.user?.email ?? null, error: error?.message ?? null };
  } catch (e) {
    results.getUser = { error: String(e) };
  }

  // 3. Try getSession() via SSR client
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.auth.getSession();
    results.getSession = { userId: data?.session?.user?.id ?? null, email: data?.session?.user?.email ?? null, error: error?.message ?? null };
  } catch (e) {
    results.getSession = { error: String(e) };
  }

  // 4. Direct service-role query on profiles
  try {
    const adminClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.SUPABASE_SERVICE_ROLE_KEY || ""
    );
    const { data, error } = await adminClient.from("profiles").select("*");
    results.allProfiles = { rows: data, error: error?.message ?? null };
  } catch (e) {
    results.allProfiles = { error: String(e) };
  }

  return NextResponse.json(results, { status: 200 });
}
