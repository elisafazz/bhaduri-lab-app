import { createClient } from "@supabase/supabase-js";

// Fallbacks prevent build-time crashes; real values required at runtime via .env.local
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder"
);

export type UserRole = "admin" | "member";

export type Profile = {
  id: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
};

export type ChecklistItem = {
  id: string;
  member_id: string;
  checklist_type: "onboarding" | "offboarding";
  item_key: string;
  completed: boolean;
  completed_at: string | null;
  completed_by: string | null;
};

export async function getCurrentProfile(): Promise<Profile | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return data;
}

export async function getAllProfiles(): Promise<Profile[]> {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: true });

  return data ?? [];
}

export async function updateProfileActive(id: string, is_active: boolean) {
  return supabase.from("profiles").update({ is_active }).eq("id", id);
}

export async function getChecklistItems(memberId: string, type: "onboarding" | "offboarding"): Promise<ChecklistItem[]> {
  const { data } = await supabase
    .from("checklist_items")
    .select("*")
    .eq("member_id", memberId)
    .eq("checklist_type", type);

  return data ?? [];
}

export async function upsertChecklistItem(
  memberId: string,
  type: "onboarding" | "offboarding",
  itemKey: string,
  completed: boolean,
  completedBy: string
) {
  return supabase.from("checklist_items").upsert({
    member_id: memberId,
    checklist_type: type,
    item_key: itemKey,
    completed,
    completed_at: completed ? new Date().toISOString() : null,
    completed_by: completed ? completedBy : null,
  }, { onConflict: "member_id,checklist_type,item_key" });
}
