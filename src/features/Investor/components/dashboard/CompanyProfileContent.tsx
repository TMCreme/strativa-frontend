"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DataTable from "./DataTable";
import { CompanyCell } from "./index";
import { Company } from "@/shared/services/companiesService";
import { CompanyProfile } from "@/services/companyProfileService";
import Link from "next/link";
import Image from "next/image";

interface CompanyProfileContentProps {
  companyProfile: CompanyProfile;
}

export default function CompanyProfileContent({
  companyProfile,
}: CompanyProfileContentProps) {
  // Sample data for the companies table
  const companiesData: Company[] = [
    {
      id: 1,
      company: "AlphaPay",
      sector: "Fintech",
      stage: "Series D",
      date: "Just now",
      geography: "South Africa",
      valuation: "$18M-$22M",
      logo: "https://ui-avatars.com/api/?name=AlphaPay&background=10B981&color=fff&size=32",
    },
    {
      id: 2,
      company: "PaySphere",
      sector: "Fintech",
      stage: "Series A",
      date: "A minute ago",
      geography: "South Africa",
      valuation: "$18M-$22M",
      logo: "https://ui-avatars.com/api/?name=PaySphere&background=3B82F6&color=fff&size=32",
    },
    {
      id: 3,
      company: "SwiftFunds",
      sector: "Fintech",
      stage: "Series A",
      date: "Feb 2, 2024",
      geography: "Accra, Ghana",
      valuation: "$18M-$22M",
      logo: "https://ui-avatars.com/api/?name=SwiftFunds&background=8B5CF6&color=fff&size=32",
    },
  ];

  const columns = [
    {
      key: "company",
      label: "Company",
      render: (value: string, row: Company) => (
        <CompanyCell value={value} row={row} />
      ),
    },
    { key: "sector", label: "Sector" },
    { key: "stage", label: "Stage" },
    {
      key: "date",
      label: "Date",
      render: (value: string) => (
        <div className="flex items-center text-sm text-gray-900">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          {value}
        </div>
      ),
    },
    { key: "geography", label: "Geography" },
    { key: "valuation", label: "Valuation Band" },
    {
      key: "action",
      label: "Action Button",
      render: (value: string, row: Company) => (
        <Link href={`/investor/dashboard/profile?companyId=${row.id}`}>
          <button className="text-gray-600 hover:text-gray-800 font-medium">
            View Profile
          </button>
        </Link>
      ),
    },
  ];

  return (
    <section>
      <div className="flex gap-6">
        <div className="grid grid-cols-1 lg:flex lg:flex-col gap-6 w-2/5">
          {/* Company Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Company&apos;s Information
            </h2>
            <div className="space-y-3 grid grid-cols-2 gap-10">
              <div className="flex flex-col gap-2 justify-between">
                <span className="text-gray-600">Registration Address:</span>
                <span className="text-gray-900 font-bold">
                  {companyProfile.information.registrationAddress}
                </span>
              </div>
              <div className="flex flex-col gap-2 justify-between">
                <span className="text-gray-600">Business Name:</span>
                <span className="text-gray-900 font-bold">
                  {companyProfile.information.businessName}
                </span>
              </div>
              <div className="flex flex-col gap-2 justify-between">
                <span className="text-gray-600">Registration Date:</span>
                <span className="text-gray-900 font-bold">
                  {companyProfile.information.registrationDate}
                </span>
              </div>
              <div className="flex flex-col gap-2 justify-between">
                <span className="text-gray-600">Registration Code:</span>
                <span className="text-gray-900 font-bold">
                  {companyProfile.information.registrationCode}
                </span>
              </div>
              <div className="flex flex-col gap-2 justify-between">
                <span className="text-gray-600">Legal From:</span>
                <span className="text-gray-900 font-bold">
                  {companyProfile.information.legalForm}
                </span>
              </div>
              <div className="flex flex-col gap-2 justify-between">
                <span className="text-gray-600">Share Capital:</span>
                <span className="text-gray-900 font-bold">
                  {companyProfile.information.shareCapital}
                </span>
              </div>
            </div>
          </div>

          {/* Valuation Band */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Valuation Band
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Min Value</span>
                <span className="text-gray-600">Med Value</span>
                <span className="text-gray-600">Maxi Value</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-[1px]">
                <div className="bg-gray-300 rounded-full h-[1px] w-full"></div>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-900">
                  {companyProfile.valuation.minValue}
                </span>
                <span className="text-gray-900">
                  {companyProfile.valuation.medValue}
                </span>
                <span className="text-gray-900">
                  {companyProfile.valuation.maxValue}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-2/3 flex flex-col gap-6">
          {/* Growth Performance */}
          <div className="bg-[#F7F9FB] rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Growth Performance
              </h2>
              <p className="text-sm text-gray-600">last 6 months</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={companyProfile.growthPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="month"
                    stroke="#6B7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#6B7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}K`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    labelStyle={{ color: "#374151", fontWeight: "600" }}
                    formatter={(value) => [`${value}K`, "Growth"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "#10B981", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Current Openings */}
          <div className="bg-[#F7F9FB] border border-gray-200 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Current Openings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Price Per Share
                </h3>
                <p className="text-lg font-semibold text-gray-900">
                  {companyProfile.currentOpenings.pricePerShare}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Minimum Investment
                </h3>
                <p className="text-lg font-semibold text-gray-900">
                  {companyProfile.currentOpenings.minimumInvestment}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Status</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {companyProfile.currentOpenings.status}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Expiry</h3>
                <p className="text-lg font-semibold text-gray-900">
                  {companyProfile.currentOpenings.expiry}
                </p>
              </div>
            </div>
            <div className="flex justify-between space-x-4">
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                Enter Virtual Deal Room
              </button>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                Initiate a Call
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Companies Table */}
      <div className="mt-6">
        <DataTable
          title="Name of Company"
          columns={columns}
          data={companiesData}
          onAdd={() => console.log("Add new company")}
          onFilter={() => console.log("Filter companies")}
          onSort={() => console.log("Sort companies")}
          onSearch={(query) => console.log("Search:", query)}
        />
      </div>

      {/* Team Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <h2 className="flex item-center justify-center text-lg font-semibold text-gray-900 mb-6">
          The Jade Marketplace Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-col gap-20">
          <div className="flex items-center justify-center w-full gap-6">
            <div className="text-center">
              <Image
                src="/images/Rectangle 8.png"
                width={1000}
                height={1000}
                alt="Vision Side"
                className="w-52 h-52 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center"
              />
              <h3 className="font-semibold text-gray-900">
                {companyProfile.team[0].name}
              </h3>
              <p className="text-sm text-gray-600">
                {companyProfile.team[0].position}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full gap-6">
            <div className="text-center">
              <Image
                src="/images/Rectangle 8.png"
                width={1000}
                height={1000}
                alt="Vision Side"
                className="w-52 h-52 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center"
              />

              <h3 className="font-semibold text-gray-900">
                {companyProfile.team[1].name}
              </h3>
              <p className="text-sm text-gray-600">
                {companyProfile.team[1].position}
              </p>
            </div>
            <div className="text-center">
              <Image
                src="/images/Rectangle 9.png"
                width={1000}
                height={1000}
                alt="Vision Side"
                className="w-52 h-52 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center"
              />

              <h3 className="font-semibold text-gray-900">
                {companyProfile.team[2].name}
              </h3>
              <p className="text-sm text-gray-600">
                {companyProfile.team[2].position}
              </p>
            </div>
            <div className="text-center">
              <Image
                src="/images/Rectangle 10.png"
                width={1000}
                height={1000}
                alt="Vision Side"
                className="w-52 h-52 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center"
              />

              <h3 className="font-semibold text-gray-900">
                {companyProfile.team[3].name}
              </h3>
              <p className="text-sm text-gray-600">
                {companyProfile.team[3].position}
              </p>
            </div>
            <div className="text-center">
              <Image
                src="/images/Rectangle 11.png"
                width={1000}
                height={1000}
                alt="Vision Side"
                className="w-52 h-52 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center"
              />

              <h3 className="font-semibold text-gray-900">
                {companyProfile.team[4].name}
              </h3>
              <p className="text-sm text-gray-600">
                {companyProfile.team[4].position}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
