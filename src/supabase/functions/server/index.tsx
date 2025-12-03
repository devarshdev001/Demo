import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-bc6878db/health", (c) => {
  return c.json({ status: "ok" });
});

// Signup endpoint
app.post("/make-server-bc6878db/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, businessName, ownerName, phone, businessType, numberOfTables } = body;

    if (!email || !password || !businessName || !ownerName) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Create Supabase client with service role key
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        name: ownerName,
        businessName,
        phone,
        businessType,
        numberOfTables
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (authError) {
      console.log('Signup error during user creation:', authError);
      return c.json({ error: authError.message }, 400);
    }

    // Store business profile in KV store
    const userId = authData.user.id;
    await kv.set(`user:${userId}`, {
      email,
      businessName,
      ownerName,
      phone,
      businessType,
      numberOfTables,
      createdAt: new Date().toISOString(),
      plan: 'trial' // Default to trial plan
    });

    return c.json({ 
      success: true, 
      userId,
      message: "Account created successfully" 
    });
  } catch (error) {
    console.log('Signup error:', error);
    return c.json({ error: "Failed to create account" }, 500);
  }
});

// Login endpoint (handled by Supabase client-side, but we can validate sessions here if needed)
app.post("/make-server-bc6878db/login", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No access token provided" }, 401);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      console.log('Login validation error:', error);
      return c.json({ error: "Invalid session" }, 401);
    }

    // Get user profile from KV store
    const userProfile = await kv.get(`user:${user.id}`);

    return c.json({ 
      success: true,
      user: {
        id: user.id,
        email: user.email,
        ...userProfile
      }
    });
  } catch (error) {
    console.log('Login error:', error);
    return c.json({ error: "Failed to validate session" }, 500);
  }
});

// Contact form submission endpoint
app.post("/make-server-bc6878db/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, businessName, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Store contact submission in KV store
    const contactId = `contact:${Date.now()}:${email}`;
    await kv.set(contactId, {
      name,
      email,
      phone,
      businessName,
      subject,
      message,
      submittedAt: new Date().toISOString(),
      status: 'new'
    });

    console.log('Contact form submission stored:', contactId);

    return c.json({ 
      success: true,
      message: "Your message has been sent successfully" 
    });
  } catch (error) {
    console.log('Contact form error:', error);
    return c.json({ error: "Failed to send message" }, 500);
  }
});

// Get user profile (protected route)
app.get("/make-server-bc6878db/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "No access token provided" }, 401);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      console.log('Authorization error while fetching profile:', error);
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Get user profile from KV store
    const userProfile = await kv.get(`user:${user.id}`);

    if (!userProfile) {
      return c.json({ error: "Profile not found" }, 404);
    }

    return c.json({ 
      success: true,
      profile: {
        id: user.id,
        email: user.email,
        ...userProfile
      }
    });
  } catch (error) {
    console.log('Profile fetch error:', error);
    return c.json({ error: "Failed to fetch profile" }, 500);
  }
});

Deno.serve(app.fetch);