
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type Lead = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  status: 'new' | 'contacted' | 'converted';
  created_at: string;
  updated_at: string;
};

interface ScoreLeadDialogProps {
  lead: Lead;
  onClose: () => void;
}

interface ScoreResult {
  lead_id: string;
  score: number;
}

const ScoreLeadDialog: React.FC<ScoreLeadDialogProps> = ({ lead, onClose }) => {
  const [score, setScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const scoreLead = useMutation({
    mutationFn: async () => {
      setIsLoading(true);
      
      // Simulate an API call to score the lead
      return new Promise<ScoreResult>((resolve) => {
        setTimeout(() => {
          // Generate a random score between 1 and 100
          const randomScore = Math.floor(Math.random() * 100) + 1;
          resolve({
            lead_id: lead.id,
            score: randomScore
          });
        }, 1000);
      });
    },
    onSuccess: (data) => {
      setScore(data.score);
      setIsLoading(false);
      toast({
        title: "Lead scored",
        description: `The lead has been scored: ${data.score}/100`,
      });
    },
    onError: (error) => {
      setIsLoading(false);
      toast({
        title: "Error",
        description: `Failed to score lead: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  });

  const handleScoreClick = () => {
    scoreLead.mutate();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Score Lead: {lead.name}</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="text-sm text-gray-600 mb-4">
            <p>Company: {lead.company || 'N/A'}</p>
            <p>Email: {lead.email}</p>
            <p>Status: {lead.status}</p>
          </div>
          
          {score !== null ? (
            <div className="text-center py-6">
              <div className="text-4xl font-bold mb-2">{score}</div>
              <div className="text-sm text-gray-500">Lead Score (out of 100)</div>
              
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    score < 30 ? 'bg-red-500' : 
                    score < 70 ? 'bg-yellow-500' : 
                    'bg-green-500'
                  }`} 
                  style={{ width: `${score}%` }}>
                </div>
              </div>
              
              <div className="mt-3 text-sm text-gray-600">
                {score < 30 ? 'Low potential. Consider focusing on higher value leads.' : 
                 score < 70 ? 'Medium potential. Follow up when higher priority leads are addressed.' : 
                 'High potential. Prioritize this lead for immediate follow-up!'}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600">
              Get an AI-powered score for this lead based on their profile.
            </p>
          )}
        </div>
        
        <DialogFooter>
          {score === null ? (
            <button
              onClick={handleScoreClick}
              disabled={isLoading}
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? 'Calculating score...' : 'Calculate Lead Score'}
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Close
            </button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScoreLeadDialog;
