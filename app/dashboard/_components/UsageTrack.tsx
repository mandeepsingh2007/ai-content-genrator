"use client";

import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import React, { useContext, useCallback, useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { AIOutput, UserSubscription } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext';

interface AIOutputData {
  aiResponse?: string | null;
  // Add other fields if necessary
}

function UsageTrack() {
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);
  const [maxWords, setMaxWords] = useState(10000);
  const { updateCreditUsage } = useContext(UpdateCreditUsageContext);

  const GetData = useCallback(async () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      const result = await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress));
      GetTotalUsage(result);
    }
  }, [user]);

  const IsUserSubscribe = useCallback(async () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      const result = await db
        .select()
        .from(UserSubscription)
        .where(eq(UserSubscription.email, user.primaryEmailAddress.emailAddress));

      if (result && result.length > 0) {
        setUserSubscription(true);
        setMaxWords(1000000);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      GetData();
      IsUserSubscribe();
    }
  }, [user, GetData, IsUserSubscribe]);

  useEffect(() => {
    if (user) {
      GetData();
    }
  }, [updateCreditUsage, GetData, user]);

  const GetTotalUsage = (result: AIOutputData[]) => {
    const total = result.reduce((acc, element) => acc + (element.aiResponse?.length || 0), 0);
    setTotalUsage(total);
  };

  return (
    <div className="m-5">
      <div className="bg-primary text-white rounded-lg p-3">
        <h2 className="font-medium">Credits</h2>
        <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">
          <div
            className="h-2 bg-white rounded-full"
            style={{
              width: `${(totalUsage / maxWords) * 100}%`,
            }}
          ></div>
        </div>
        <h2 className="text-sm my-2">{totalUsage}/{maxWords} credit used</h2>
      </div>
      <Button variant={'secondary'} className="w-full my-3">
        Upgrade
      </Button>
    </div>
  );
}

export default UsageTrack;
