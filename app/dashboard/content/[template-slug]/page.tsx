"use client";

import React from 'react';
import { useUser } from '@clerk/nextjs'; // Import useUser from Clerk
import { db } from '@/utils/db'; // Ensure correct path
import { AIOutput } from '@/utils/schema'; // Ensure correct path

const SaveInDb = async (formData: string, slug: string, aiResp: string) => {
  const { user } = useUser(); // Get the user object

  if (!user?.primaryEmailAddress?.emailAddress) {
    throw new Error("User email is not available");
  }

  const result = await db.insert(AIOutput).values({
    formData,
    templateSlug: slug,
    aiResponse: aiResp,
    createdBy: user.primaryEmailAddress.emailAddress,
    createdAt: new Date().toISOString(),
  });

  return result;
};

export default SaveInDb;
