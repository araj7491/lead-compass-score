
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Pencil, Trash2, Star } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import EditLeadDialog from './EditLeadDialog';
import ScoreLeadDialog from './ScoreLeadDialog';

type Lead = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  status: 'new' | 'contacted' | 'converted';
  created_at: string;
  updated_at: string;
};

const LeadsList = () => {
  const queryClient = useQueryClient();
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [scoringLead, setScoringLead] = useState<Lead | null>(null);

  const { data: leads = [], isLoading, error } = useQuery({
    queryKey: ['leads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }
      
      return data as Lead[];
    }
  });

  const deleteLead = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast({
        title: "Lead deleted",
        description: "The lead has been successfully removed",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete lead: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading leads...</div>;
  }

  if (error) {
    return <div className="text-red-500 py-4">Error loading leads: {error.message}</div>;
  }

  return (
    <div>
      {leads.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No leads yet. Add your first lead with the form.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Company</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{lead.name}</td>
                  <td className="px-4 py-3">{lead.email}</td>
                  <td className="px-4 py-3">{lead.company || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      lead.status === 'new' ? 'bg-blue-100 text-blue-800' : 
                      lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingLead(lead)}
                        className="text-gray-500 hover:text-blue-500"
                        title="Edit lead"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => setScoringLead(lead)}
                        className="text-gray-500 hover:text-yellow-500"
                        title="Score lead"
                      >
                        <Star size={16} />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this lead?')) {
                            deleteLead.mutate(lead.id);
                          }
                        }}
                        className="text-gray-500 hover:text-red-500"
                        title="Delete lead"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingLead && (
        <EditLeadDialog
          lead={editingLead}
          onClose={() => setEditingLead(null)}
        />
      )}

      {scoringLead && (
        <ScoreLeadDialog
          lead={scoringLead}
          onClose={() => setScoringLead(null)}
        />
      )}
    </div>
  );
};

export default LeadsList;
