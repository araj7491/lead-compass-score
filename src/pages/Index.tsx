
import React from 'react';
import { QueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import LeadsList from '@/components/leads/LeadsList';
import CreateLeadForm from '@/components/leads/CreateLeadForm';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">CRM Dashboard</h1>
        <p className="text-gray-600">Manage and track your leads</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Leads</CardTitle>
              <CardDescription>Manage your leads and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <LeadsList />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Add New Lead</CardTitle>
              <CardDescription>Create a new lead in your CRM</CardDescription>
            </CardHeader>
            <CardContent>
              <CreateLeadForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
