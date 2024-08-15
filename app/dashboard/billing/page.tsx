"use client";

import React, { useContext, useState } from "react";
import axio from 'axios';
import { Loader2Icon } from "lucide-react";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db"; // Ensure this path is correct
import { UserSubscription } from "@/utils/schema";
import moment from "moment";

function Billing() {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);

  const CreateSubscription = () => {
    setLoading(true);
    axio.post('/api/create-subscription', {})
      .then(resp => {
        console.log(resp.data);
        OnPayment(resp.data.id);
      }, (error) => {
        setLoading(false);
      });
  };

  const OnPayment = (subId: string) => {
    const options = {
      "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      "subscription_id": subId,
      "name": "AI Content Generator",
      description: "Monthly Subscription",
      handler: async (resp: any) => {
        console.log(resp);
        if (resp) {
          SaveSubscription(resp?.razorpay_payment_id);
        }
        setLoading(false);
      }
    };

    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const SaveSubscription = async (paymentId: string) => {
    const result = await db.insert(UserSubscription)
      .values({
        email: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        active: true,
        paymentId: paymentId,
        joinDate: moment().format('DD.MM/YYYY')
      });
    console.log(result);
    if (result) {
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Upgrade With Monthly Plan</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
        {/* Free Plan */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold">Free</h2>
          <p className="text-3xl font-bold my-4">0$ / month</p>
          <ul className="mb-6 space-y-2">
            <li>✓ 10,000 Words/Month</li>
            <li>✓ 50+ Content Templates</li>
            <li>✓ Unlimited Download & Copy</li>
            <li>✓ 1 Month of History</li>
          </ul>
        </div>

        {/* Monthly Plan */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold">Monthly</h2>
          <p className="text-3xl font-bold my-4">
            <span className="line-through text-gray-400">$299</span> 99$ / month
          </p>
          <ul className="mb-6 space-y-2">
            <li>✓ 1,00,000 Words/Month</li>
            <li>✓ 50+ Template Access</li>
            <li>✓ Unlimited Download & Copy</li>
            <li>✓ 1 Year of History</li>
          </ul>
          <button disabled={loading} onClick={() => CreateSubscription()} className="w-full bg-indigo-600 text-white py-2 rounded-lg">
            {loading && <Loader2Icon className="animate-spin" />}
            {userSubscription ? 'Active Plan' : 'Get Started'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Billing;
