"use client";

import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { AIOutput, UserSubscription } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext';

function UsageTrack() {
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);
  const [maxWords, setMaxWords] = useState(10000); // Fix: initialize maxWords as state
  const {updateCreditUsage, setUpdateCreditUsage}=useContext(UpdateCreditUsageContext)

  useEffect(() => {
    if (user) {
      GetData();
      IsUserSubscribe(); // Move this outside of GetData
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      GetData();
    }
  }, [updateCreditUsage]);
  

  const GetData = async () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      const result = await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress));
      GetTotalUsage(result);
    }
  };

  const IsUserSubscribe = async () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      const result = await db
        .select()
        .from(UserSubscription)
        .where(eq(UserSubscription.email, user.primaryEmailAddress.emailAddress));

      if (result && result.length > 0) {
        setUserSubscription(true);
        setMaxWords(1000000); // Fix: call setMaxWords to update state
      }
    }
  };

  const GetTotalUsage = (result: AIOutput[]) => {
    let total = 0;
    result.forEach((element) => {
      total += Number(element.aiResponse?.length || 0);
    });
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
              width: `${(totalUsage / maxWords) * 100}%`, // dynamic width based on usage
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
