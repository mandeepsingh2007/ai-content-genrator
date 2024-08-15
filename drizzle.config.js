/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:PmeUbOvH8Vi4@ep-aged-forest-a51kopk4.us-east-2.aws.neon.tech/AI-Content-Generator-new?sslmode=require',
    }
  };