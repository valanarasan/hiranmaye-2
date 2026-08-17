import React, { useState } from 'react';
import { Slider, Typography, Button } from '@mui/material';
import { TrendingUp } from 'lucide-react';

interface GrowthCalculatorProps {
  onBookConsultation: () => void;
}

export const GrowthCalculator: React.FC<GrowthCalculatorProps> = ({ onBookConsultation }) => {
  const [monthlyBudget, setMonthlyBudget] = useState<number>(50000);
  const [targetIndustry, setTargetIndustry] = useState<number>(1.2); // multiplier
  const [avgTicketSize, setAvgTicketSize] = useState<number>(25000);

  // Estimator Calculations
  // Average CPL based on industry multiplier and budget
  const estimatedClicks = Math.round(monthlyBudget / (18 * targetIndustry));
  const estimatedQualifiedLeads = Math.round((monthlyBudget / (350 * targetIndustry)));
  const estimatedConvertedDeals = Math.max(1, Math.round(estimatedQualifiedLeads * 0.12));
  const projectedRevenue = estimatedConvertedDeals * avgTicketSize;
  const estimatedROAS = ((projectedRevenue / monthlyBudget)).toFixed(1);

  return (
    <div className="calculator-card">
      <div className="calculator-grid">
        {/* Left Inputs */}
        <div className="calc-inputs-col">
          <div>
            <span className="eyebrow-badge">
              <TrendingUp size={14} /> Interactive Estimator
            </span>
            <Typography variant="h4" sx={{ color: 'var(--brand-navy-900)', mb: 1, fontWeight: 800 }}>
              Marketing ROI & Lead Calculator
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
              Adjust parameters to forecast your potential pipeline expansion with HIRANMAYE DIGITAL.
            </Typography>
          </div>

          <div className="calc-slider-group">
            <div className="calc-label-row">
              <span className="calc-label">Monthly Ad Spend Budget (INR)</span>
              <span className="calc-val-badge">₹{monthlyBudget.toLocaleString()}</span>
            </div>
            <Slider
              value={monthlyBudget}
              min={20000}
              max={500000}
              step={10000}
              onChange={(_, val) => setMonthlyBudget(val as number)}
              sx={{ color: 'var(--brand-navy-800)' }}
            />
          </div>

          <div className="calc-slider-group">
            <div className="calc-label-row">
              <span className="calc-label">Average Customer Deal Value (INR)</span>
              <span className="calc-val-badge">₹{avgTicketSize.toLocaleString()}</span>
            </div>
            <Slider
              value={avgTicketSize}
              min={5000}
              max={200000}
              step={5000}
              onChange={(_, val) => setAvgTicketSize(val as number)}
              sx={{ color: 'var(--brand-blue-600)' }}
            />
          </div>

          <div className="calc-slider-group">
            <div className="calc-label-row">
              <span className="calc-label">Sector / Market Competitiveness</span>
              <span className="calc-val-badge">
                {targetIndustry <= 1.0 ? 'SME / Local' : targetIndustry <= 1.3 ? 'B2B / Tech' : 'High-Ticket / Enterprise'}
              </span>
            </div>
            <Slider
              value={targetIndustry}
              min={0.8}
              max={1.8}
              step={0.2}
              onChange={(_, val) => setTargetIndustry(val as number)}
              sx={{ color: 'var(--brand-navy-700)' }}
            />
          </div>
        </div>

        {/* Right Output Projections */}
        <div className="calc-results-box">
          <div>
            <div className="calc-result-header">Estimated Monthly Pipeline Value</div>
            <div className="calc-highlight-metric">₹{projectedRevenue.toLocaleString()}</div>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)', display: 'block', mt: 0.5 }}>
              Projected ROI: ~{estimatedROAS}x Return on Ad Spend
            </Typography>
          </div>

          <div className="calc-metrics-row">
            <div>
              <div className="calc-sub-metric-val">~{estimatedQualifiedLeads}</div>
              <div className="calc-sub-metric-lbl">Qualified Inbound Leads / Mo</div>
            </div>
            <div>
              <div className="calc-sub-metric-val">~{estimatedConvertedDeals}</div>
              <div className="calc-sub-metric-lbl">Expected Closed Clients / Mo</div>
            </div>
          </div>

          <div className="calc-metrics-row">
            <div>
              <div className="calc-sub-metric-val">~{estimatedClicks.toLocaleString()}</div>
              <div className="calc-sub-metric-lbl">High-Intent Traffic Clicks</div>
            </div>
            <div>
              <div className="calc-sub-metric-val">12% - 15%</div>
              <div className="calc-sub-metric-lbl">Lead-to-Opportunity Ratio</div>
            </div>
          </div>

          <Button 
            variant="contained" 
            fullWidth 
            onClick={onBookConsultation}
            sx={{ 
              bgcolor: '#FFFFFF !important', 
              color: 'var(--brand-navy-950) !important',
              fontWeight: 800,
              py: 1.5,
              '&:hover': {
                bgcolor: '#EFF6FF !important'
              }
            }}
          >
            Claim Custom Growth Audit
          </Button>
        </div>
      </div>
    </div>
  );
};
