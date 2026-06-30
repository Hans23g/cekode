// supabaseClient.js
// Supabase Configuration File for Toko Hana Groceries PWA
// Connects to Project URL: https://srijrxtgjutdpdnxdxlb.supabase.co
// Using Anon Key: sb_publishable_NU_jx6fNLzgQ9a1SOXLoOQ_b_rWqtAS

const supabaseUrl = "https://srijrxtgjutdpdnxdxlb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyaWpyeHRnanV0ZHBkbnhkeGxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2NDU1MDEsImV4cCI6MjA5ODIyMTUwMX0.QyRnC_l-AtqXF8EW3hCCNDV_U2x4mG4VqpSolu-rTNw";

let supabaseClient = null;

// Initialize Supabase client lazily once the CDN script has evaluated on window
function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;
  if (window.supabase) {
    const { createClient } = window.supabase;
    supabaseClient = createClient(supabaseUrl, supabaseKey);
    console.log("Supabase client successfully initialized!");
    return supabaseClient;
  }
  console.warn("Supabase JS library not loaded on window yet.");
  return null;
}

// Unified Service Object for Database Operations
const supabaseService = {
  // 1. READ Products
  getProducts: async () => {
    const client = getSupabaseClient();
    if (!client)
      return {
        data: null,
        error: new Error("Supabase client not initialized"),
      };

    try {
      const { data, error } = await client
        .from("products")
        .select("*")
        .order("id", { ascending: false });
      return { data, error };
    } catch (e) {
      console.error("getProducts error:", e);
      return { data: null, error: e };
    }
  },

  // 2. CREATE Product
  insertProduct: async (product) => {
    const client = getSupabaseClient();
    if (!client)
      return {
        data: null,
        error: new Error("Supabase client not initialized"),
      };

    try {
      const { data, error } = await client
        .from("products")
        .insert([product])
        .select();
      return { data, error };
    } catch (e) {
      console.error("insertProduct error:", e);
      return { data: null, error: e };
    }
  },

  // 3. UPDATE Product
  updateProduct: async (id, updates) => {
    const client = getSupabaseClient();
    if (!client)
      return {
        data: null,
        error: new Error("Supabase client not initialized"),
      };

    try {
      const { data, error } = await client
        .from("products")
        .update(updates)
        .eq("id", id)
        .select();
      return { data, error };
    } catch (e) {
      console.error("updateProduct error:", e);
      return { data: null, error: e };
    }
  },

  // 4. DELETE Product
  deleteProduct: async (id) => {
    const client = getSupabaseClient();
    if (!client)
      return {
        data: null,
        error: new Error("Supabase client not initialized"),
      };

    try {
      const { data, error } = await client
        .from("products")
        .delete()
        .eq("id", id);
      return { data, error };
    } catch (e) {
      console.error("deleteProduct error:", e);
      return { data: null, error: e };
    }
  },

  // 5. AUTH - Sign In (Using Admin Credentials)
  signIn: async (email, password) => {
    const client = getSupabaseClient();
    if (!client)
      return {
        data: null,
        error: new Error("Supabase client not initialized"),
      };

    try {
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password,
      });
      return { data, error };
    } catch (e) {
      console.error("signIn error:", e);
      return { data: null, error: e };
    }
  },

  // 6. AUTH - Sign Out
  signOut: async () => {
    const client = getSupabaseClient();
    if (!client)
      return {
        data: null,
        error: new Error("Supabase client not initialized"),
      };

    try {
      const { error } = await client.auth.signOut();
      return { error };
    } catch (e) {
      console.error("signOut error:", e);
      return { error: e };
    }
  },

  // 7. AUTH - Get Current User / Session Status
  getUser: async () => {
    const client = getSupabaseClient();
    if (!client)
      return {
        user: null,
        error: new Error("Supabase client not initialized"),
      };

    try {
      const {
        data: { user },
        error,
      } = await client.auth.getUser();
      return { user, error };
    } catch (e) {
      console.error("getUser error:", e);
      return { user: null, error: e };
    }
  },

  // 8. REALTIME SUBSCRIPTION FOR PRODUCTS
  subscribeProducts: (onUpdateCallback) => {
    const client = getSupabaseClient();
    if (!client) {
      console.warn("Realtime subscription skipped: Client not ready.");
      return null;
    }

    try {
      const channel = client
        .channel("realtime-products-changes")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "products" },
          (payload) => {
            console.log("Realtime change received:", payload);
            onUpdateCallback(payload);
          },
        )
        .subscribe();

      return channel;
    } catch (e) {
      console.error("subscribeProducts error:", e);
      return null;
    }
  },
};

// Make it available on window
window.supabaseService = supabaseService;
